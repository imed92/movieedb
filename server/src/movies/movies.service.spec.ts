// src/movies/movies.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('fake-api-key'),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should fetch movies from TMDB API', async () => {
    const fakeResponse = {
      data: { results: [{ id: 1, title: 'Movie 1' }], total_pages: 1 },
    };
    (httpService.get as jest.Mock).mockReturnValue(of(fakeResponse));

    const result = await service.getMoviesPaginated({ page: 1 });
    expect(httpService.get).toHaveBeenCalled();
    expect(result).toEqual(fakeResponse.data);
  });

  it('should handle search query correctly', async () => {
    const fakeResponse = {
      data: { results: [{ id: 2, title: 'Search Movie' }], total_pages: 1 },
    };
    (httpService.get as jest.Mock).mockReturnValue(of(fakeResponse));

    const result = await service.getMoviesPaginated({
      page: 1,
      search: 'search',
    });
    expect(httpService.get).toHaveBeenCalled();
    expect(result).toEqual(fakeResponse.data);
  });
});
