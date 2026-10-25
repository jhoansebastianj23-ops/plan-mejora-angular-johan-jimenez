import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() previousPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  onPrevious() {
    this.previousPage.emit();
  }

  onNext() {
    this.nextPage.emit();
  }
}
