
import { Component, OnInit } from '@angular/core';
import { searchService } from '../searches-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  messageString : string;
  constructor(private service : searchService) { }

  ngOnInit() {
    
  }
  receive(){
    this.service.receiveData().subscribe(
      message => {
        console.log(message);
        this.messageString = message;
      }
    )    
  }

}
