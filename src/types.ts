// Structure d'une carte
export interface Card {
  id: number;    // Identifiant de la carte    
  value: string;     // Symbole del  la carte (emoji)
  isFlipped: boolean;// Si la carte est retournée
  isMatched: boolean;// Si la carte a trouvé sa paire
}

// État global du jeu
export interface GameState {
  cards: Card[];           // Liste des cartes
  score: number;          // Score actuel
  bestScore: number;      // Meilleur score
  moves: number;          // Nombre de coups joués
  totalMoves: number;     // Nombre total de coups joués
  firstCard: Card | null; // Première carte retournée
  secondCard: Card | null;// Deuxième carte retournée

}