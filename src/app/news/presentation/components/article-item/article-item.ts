import {Component, inject, input} from '@angular/core';
import {Article} from '../../../domain/model/article.entity';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';

/**
 * Presentation component for rendering a single article card.
 *
 * @remarks
 * This component is part of the presentation layer and is responsible for
 * displaying a single article with its metadata (title, description, image,
 * publication date, and source information). It provides article-specific
 * interactions such as sharing via the Web Share API or copying the URL
 * to the clipboard.
 *
 * The component receives the article as a required signal input and displays
 * it using Angular Material card components. It communicates feedback to the
 * user through Material snack bar notifications.
 *
 * @example
 * ```html
 * <app-article-item [article]="article" />
 * ```
 */
@Component({
  selector: 'app-article-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    DatePipe,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardImage,
    TranslatePipe,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './article-item.html',
  styleUrl: './article-item.css'
})
export class ArticleItem {
  /** Injected Material snack bar service for user notifications. */
  private snackBar = inject(MatSnackBar);

  /** Input: The article domain entity to display in this component. */
  article = input.required<Article>();

  /**
   * Shares the current article through native Web Share API or clipboard fallback.
   *
   * @remarks
   * This method attempts to share the article using the browser's native
   * Web Share API if available. If not supported, it falls back to copying
   * the article URL to the clipboard. User feedback is provided via material
   * snack bar messages.
   *
   * Shared information includes:
   * - Article title
   * - Article URL
   *
   * The method is async to handle promise-based Web Share API and clipboard
   * operations. Errors during sharing are caught and communicated to the user.
   *
   * @example
   * ```html
   * <button (click)="shareArticle()">Share Article</button>
   * ```
   */
  async shareArticle() {
    const articleShareInfo = {
      title: this.article()?.title,
      url: this.article()?.url
    };

    if (navigator.share) {
      try {
        await navigator.share(articleShareInfo);
        this.snackBar.open('Article shared successfully!', 'Close', { duration: 3000 });
      } catch (error) {
        this.snackBar.open('Sharing failed.', 'Close', { duration: 3000 });
      }
    } else {
      try {
        if (articleShareInfo.url) {
          await navigator.clipboard.writeText(articleShareInfo.url);
          this.snackBar.open('Article URL copied to clipboard!', 'Close', { duration: 3000 });
        }
      } catch (error) {
        this.snackBar.open('Failed to copy URL.', 'Close', { duration: 3000 });
      }
    }
  }

}
