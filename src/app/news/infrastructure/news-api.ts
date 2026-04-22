import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LogoDevApi} from '../../shared/infrastructure/logo-dev-api';
import {map, Observable} from 'rxjs';
import {Source} from '../domain/model/source.entity';
import {SourcesResponse} from './sources-response';
import {SourceAssembler} from './source-assembler';
import {Article} from '../domain/model/article.entity';
import {TopHeadlinesResponse} from './top-headlines-response';
import {ArticleAssembler} from './article-assembler';

@Injectable({providedIn: 'root'})
/**
 * Infrastructure gateway to the external news provider API.
 *
 * @remarks
 * The gateway returns domain entities by delegating resource mapping to
 * assembler classes.
 */
export class NewsApi {
  private baseUrl = environment.newsProviderApiBaseUrl;
  private newsEndpoint = environment.newsProviderNewsEndpointPath;
  private sourcesEndpoint = environment.newsProviderSourcesEndpointPath;
  private apiKey = environment.newsProviderApiKey;
  private http = inject(HttpClient);
  private logoApi = inject(LogoDevApi);

  /**
   * Fetches all available sources and maps them into domain entities.
   */
  getSources(): Observable<Source[]> {
    return this.http.get<SourcesResponse>(`${this.baseUrl}${this.sourcesEndpoint}`, {
      params: { apiKey: this.apiKey }
    }).pipe(
      map(response => SourceAssembler.withLogoApi(this.logoApi).toEntitiesFromResponse(response))
    );
  }

  /**
   * Fetches top headlines for a specific source.
   *
   * @param sourceId - Provider source identifier used in the query parameter.
   */
  getArticlesBySourceId(sourceId: string): Observable<Article[]> {
    return this.http.get<TopHeadlinesResponse>(`${this.baseUrl}${this.newsEndpoint}`, {
      params: { apiKey: this.apiKey, sources: sourceId }
    }).pipe(
      map(response => ArticleAssembler.withLogoApi(this.logoApi).toEntitiesFromResponse(response))
    );
  }
}
