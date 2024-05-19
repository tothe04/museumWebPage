import { Component, OnInit } from '@angular/core';
//import { ExhibitObject } from '../../shared/constants/constants';
import { ExhibitsService } from '../../shared/services/exhibits.service';
import { Exhibit } from '../../shared/models/Exhibit';

@Component({
  selector: 'app-exhibits',
  templateUrl: './exhibits.component.html',
  styleUrl: './exhibits.component.scss'
})
export class ExhibitsComponent implements OnInit {


  exhibitObject?: Array<Exhibit>;
  chosenExhibit?: Exhibit;

  constructor(private exhibitsService: ExhibitsService) { }

  ngOnInit(): void {
    this.exhibitsService.loadExhibitMeta('exhibits.json').subscribe((data: Array<Exhibit>) => {
      this.exhibitObject = data;
    })

  }


  loadExhibit(exhibitObject: Exhibit) {
    this.chosenExhibit = exhibitObject;
  }

}
