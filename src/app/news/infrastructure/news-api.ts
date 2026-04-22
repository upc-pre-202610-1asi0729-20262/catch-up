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

/**
 * Infrastructure gateway for the external news provider API.
 *
 * @remarks
 * This service implements the infrastructure layer for the News bounded context.
 * It acts as a gateway between the application and external news provider,
 * handling HTTP communication and resource-to-entity mapping through assemblers.
 * The class follows the repository pattern, providing domain-focused methods
 * that return domain entities rather than raw API responses.
 *
 * API Configuration is provided through environment settings:
 * - Base URL for the news API
 * - API key for authentication
 * - Endpoint paths for sources and articles
 *
 * @example
 * ```typescript
 * constructor(private newsApi: NewsApi) {}
 *
 * ngOnInit() {
 *   this.newsApi.getSources().subscribe(sources => {
 *     console.log(sources); // Array of Source domain entities
 *   });
 * }
 * ```
 */
@Injectable({providedIn: 'root'})
export class NewsApi {
  /** Base URL for the news provider API from environment configuration. */
  private baseUrl = environment.newsProviderApiBaseUrl;

  /** Endpoint path for retrieving available news sources. */
  private newsEndpoint = environment.newsProviderNewsEndpointPath;

  /** Endpoint path for retrieving sources list. */
  private sourcesEndpoint = environment.newsProviderSourcesEndpointPath;

  /** API key for authenticating requests to the news provider. */
  private apiKey = environment.newsProviderApiKey;

  /** Injected HTTP client for making API requests. */
  private http = inject(HttpClient);

  /** Injected service for logo URL generation. */
  private logoApi = inject(LogoDevApi);

  /**
   * Fetches all available news sources from the provider API.
   *
   * @remarks
   * This method retrieves the complete list of available news sources that can
   * be used to fetch articles. The raw `SourcesResponse` resource payload is transformed into
   * an array of Source domain entities through the SourceAssembler. Logo URLs
   * are generated during assembly.
   *
   * @returns Observable of an array of Source domain entities representing
   *          available news providers.
   *
   * @example
   * ```typescript
   * this.newsApi.getSources().subscribe(
   *   sources => console.log('Available sources:', sources),
   *   error => console.error('Failed to load sources:', error)
   * );
   * ```
   */
  getSources(): Observable<Source[]> {
    return this.http.get<SourcesResponse>(`${this.baseUrl}${this.sourcesEndpoint}`, {
      params: { apiKey: this.apiKey }
    }).pipe(
      map(response => SourceAssembler.withLogoApi(this.logoApi).toEntitiesFromResponse(response))
    );
  }

  /**
   * Fetches top headline articles for a specific news source.
   *
   * @remarks
   * This method retrieves the latest articles from a specific news source.
   * The raw `TopHeadlinesResponse` resource payload is transformed into an array of Article
   * domain entities through the ArticleAssembler. Articles returned do not
   * include logo URLs at this stage—they are enriched by the application layer.
   *
   * @param sourceId - The unique identifier of the news source as defined by
   *                   the provider. This is used in the API query parameter.
   *
   * @returns Observable of an array of Article domain entities representing
   *          the top headlines from the specified source.
   *
   * @example
   * ```typescript
   * this.newsApi.getArticlesBySourceId('bbc-news').subscribe(
   *   articles => console.log('Articles:', articles),
   *   error => console.error('Failed to load articles:', error)
   * );
   * ```
   */
  getArticlesBySourceId(sourceId: string): Observable<Article[]> {
    return this.http.get<TopHeadlinesResponse>(`${this.baseUrl}${this.newsEndpoint}`, {
      params: { apiKey: this.apiKey, sources: sourceId }
    }).pipe(
      map(response => ArticleAssembler.withLogoApi(this.logoApi).toEntitiesFromResponse(response))
    );
  }
}
