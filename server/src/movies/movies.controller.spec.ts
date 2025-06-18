// src/movies/movies.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  const mockMoviesService = {
    getMoviesPaginated: jest.fn(({ page, search, sort }) =>
      Promise.resolve({
        results: [{ id: 1, title: 'Movie 1' }],
        total_pages: 1,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: mockMoviesService }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  describe('getMovies', () => {
    it('should return paginated movies', async () => {
      const page = '1';
      const search = 'test';
      const sort = 'popularity.desc';
      const result = await controller.getMovies(page, search, sort);
      expect(service.getMoviesPaginated).toHaveBeenCalledWith({
        page: parseInt(page, 10) || 1,
        search,
        sort,
      });
      expect(result).toHaveProperty('results');
    });
  });
});
