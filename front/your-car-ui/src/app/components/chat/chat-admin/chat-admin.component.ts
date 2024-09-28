import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { ChatMessage } from '../../../models/ChatMessage';

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css' ] // Corrigé de 'styleUrl' à 'styleUrls'
})
export class ChatAdminComponent implements OnInit {
  id!: number;
  name: string = "";
  users: any[] = [];
  selectedUserId!: number;
  messages: ChatMessage[] = []; // Changez 'any[]' à 'ChatMessage[]' pour garder le type
  newMessage: string = '';

  constructor(private chatService: ChatService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.id = Number(localStorage.getItem('id'));
      this.name = localStorage.getItem('name') ?? '';
    }
  }

  ngOnInit(): void {
    this.loadUsers();

    // Recevoir les nouveaux messages
    this.chatService.messages.subscribe((message: ChatMessage) => {
      if (message.user?.id === this.selectedUserId || message.agent?.id === this.id) {
        message.autor = message.agent ? "ADMIN" : "CLIENT";
        this.messages.push(message);
      }
      console.log('Nouveau message:', message);
    });
  }

  loadUsers() {
    this.chatService.getUsers().subscribe((response) => {
      this.users = response;
      // Sélectionner le premier utilisateur par défaut s'il y en a
      if (this.users.length > 0) {
          this.selectUser(this.users[0].id); 
      }
  });
  }

  selectUser(userId: number) {
    this.selectedUserId = userId;
    this.loadMessages(userId); // Charge les messages pour l'utilisateur sélectionné
  }

  loadMessages(userId: number) {
    // Charge les messages liés à l'utilisateur sélectionné
    this.chatService.getMessagesByUserId(userId).subscribe((data: ChatMessage[]) => {
      this.messages = data.map((elt) => {
        // Mettez à jour chaque message avec son auteur
        elt.autor = elt.agent ? "ADMIN" : "CLIENT"; // Détermine l'auteur
        return elt;
      });
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = {
        content: this.newMessage,
        date: new Date(), // Ajoutez la date actuelle
        user: { id: this.selectedUserId }, // ID de l'utilisateur avec lequel vous chatter
        agent: { id: this.id } // ID de l'admin
      };
      this.chatService.sendMessage(message); // Envoie le message
      this.newMessage = ''; // Réinitialise le champ de message
    }
  }
}