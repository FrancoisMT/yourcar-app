import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from '../models/ChatMessage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient!: Client; // Utiliser Client ici
  private chatUrl = 'http://localhost:8080/chat'; // URL du WebSocket
  private apiUrl = 'http://localhost:8080/api/chat'; // URL pour retrouver les anciens messages
  public messages: Subject<ChatMessage> = new Subject<ChatMessage>(); // Pour suivre les messages reçus

  constructor(private http: HttpClient) {
    this.connect(); // Établir la connexion au démarrage du service
  }

   // Méthode pour récupérer les anciens messages d'un utilisateur
   getMessagesByUserId(userId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages/${userId}`);
  }

  // Connexion au WebSocket via SockJS et StompJS
  private connect() {
    const socket = new SockJS(this.chatUrl); // Crée une instance SockJS
    this.stompClient = new Client({
      webSocketFactory: () => socket, // Utilisez SockJS comme factory WebSocket
      connectHeaders: {}, // Ajoutez des headers si nécessaire
      debug: (str) => {
        console.log(str); // Affichez des messages de débogage si nécessaire
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame); // Log de la connexion réussie
        // Souscrire aux messages
        this.stompClient.subscribe('/topic/messages', (message) => {
          if (message.body) {
            this.messages.next(JSON.parse(message.body)); // Publie le message reçu
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']); // Gestion des erreurs
      },
    });

    this.stompClient.activate(); // Établit la connexion WebSocket
  }

  // Méthode pour envoyer un message
  public sendMessage(message: ChatMessage): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessage', // La destination dans le contrôleur Spring Boot
        body: JSON.stringify(message), // Sérialiser le message
      });
    } else {
      console.error('STOMP client is not connected');
    }
  }
}
