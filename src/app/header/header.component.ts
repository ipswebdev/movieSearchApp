
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/searches-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private service: SearchService) { }

  ngOnInit() {
    
  }

}
