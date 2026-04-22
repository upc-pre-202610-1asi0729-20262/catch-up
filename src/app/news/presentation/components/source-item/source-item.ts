import {Component, input, output} from '@angular/core';
import {Source} from '../../../domain/model/source.entity';
import {MatListItem} from '@angular/material/list';

/**
 * Presentation component for rendering a single source item in the navigation list.
 *
 * @remarks
 * This component is part of the presentation layer and displays a single
 * news source as a Material list item. It acts as a leaf component in the
 * component hierarchy and communicates source selection back to parent
 * components via output events.
 *
 * The component follows the container/presentational component pattern and
 * is primarily responsible for rendering and event delegation.
 *
 * @example
 * ```html
 * <app-source-item
 *   [source]="source"
 *   (sourceSelected)="onSourceSelected($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-source-item',
  imports: [
    MatListItem
  ],
  templateUrl: './source-item.html',
  styleUrl: './source-item.css'
})
export class SourceItem {
  /** Input: The Source domain entity displayed by this list item. */
  source = input.required<Source>();

  /** Output: Event emitted when the user selects this source for navigation. */
  sourceSelected = output<Source>();

  /**
   * Emits the selected source to parent components.
   *
   * @remarks
   * This method is typically called from the template when the user clicks
   * on the source item. It propagates the source selection event up the
   * component tree for handling by container components.
   *
   * @example
   * ```html
   * <mat-list-item (click)="emitSourceSelectedEvent()">
   *   {{ source().name }}
   * </mat-list-item>
   * ```
   */
  emitSourceSelectedEvent() {
    this.sourceSelected.emit(this.source());
  }

}
