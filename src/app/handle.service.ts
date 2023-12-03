import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleService {

  private socket: WebSocket;
  private messageCallbacks: ((message: any) => void)[] = [];

  constructor() {
    // Replace 'ws://localhost:3000' with your WebSocket API endpoint
    this.socket = new WebSocket('ws://localhost:3000');

    try {
      //this.socket = new WebSocket('ws://localhost:3000');
  
      this.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        this.messageCallbacks.forEach((callback) => {
          callback(message);
        });
      });
  
      this.socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
      });
  
      this.socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
      });
  
      this.socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });
    } catch (error) {
      console.error('WebSocket initialization error:', error);
    }
  }

  // Send a message to the server
  sendMessage(message: string): void {
    console.log(message)
    this.socket.send(JSON.stringify({ type: 'message', content: message }));
  }

  // Receive messages from the server
  onMessage(callback: (message: any) => void): void {
    this.messageCallbacks.push(callback);
  }

  // Close the WebSocket connection
  closeConnection(): void {
    this.socket.close();
  }
  
}
