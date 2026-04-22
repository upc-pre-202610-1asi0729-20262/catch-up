import {Component, input} from '@angular/core';
import {Article} from '../../../domain/model/article.entity';
import {ArticleItem} from '../article-item/article-item';

/**
 * Presentation component for rendering a collection of article cards.
 *
 * @remarks
 * This component is part of the presentation layer and serves as a container
 * for displaying multiple articles. It receives an array of Article domain
 * entities and iterates over them, delegating individual article rendering
 * to the ArticleItem component.
 *
 * The component follows the container/presentational component pattern and
 * acts as a pure presentational component with no side effects.
 *
 * @example
 * ```html
 * <app-article-list [articles]="articles()" />
 * ```
 */
@Component({
  selector: 'app-article-list',
  imports: [
    ArticleItem
  ],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css'
})
export class ArticleList {
  /** Input: Collection of Article domain entities to display in this list. */
  articles = input.required<Array<Article>>();
}
