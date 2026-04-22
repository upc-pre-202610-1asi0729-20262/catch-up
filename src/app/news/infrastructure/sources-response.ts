/**
 * Resource representing a news source from the API response.
 *
 * @remarks
 * This interface models the raw JSON structure returned by the news provider
 * API when querying available sources. It maps to the domain Source entity
 * through the SourceAssembler during infrastructure operations.
 */
export interface SourceResource {
  /** Unique identifier for the source assigned by the news provider. */
  id: string;

  /** Human-readable name of the news source. */
  name: string;

  /** URL to the news source's homepage. */
  url: string;

  /** URL to the source's logo image. */
  urlToLogo: string;
}

/**
 * Resource payload for the sources endpoint.
 *
 * @remarks
 * This interface represents the complete response structure from the news
 * provider's sources API endpoint. It is transformed into an array of Source
 * domain entities by the SourceAssembler.
 */
export interface SourcesResponse {
  /** Status of the API response (e.g., "ok" or "error"). */
  status: string;

  /** Array of available news sources from the provider. */
  sources: SourceResource[];
}

