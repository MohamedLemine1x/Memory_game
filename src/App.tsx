import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import type { Card, GameState } from './types';

// Constantes globales pour le jeu
const CARD_PAIRS = 8; // Nombre de paires de cartes
const CARD_SYMBOLS = ['🌟', '🌙', '🌍', '🌈', '⭐', '☀️', '🌺', '🍀']; // Symboles utilisés pour les cartes

// Fonction pour mélanger les cartes aléatoirement
const shuffleCards = (array: Card[]): Card[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Fonction pour créer une nouvelle partie
const createNewGame = (): Card[] => {
  const cards: Card[] = [];
  // Création des paires de cartes avec les symboles
  for (let i = 0; i < CARD_PAIRS; i++) {
    const symbol = CARD_SYMBOLS[i];
    cards.push(
      { id: i * 2, value: symbol, isFlipped: false, isMatched: false },
      { id: i * 2 + 1, value: symbol, isFlipped: false, isMatched: false }
    );
  }
  return shuffleCards(cards); // Retourne les cartes mélangées
};

// Fonction pour formater le temps en minutes:secondes
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

function App() {
  // État initial du jeu avec useMemo pour éviter les recalculs inutiles
  const initialGameState = useMemo(() => ({
    cards: createNewGame(), // Cartes initiales
    score: 0, // Score actuel
    bestScore: Number(localStorage.getItem('bestScore') || '0'), // Meilleur score stocké
    moves: 0, // Nombre de mouvements
    firstCard: null, // Première carte sélectionnée
    secondCard: null, // Deuxième carte sélectionnée
    totalMoves: Number(localStorage.getItem('totalMoves') || '0') // Total des mouvements historiques
  }), []);

  // États principaux du composant
  const [gameState, setGameState] = useState<GameState>(initialGameState); // État du jeu
  const [timer, setTimer] = useState(0); // Chronomètre
  const [isPlaying, setIsPlaying] = useState(false); // Indicateur de partie en cours

  // Effet pour gérer le chronomètre
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      // Démarre le chronomètre si la partie est en cours
      interval = setInterval(() => setTimer(time => time + 1), 1000);
    }
    // Nettoyage de l'intervalle à la fin
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Fonction pour vérifier si deux cartes correspondent
  const checkForMatch = useCallback((firstCard: Card, secondCard: Card, cards: Card[]) => {
    setTimeout(() => {
      const isMatch = firstCard.value === secondCard.value; // Vérifie si les valeurs correspondent
      const newScore = isMatch ? gameState.score + 10 : gameState.score; // Ajoute des points si match
      const newBestScore = Math.max(newScore, gameState.bestScore); // Met à jour le meilleur score
      const newTotalMoves = gameState.totalMoves + 1; // Incrémente le total des mouvements

      // Sauvegarde dans le localStorage
      localStorage.setItem('bestScore', String(newBestScore));
      localStorage.setItem('totalMoves', String(newTotalMoves));

      // Mise à jour des cartes après la vérification
      const updatedCards = cards.map(card =>
        (card.id === firstCard.id || card.id === secondCard.id)
          ? { ...card, isFlipped: false, isMatched: isMatch } // Réinitialise ou marque comme matched
          : card
      );

      // Mise à jour de l'état du jeu
      setGameState(prevState => ({
        ...prevState,
        cards: updatedCards,
        firstCard: null,
        secondCard: null,
        score: newScore,
        bestScore: newBestScore,
        totalMoves: newTotalMoves
      }));

      // Vérifie si toutes les cartes sont matched pour arrêter le jeu
      if (updatedCards.every(card => card.isMatched)) {
        setIsPlaying(false);
      }
    }, 1000); // Délai d'une seconde avant la vérification
  }, [gameState]);

  // Gestion du clic sur une carte
  const handleCardClick = useCallback((clickedCard: Card) => {
    if (!isPlaying) {
      setIsPlaying(true); // Démarre la partie si ce n'est pas déjà fait
    }

    // Ignore le clic si la carte est déjà matched, flipped ou si une deuxième carte est en attente
    if (clickedCard.isMatched || clickedCard.isFlipped || gameState.secondCard) {
      return;
    }

    // Retourne la carte cliquée
    const updatedCards = gameState.cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    // Si aucune première carte n'est sélectionnée
    if (!gameState.firstCard) {
      setGameState(prevState => ({
        ...prevState,
        cards: updatedCards,
        firstCard: clickedCard
      }));
      return;
    }

    // Si une première carte existe, traite la deuxième carte
    setGameState(prevState => {
      const newState = {
        ...prevState,
        cards: updatedCards,
        secondCard: clickedCard,
        moves: prevState.moves + 1,
      };
      checkForMatch(prevState.firstCard!, clickedCard, updatedCards); // Vérifie la correspondance
      return newState;
    });
  }, [gameState, isPlaying, checkForMatch]);

  // Fonction pour réinitialiser le jeu
  const resetGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      cards: createNewGame(), // Crée un nouveau jeu
      score: 0,
      moves: 0,
      firstCard: null,
      secondCard: null,
    }));
    setTimer(0); // Réinitialise le chronomètre
    setIsPlaying(false); // Arrête la partie
  }, []);

  // Vérifie si le joueur a gagné
  const gameWon = useMemo(() => gameState.cards.every(card => card.isMatched), [gameState.cards]);

  // Rendu du composant
  return (
    <div className="container">
      <div className="game-board">
        <div className="header">
          <h1 className="title">
            Memory Game <Sparkles size={32} color="#2dd4bf" /> {/* Titre avec icône */}
          </h1>
          
          <div className="stats">
            <div className="stat">
              <p data-value={gameState.score}>Score</p>
              <p data-value={gameState.bestScore}>Best Score</p>
              <p data-value={gameState.moves}>Moves</p>
              <p data-value={formatTime(timer)}>Time</p>
            </div>
          </div>
        </div>

        <div className="cards-grid">
          {/* Affichage des cartes */}
          {gameState.cards.map(card => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
              disabled={card.isMatched}
              data-value={card.value}
            />
          ))}
        </div>

        {/* Message de victoire */}
        {gameWon && (
          <div className="win-message">
            <p>Congratulations! You won in {gameState.moves} moves and {formatTime(timer)}!</p>
          </div>
        )}

        <button onClick={resetGame} className="button">
          New Game {/* Bouton pour recommencer */}
        </button>
      </div>
    </div>
  );
}

export default App;