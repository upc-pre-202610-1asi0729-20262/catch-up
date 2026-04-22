import {computed, inject, Injectable, signal} from '@angular/core';
import {Source} from '../domain/model/source.entity';
import {Article} from '../domain/model/article.entity';
import {NewsApi} from '../infrastructure/news-api';
import {LogoDevApi} from '../../shared/infrastructure/logo-dev-api';

/**
 * Application store coordinating the News bounded context.
 *
 * @remarks
 * This injectable service implements the application layer of the news feature,
 * following DDD principles. It manages the read models for sources and articles,
 * maintains state through Angular signals, and coordinates with infrastructure
 * services to fetch and cache data. The store exposes reactive projections that
 * presentation components consume.
 *
 * The store is responsible for:
 * - Loading and caching news sources
 * - Loading and caching articles per source
 * - Managing current source selection as the navigation focus
 * - Enriching domain entities with external resources (logos)
 *
 * @example
 * ```typescript
 * constructor(private store: NewsStore) {
 *   this.sources$ = this.store.sources;
 *   this.articles$ = this.store.currentSourceArticles;
 * }
 *
 * ngOnInit() {
 *   this.store.loadSources();
 * }
 * ```
 */
@Injectable({providedIn: 'root'})
export class NewsStore {

  /** Internal mutable signal containing all available news sources. */
  private sourcesSignal = signal<Source[]>([]);

  /** Internal mutable signal holding cached articles indexed by source ID. */
  private articlesSignal = signal<Record<string, Article[]>>({});

  /** Injected infrastructure gateway for news provider API. */
  private newsApi = inject(NewsApi);

  /** Injected infrastructure service for logo URL generation. */
  private logoApi = inject(LogoDevApi);

  /**
   * Computed read-only projection of all available news sources.
   *
   * @remarks
   * This reactive signal is consumed by presentation components that need
   * to display the list of available sources for navigation purposes.
   */
  readonly sources = computed(() => this.sourcesSignal());

  /**
   * Computed read-only projection of the article cache indexed by source ID.
   *
   * @remarks
   * The cache stores articles keyed by their source ID, enabling efficient
   * retrieval and reuse of previously fetched article lists.
   */
  readonly articles = computed(() => this.articlesSignal());

  /**
   * Computed reactive list of articles for the currently selected source.
   *
   * @remarks
   * This signal is derived from the current source selection and the article
   * cache. It automatically updates when either the current source changes
   * or the article cache is modified.
   */
  public currentSourceArticles = computed(() => this.articlesSignal()[this.currentSource?.id] ?? []);

  /**
   * Internal reference to the currently selected source.
   *
   * @remarks
   * This property acts as the aggregate navigation focus within the News
   * bounded context. When updated, it triggers article loading for that source.
   */
  private _currentSource!: Source;

  /**
   * Loads available news sources once from the API and initializes source selection.
   *
   * @remarks
   * This method implements lazy-loading caching. Sources are fetched only once.
   * After loading, it enriches each source with logo URLs via the LogoDevApi
   * and automatically selects the first source as the initial navigation focus.
   * Article loading for the selected source is triggered immediately.
   *
   * @example
   * ```typescript
   * ngAfterViewInit() {
   *   this.store.loadSources();
   * }
   * ```
   */
  loadSources() {
    if (this.sourcesSignal().length === 0) {
      this.newsApi.getSources().subscribe(sources => {
        sources.forEach(source => source.urlToLogo = this.logoApi.getUrlToLogo(source.url));
        this.sourcesSignal.set(sources);
        this.currentSource = sources[0];
        this.loadArticlesForCurrentSource();
      });
    }
  }

  /**
   * Loads articles for the currently selected source if not already cached.
   *
   * @remarks
   * This method implements cache-aware loading. If articles for the current
   * source have already been loaded and cached, the request is skipped.
   * Upon loading, it enriches each article with the source's logo URL and
   * website URL for presentation purposes.
   *
   * @example
   * ```typescript
   * this.store.currentSource = newSource;
   * this.store.loadArticlesForCurrentSource();
   * ```
   */
  loadArticlesForCurrentSource() {
    console.log(this.currentSource);
    const current = this.articlesSignal() ?? {};
    const source = this._currentSource;
    if (!current[source.id]) {
      this.newsApi.getArticlesBySourceId(source.id).subscribe(articles => {
        articles.forEach(article => {
          article.source.urlToLogo = source.urlToLogo;
          article.source.url = source.url;
        });
        this.articlesSignal.set({ ...current, [source.id]: articles });
      });
    }
  }

  /**
   * Gets the currently selected source.
   *
   * @returns The Source entity representing the current navigation focus.
   */
  get currentSource(): Source {
    return this._currentSource;
  }

  /**
   * Sets the currently selected source and triggers article loading for that source.
   *
   * @param value - The new source to select as the navigation focus.
   *
   * @remarks
   * This setter updates the current source selection and immediately initiates
   * article loading for the newly selected source (unless already cached).
   *
   * @example
   * ```typescript
   * this.store.currentSource = selectedSource;
   * ```
   */
  set currentSource(value: Source) {
    this._currentSource = value;
    this.loadArticlesForCurrentSource();
  }

}
