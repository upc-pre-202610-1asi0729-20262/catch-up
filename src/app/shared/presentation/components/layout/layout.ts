import { AfterContentInit, AfterViewInit, Component, inject, OnInit } from '@angular/core';
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
  /** Injected application store for the News bounded context. */
  protected store = inject(NewsStore);
  /** Reactive source list consumed by source navigation UI. */
  protected readonly sources = this.store.sources;
  /** Reactive article list for the currently selected source. */
  protected readonly articles = this.store.currentSourceArticles;

  /** Initializes source and article data when the layout is mounted. */
  ngAfterViewInit(): void {
    this.store.loadSources();
    console.log('Current Source: ', this.store.currentSource);
    this.store.loadArticlesForCurrentSource();
  }

  /**
   * Updates source selection and triggers article loading.
   *
   * @param source - Source selected by the user.
   */
  updateArticlesBySource(source: Source): void {
    this.store.currentSource = source;
    this.store.loadArticlesForCurrentSource();
  }
}
