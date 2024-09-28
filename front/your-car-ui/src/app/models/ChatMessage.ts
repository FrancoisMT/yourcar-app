export interface ChatMessage {
    content: string;
    date: Date;
    user?: { id: number };
    agent?: { id: number } | null;
    autor:string;
}