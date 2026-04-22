import {Component, input} from '@angular/core';
import {Article} from '../../../domain/model/article.entity';
import {ArticleItem} from '../article-item/article-item';

@Component({
  selector: 'app-article-list',
  imports: [
    ArticleItem
  ],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css'
})
/**
 * Presentation component that renders a list of article cards.
 */
export class ArticleList {
  /** Input collection of articles to display. */
  articles = input.required<Array<Article>>();
}
