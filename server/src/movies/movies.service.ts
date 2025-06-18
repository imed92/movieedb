import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly tmdbApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY') as string;
  }

  async getMovies() {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.tmdbApiKey}&language=fr-FR&page=1`;

    const response = await lastValueFrom(this.httpService.get(url));
    return response.data.results;
  }

  async getMoviesPaginated(query: {
    page?: number;
    search?: string;
    sort?: string;
  }) {
    const page = query.page || 1;
    const search = query.search;
    const sort = query.sort;

    const url = search
      ? `https://api.themoviedb.org/3/search/movie?api_key=${this.tmdbApiKey}&language=fr-FR&query=${encodeURIComponent(search)}&page=${page}`
      : `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.tmdbApiKey}&language=fr-FR&page=${page}`;

    const finalUrl = sort ? `${url}&sort_by=${sort}` : url;

    const response = await lastValueFrom(this.httpService.get(finalUrl));
    return response.data;
  }
}
