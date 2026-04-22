import {computed, inject, Injectable, signal} from '@angular/core';
import {Source} from '../domain/model/source.entity';
import {Article} from '../domain/model/article.entity';
import {NewsApi} from '../infrastructure/news-api';
import {LogoDevApi} from '../../shared/infrastructure/logo-dev-api';

@Injectable({providedIn: 'root'})
/**
 * Application service that coordinates read models for the News bounded context.
 *
 * @remarks
 * This store owns source and article state and exposes it through Angular signals
 * consumed by presentation components.
 */
export class NewsStore {


  /** Internal signal containing all available sources. */
  private sourcesSignal = signal<Source[]>([]);
  /** Internal signal indexed by source id with preloaded article lists. */
  private articlesSignal = signal<Record<string, Article[]>>({});
  private newsApi = inject(NewsApi);
  private logoApi = inject(LogoDevApi);

  /** Read-only projection of available news sources. */
  readonly sources = computed(() => this.sourcesSignal());
  /** Read-only projection of the article cache keyed by source id. */
  readonly articles = computed(() => this.articlesSignal());
  /** Reactive list of articles for the currently selected source. */
  public currentSourceArticles = computed(() => this.articlesSignal()[this.currentSource?.id] ?? []);
  /** Currently selected source used as aggregate navigation focus. */
  private _currentSource!: Source;

  /**
   * Loads available sources once and initializes the current source selection.
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
   * Loads articles for the selected source when they are not already cached.
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

  /** Gets the currently selected source. */
  get currentSource(): Source {
    return this._currentSource;
  }

  /**
   * Updates the current source and triggers article loading for that source.
   */
  set currentSource(value: Source) {
    this._currentSource = value;
    this.loadArticlesForCurrentSource();
  }

}
