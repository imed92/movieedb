import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class MoviesService {
    private readonly httpService;
    private readonly configService;
    private readonly tmdbApiKey;
    constructor(httpService: HttpService, configService: ConfigService);
    getMovies(): Promise<any>;
    getMoviesPaginated(query: {
        page?: number;
        search?: string;
        sort?: string;
    }): Promise<any>;
}
