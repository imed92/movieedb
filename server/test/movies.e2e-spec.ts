// test/movies.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/movies (GET) should return a list of movies', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .then((response) => {
        // En supposant que l'intercepteur transforme la réponse sous la forme { data: ... }
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
      });
  });

  it('/movies (GET) with search query should filter movies', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .query({ search: 'Batman', page: 1 })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('data');
        // On pourrait vérifier ici que les titres contiennent "Batman" par exemple
      });
  });
});
