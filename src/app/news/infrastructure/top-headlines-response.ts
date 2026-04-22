/**
 * Resource representing an article from the headlines API response.
 *
 * @remarks
 * This interface models the raw JSON structure of an article returned by the
 * news provider API when querying top headlines for a source. It maps to the
 * domain Article entity through the ArticleAssembler during infrastructure
 * operations.
 *
 * Note: Some fields may be null or undefined depending on the provider's data
 * availability for specific articles.
 */
export interface ArticleResource {
  /**
   * Source information embedded in the article resource.
   * The source may have a null id if not provided by the API.
   */
  source: { id: string | null; name: string;}

  /** Main headline or title of the article. */
  title: string;

  /** Summary or preview text of the article content. */
  description: string;

  /** URL link to the full article on the provider's website. */
  url: string;

  /** URL to the article's featured image or thumbnail. May be null. */
  urlToImage: string | null;

  /** ISO 8601 timestamp of when the article was published. */
  publishedAt: string;
}

/**
 * Resource payload for the top headlines endpoint.
 *
 * @remarks
 * This interface represents the complete response structure from the news
 * provider's top headlines API endpoint. It is transformed into an array of
 * Article domain entities by the ArticleAssembler.
 */
export interface TopHeadlinesResponse {
  /** Status of the API response (e.g., "ok" or "error"). */
  status: string;

  /** Total number of results available (may exceed the returned count). */
  totalResults: number;

  /** Array of articles returned in this response. */
  articles: ArticleResource[];
}
