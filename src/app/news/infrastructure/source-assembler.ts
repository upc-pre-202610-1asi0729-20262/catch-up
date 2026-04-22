import { LogoDevApi } from '../../shared/infrastructure/logo-dev-api';
import { SourceResource, SourcesResponse } from './sources-response';
import { Source } from '../domain/model/source.entity';

/**
 * Assembler for transforming source infrastructure resources into domain entities.
 *
 * @remarks
 * This class implements the Assembler pattern to handle resource-to-entity mapping
 * for news sources. It acts as a boundary translator between the infrastructure
 * layer (API responses) and the domain layer (Source entities). The assembler
 * also enriches source entities with logo URLs through the LogoDevApi.
 *
 * This is a static utility class using the fluent builder pattern for dependency
 * injection of the LogoDevApi service.
 *
 * @example
 * ```typescript
 * const sourceAssembler = SourceAssembler.withLogoApi(logoDevApi);
 * const sources = sourceAssembler.toEntitiesFromResponse(apiResponse);
 * ```
 */
export class SourceAssembler {
  /** Static dependency: Logo API service for enriching sources with logo URLs. */
  static logoApi: LogoDevApi;

  /**
   * Fluent builder method to set the logo API dependency.
   *
   * @remarks
   * This method enables dependency injection in a static context by allowing
   * the caller to provide the LogoDevApi instance needed for logo URL generation.
   *
   * @param logoApi - The LogoDevApi service instance for logo URL generation.
   * @returns This assembler instance for method chaining.
   *
   * @example
   * ```typescript
   * SourceAssembler.withLogoApi(logoDevApi).toEntitiesFromResponse(response);
   * ```
   */
  static withLogoApi(logoApi: LogoDevApi) {
    this.logoApi = logoApi;
    return this;
  }

  /**
   * Transforms a single source resource into a domain Source entity.
   *
   * @remarks
   * This method performs the mapping from the API's `SourceResource` to the
   * domain Source entity. It includes logo URL generation using the configured
   * LogoDevApi service. If the source URL is missing, logo URL defaults to empty.
   *
   * @param resource - The source resource returned by the API response.
   * @returns A new Source domain entity populated with data from the resource.
   *
   * @example
   * ```typescript
   * const sourceEntity = SourceAssembler.withLogoApi(logoApi)
   *   .toEntityFromResource(sourceDto);
   * ```
   */
  static toEntityFromResource(resource: SourceResource): Source {
    return {
      id: resource.id,
      name: resource.name,
      url: resource.url || '',
      urlToLogo: this.logoApi.getUrlToLogo(resource.url || ''),
    }
  }

  /**
   * Transforms an array of source resources from an API response into domain entities.
   *
   * @remarks
   * This method processes the complete API response containing multiple sources
   * and transforms each `SourceResource` into a Source domain entity. It
   * leverages toEntityFromResource for individual mappings.
   *
   * @param response - The complete SourcesResponse from the API containing status
   *                   and an array of sources.
   * @returns An array of Source domain entities extracted and transformed from
   *          the API response.
   *
   * @example
   * ```typescript
   * const sources = SourceAssembler.withLogoApi(logoApi)
   *   .toEntitiesFromResponse(apiResponse);
   * ```
   */
  static toEntitiesFromResponse(response: SourcesResponse): Source[] {
    return response.sources.map((source) => this.toEntityFromResource(source));
  }
}
