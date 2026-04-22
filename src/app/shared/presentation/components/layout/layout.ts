import { AfterViewInit, Component, inject } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { Footer } from '../footer/footer';
import { NewsStore } from '../../../../news/application/news.store';
import { Source } from '../../../../news/domain/model/source.entity';
import { SourceList } from '../../../../news/presentation/components/source-list/source-list';
import { ArticleList } from '../../../../news/presentation/components/article-list/article-list';

/**
 * Root layout component for the application.
 *
 * @remarks
 * This component serves as the main shell/layout for the application, integrating
 * the News bounded context with shared UI elements. It implements a Material
 * sidenav layout with:
 * - Top toolbar with language switcher
 * - Left sidenav navigation showing news sources
 * - Main content area displaying articles for the selected source
 * - Footer with application metadata
 *
 * The component acts as a container/smart component that:
 * - Injects and initializes the NewsStore application service
 * - Manages source and article projections from the store
 * - Handles user interactions (source selection)
 * - Orchestrates navigation between sources and article loading
 *
 * @example
 * ```html
 * <app-layout></app-layout>
 * ```
 */
@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    MatSidenavContent,
    MatIconButton,
    MatIcon,
    LanguageSwitcher,
    Footer,
    SourceList,
    ArticleList,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements AfterViewInit {
  /**
   * Injected application store for the News bounded context.
   *
   * @remarks
   * The store is responsible for state management, data caching, and
   * coordination with infrastructure services.
   */
  protected store = inject(NewsStore);

  /**
   * Reactive projection of all available news sources.
   *
   * @remarks
   * This computed signal is consumed by the SourceList component to
   * render the navigation options. It updates automatically when the
   * store's sources signal changes.
   */
  protected readonly sources = this.store.sources;

  /**
   * Reactive projection of articles for the currently selected source.
   *
   * @remarks
   * This computed signal is consumed by the ArticleList component to
   * render the article cards. It updates automatically when the current
   * source changes or articles are loaded/cached.
   */
  protected readonly articles = this.store.currentSourceArticles;

  /**
   * Lifecycle hook: Initializes data loading when the component view is initialized.
   *
   * @remarks
   * Called after the component's view and child views are initialized. This is
   * the appropriate place to:
   * 1. Trigger initial data loading from the store
   * 2. Initialize source and article displays
   * 3. Set up any view-specific state
   *
   * The store handles caching internally, so multiple calls to load methods
   * are safe and efficient.
   *
   * @example
   * This method is called automatically by Angular during initialization.
   */
  ngAfterViewInit(): void {
    this.store.loadSources();
    console.log('Current Source: ', this.store.currentSource);
    this.store.loadArticlesForCurrentSource();
  }

  /**
   * Updates the displayed articles when the user selects a different source.
   *
   * @remarks
   * This method is called when the user selects a source from the navigation
   * sidenav. It updates the store's current source, which triggers:
   * 1. Setting the new source as the navigation focus
   * 2. Loading articles for the new source (if not cached)
   * 3. Updating reactive projections for the view
   *
   * @param source - The Source domain entity selected by the user from the
   *                 navigation list.
   *
   * @example
   * ```html
   * <app-source-list
   *   [sources]="sources()"
   *   (sourceSelected)="updateArticlesBySource($event)"
   * />
   * ```
   */
  updateArticlesBySource(source: Source): void {
    this.store.currentSource = source;
    this.store.loadArticlesForCurrentSource();
  }
}
