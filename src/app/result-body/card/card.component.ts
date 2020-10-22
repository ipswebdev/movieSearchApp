import { Component, OnInit, Input } from '@angular/core';
import { searchService } from "../../searches-data.service";
import { ResultDetails } from "../../result-details";
import { Result } from 'src/app/result';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers : [searchService]
})
export class CardComponent implements OnInit {
  results :Result[] = ResultDetails;
  @Input() filteredResult;
  constructor(private searches: searchService ) { }
  ngOnInit() {
  
  }
}
