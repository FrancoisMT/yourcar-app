import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../../models/ChatMessage';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrl: './chat-user.component.css'
})
export class ChatUserComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  userId!: number;
  userName:string = "";

  constructor(private chatService: ChatService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userId = Number(localStorage.getItem('id'));
      this.userName = localStorage.getItem('name') ?? ''; ;
    } 
  }

  ngOnInit(): void {
     // Récupérer les anciens messages à partir de l'API
     this.chatService.getMessagesByUserId(this.userId).subscribe((messages: ChatMessage[]) => {
      this.messages = messages;
      console.log('Ancien messages:', this.messages);
    });

    // S'abonner aux nouveaux messages reçus via WebSocket
    this.chatService.messages.subscribe((message: ChatMessage) => {
      this.messages.push(message);
      console.log('Nouveau message:', message);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: ChatMessage = {
        content: this.newMessage,
        date: new Date(),
        user: { id: this.userId }, 
        agent: null, 
      };
      console.log(message);
      this.chatService.sendMessage(message); 
      this.newMessage = ''; 
    }
  }
  
  

  

}
