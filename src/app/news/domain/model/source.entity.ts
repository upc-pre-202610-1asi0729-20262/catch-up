/**
 * Domain entity representing a news source (news outlet).
 *
 * @remarks
 * This is a core domain entity within the News bounded context. It represents
 * a news organization or publication that provides articles through the news API.
 * Sources are used as aggregate roots for organizing and retrieving articles.
 *
 * @example
 * ```typescript
 * const source = new Source();
 * source.id = 'bbc-news';
 * source.name = 'BBC News';
 * ```
 */
export class Source {
  /** Unique identifier assigned by the news provider. */
  id: string;

  /** Display name of the news source or organization. */
  name: string;

  /** URL to the news source's homepage or main website. */
  url: string;

  /** URL to retrieve the logo image for this news source. */
  urlToLogo: string;

  /**
   * Constructs a new Source with default empty values.
   *
   * @remarks
   * All properties are initialized to empty strings. Values should be populated
   * through assignment or the API assembly layer.
   */
  constructor() {
    this.id = '';
    this.name = '';
    this.url = '';
    this.urlToLogo = '';
  }
}
