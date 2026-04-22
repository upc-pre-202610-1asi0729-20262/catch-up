import { Source } from './source.entity';

/**
 * Domain entity representing a news article.
 *
 * @remarks
 * This is a core domain entity within the News bounded context. It encapsulates
 * the essential properties of a news article as reported by the news provider.
 * Each article is associated with a news source and contains metadata needed for
 * presentation and sharing.
 *
 * @example
 * ```typescript
 * const article = new Article();
 * article.title = 'Breaking News';
 * article.source = newsSource;
 * ```
 */
export class Article {
  /** The headline or main title of the article. */
  title: string;

  /** Brief summary or preview of the article content. */
  description: string;

  /** URL pointing to the full article on the news provider's website. */
  url: string;

  /** URL reference to the article's featured image or thumbnail. */
  urlToImage: string;

  /** ISO 8601 timestamp indicating when the article was published. */
  publishedAt: string;

  /** Reference to the source (news outlet) that published this article. */
  source: Source;

  /**
   * Constructs a new Article with default empty values.
   *
   * @remarks
   * All string properties are initialized to empty strings, and the source
   * is initialized with a new Source instance with default values.
   */
  constructor() {
    this.title = '';
    this.description = '';
    this.url = '';
    this.urlToImage = '';
    this.publishedAt = '';
    this.source = new Source();
  }
}
