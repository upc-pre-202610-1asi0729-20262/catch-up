import {Component, input, output} from '@angular/core';
import {Source} from '../../../domain/model/source.entity';
import {MatNavList} from '@angular/material/list';
import {SourceItem} from '../source-item/source-item';

/**
 * Presentation component for rendering the navigation list of available news sources.
 *
 * @remarks
 * This component is part of the presentation layer and serves as a container
 * for displaying multiple news sources in a Material navigation list. It acts
 * as an intermediary between the application store and individual SourceItem
 * components, relaying source selection events from child items to parent
 * containers.
 *
 * The component implements event delegation, allowing child SourceItem components
 * to emit selection events that are propagated upward for handling by the
 * application layer.
 *
 * @example
 * ```html
 * <app-source-list
 *   [sources]="sources()"
 *   (sourceSelected)="onSourceSelected($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-source-list',
  imports: [
    MatNavList,
    SourceItem
  ],
  templateUrl: './source-list.html',
  styleUrl: './source-list.css'
})
export class SourceList {
  /** Input: Array of Source domain entities supplied by the application state. */
  sources = input<Source[]>();

  /** Output: Event emitted when one source is chosen by the user. */
  sourceSelected = output<Source>();

  /**
   * Relays source selection events from child items to parent containers.
   *
   * @remarks
   * This method implements event delegation, allowing the component to act as
   * a pass-through for source selection events. Child SourceItem components
   * emit events that are captured and re-emitted by this component to ancestors
   * responsible for handling source changes.
   *
   * @param source - The Source domain entity that was selected by the user.
   *
   * @example
   * ```html
   * <app-source-item
   *   *ngFor="let source of sources()"
   *   [source]="source"
   *   (sourceSelected)="emitSourceSelectedEvent($event)"
   * />
   * ```
   */
  emitSourceSelectedEvent(source: Source) {
    this.sourceSelected.emit(source);
  }
}
