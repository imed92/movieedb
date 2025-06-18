// test/reservation.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ReservationController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let reservationId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Inscription et connexion pour obtenir un token
    const email = `testuser${Date.now()}@example.com`;

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test User',
        email,
        password: 'password123',
      })
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password: 'password123',
      })
      .expect(201);

    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/reservations (POST) should create a new reservation', async () => {
    // Création d'un créneau 1 heure dans le futur
    const timeSlot = new Date(Date.now() + 3600 * 1000).toISOString();
    const res = await request(app.getHttpServer())
      .post('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        movieId: 1,
        timeSlot,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    reservationId = res.body.id;
  });

  it('/reservations (GET) should list user reservations', async () => {
    const res = await request(app.getHttpServer())
      .get('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // En supposant que l'intercepteur enveloppe la réponse dans { data: [...] }
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('/reservations/:id (DELETE) should cancel the reservation', async () => {
    await request(app.getHttpServer())
      .delete(`/reservations/${reservationId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
