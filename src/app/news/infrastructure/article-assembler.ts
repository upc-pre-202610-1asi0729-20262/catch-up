import { LogoDevApi } from '../../shared/infrastructure/logo-dev-api';
import { ArticleResource, TopHeadlinesResponse } from './top-headlines-response';
import { Article } from '../domain/model/article.entity';

/**
 * Assembler for transforming article infrastructure resources into domain entities.
 *
 * @remarks
 * This class implements the Assembler pattern to handle resource-to-entity mapping
 * for news articles. It acts as a boundary translator between the infrastructure
 * layer (API responses) and the domain layer (Article entities). The assembler
 * normalizes missing or optional fields and ensures type consistency for domain
 * entity construction.
 *
 * This is a static utility class using the fluent builder pattern for dependency
 * injection of the LogoDevApi service.
 *
 * @example
 * ```typescript
 * const articleAssembler = ArticleAssembler.withLogoApi(logoDevApi);
 * const articles = articleAssembler.toEntitiesFromResponse(apiResponse);
 * ```
 */
export class ArticleAssembler {
  /** Static dependency: Logo API service for logo URL generation (currently unused for articles). */
  static logoApi: LogoDevApi;

  /**
   * Fluent builder method to set the logo API dependency.
   *
   * @remarks
   * This method enables dependency injection in a static context. Although
   * LogoDevApi is not used for article mapping itself, it is stored for
   * consistency with the SourceAssembler pattern.
   *
   * @param logoApi - The LogoDevApi service instance.
   * @returns This assembler instance for method chaining.
   *
   * @example
   * ```typescript
   * ArticleAssembler.withLogoApi(logoDevApi).toEntitiesFromResponse(response);
   * ```
   */
  static withLogoApi(logoApi: LogoDevApi) {
    this.logoApi = logoApi;
    return this;
  }

  /**
   * Transforms a single article resource into a domain Article entity.
   *
   * @remarks
   * This method performs the mapping from the API's `ArticleResource` to the
   * domain Article entity. It handles optional and nullable fields by providing
   * sensible defaults (empty strings for missing required data). The source
   * information is partially populated; logo URLs are added later by the
   * application layer during caching enrichment.
   *
   * @param resource - The article resource returned by the API response.
   * @returns A new Article domain entity populated with data from the resource.
   *
   * @example
   * ```typescript
   * const articleEntity = ArticleAssembler.withLogoApi(logoApi)
   *   .toEntityFromResource(articleDto);
   * ```
   */
  static toEntityFromResource(resource: ArticleResource): Article {
    return {
      source: {
        id: resource.source.id || '',
        name: resource.source.name,
        url: '',
        urlToLogo: ''
      },
      title: resource.title,
      description: resource.description || '',
      url: resource.url,
      urlToImage: resource.urlToImage || '',
      publishedAt: resource.publishedAt
    }
  }

  /**
   * Transforms an array of article resources from an API response into domain entities.
   *
   * @remarks
   * This method processes the complete API response containing multiple articles
   * and transforms each `ArticleResource` into an Article domain entity. It
   * leverages toEntityFromResource for individual mappings.
   *
   * @param response - The complete TopHeadlinesResponse from the API containing
   *                   status, total result count, and an array of articles.
   * @returns An array of Article domain entities extracted and transformed from
   *          the API response.
   *
   * @example
   * ```typescript
   * const articles = ArticleAssembler.withLogoApi(logoApi)
   *   .toEntitiesFromResponse(apiResponse);
   * ```
   */
  static toEntitiesFromResponse(response: TopHeadlinesResponse): Article[] {
    return response.articles.map(article => this.toEntityFromResource(article));
  }
}
