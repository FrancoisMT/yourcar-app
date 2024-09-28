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
  userName: string = "";

  constructor(private chatService: ChatService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userId = Number(localStorage.getItem('id'));
      this.userName = localStorage.getItem('name') ?? '';;
    }
  }

  ngOnInit(): void {
    this.chatService.getMessagesByUserId(this.userId).subscribe((messages) => {

      let chatmessage: ChatMessage;

      messages.forEach((elt) => {
        chatmessage = elt
        if (elt.agent) {
          chatmessage.autor = "ADMIN";
        } else {
          chatmessage.autor = this.userName;
        }

        this.messages.push(chatmessage);
      })

      console.log('Ancien messages:', this.messages);
    });

    this.chatService.messages.subscribe((message: ChatMessage) => {
      message.autor = message.agent ? "ADMIN" : this.userName;
      this.messages.push(message);
      console.log('Nouveau message:', message);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
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
