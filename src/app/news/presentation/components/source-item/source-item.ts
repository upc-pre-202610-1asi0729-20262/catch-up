import {Component, input, output} from '@angular/core';
import {Source} from '../../../domain/model/source.entity';
import {MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-source-item',
  imports: [
    MatListItem
  ],
  templateUrl: './source-item.html',
  styleUrl: './source-item.css'
})
/**
 * Presentation component for one source entry in the navigation list.
 */
export class SourceItem {
  /** Input source displayed by this item. */
  source = input.required<Source>();
  /** Output event emitted when the user selects the source. */
  sourceSelected = output<Source>();

  /** Emits the selected source to parent components. */
  emitSourceSelectedEvent() {
    this.sourceSelected.emit(this.source());
  }

}
