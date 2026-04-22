import {Component, input, output} from '@angular/core';
import {Source} from '../../../domain/model/source.entity';
import {MatNavList} from '@angular/material/list';
import {SourceItem} from '../source-item/source-item';

@Component({
  selector: 'app-source-list',
  imports: [
    MatNavList,
    SourceItem
  ],
  templateUrl: './source-list.html',
  styleUrl: './source-list.css'
})
/**
 * Presentation component that renders the list of available news sources.
 */
export class SourceList {
  /** Input source collection supplied by the application state. */
  sources = input<Source[]>();
  /** Output event emitted when one source is chosen. */
  sourceSelected = output<Source>();

  /**
   * Relays source selection events from child items to parent containers.
   *
   * @param source - Selected source.
   */
  emitSourceSelectedEvent(source: Source) {
    this.sourceSelected.emit(source);
  }
}
