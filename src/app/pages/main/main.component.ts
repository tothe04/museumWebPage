import { Component, OnInit } from '@angular/core';
import { ExhibitsService } from '../../shared/services/exhibits.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  loadImage?: string;

  constructor(private exhibitService: ExhibitsService,) {

  }

  ngOnInit(): void {
    this.exhibitService.loadExhibit('images/museum_image.jpg').subscribe(data => {
      this.loadImage = data;
    });

  }
}
