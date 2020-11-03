import { Component, OnInit, Input } from '@angular/core';
import { searchService } from "../../searches-data.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() filteredResult;
  constructor(private searches: searchService ) { }
  ngOnInit() {
  
  }
}
