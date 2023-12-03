import { Component, NgZone, OnInit } from '@angular/core';
import { HandleService } from '../handle.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  message = '';
  messages: any[] = [];
  numbers: number[] = [];

  constructor(private websocketService: HandleService) {
   
  }
  ngOnInit(){
    console.log(this.messages)
    this.websocketService.onMessage((message) => {
      console.log(message)
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    console.log(this.message)
    this.websocketService.sendMessage(this.message);
    this.message = '';
    //this.ngOnInit()
  }
  add()
  {
    this.numbers.push(5)
  }
  ngOnDestroy(): void {
    // Make sure to close the WebSocket connection when the component is destroyed
    this.websocketService.closeConnection();
  }
}
