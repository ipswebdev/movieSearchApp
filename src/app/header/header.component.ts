
import { Component, OnInit } from '@angular/core';
import { searchService } from '../searches-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private service : searchService) { }

  ngOnInit() {
    
  }

}
