// src/movies/movies.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(
    @Query('page') page: string,
    @Query('search') search: string,
    @Query('sort') sort: string,
  ) {
    return await this.moviesService.getMoviesPaginated({
      page: parseInt(page, 10) || 1,
      search,
      sort,
    });
  }
}
