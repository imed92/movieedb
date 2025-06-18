"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let MoviesService = class MoviesService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.tmdbApiKey = this.configService.get('TMDB_API_KEY');
    }
    async getMovies() {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.tmdbApiKey}&language=fr-FR&page=1`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
        return response.data.results;
    }
    async getMoviesPaginated(query) {
        const page = query.page || 1;
        const search = query.search;
        const sort = query.sort;
        const url = search
            ? `https://api.themoviedb.org/3/search/movie?api_key=${this.tmdbApiKey}&language=fr-FR&query=${encodeURIComponent(search)}&page=${page}`
            : `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.tmdbApiKey}&language=fr-FR&page=${page}`;
        const finalUrl = sort ? `${url}&sort_by=${sort}` : url;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(finalUrl));
        return response.data;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map