import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnChanges {

  @Input() exhibitObjectInput?: Array<any>;
  @Output() exhibitObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenExhibit: any;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.exhibitObjectInput) {
      this.chosenExhibit = this.exhibitObjectInput[0];
      this.reload();
    }
  }

  ngOnInit(): void {


  }

  reload() {
    this.exhibitObjectEmitter.emit(this.chosenExhibit);
  }

}
