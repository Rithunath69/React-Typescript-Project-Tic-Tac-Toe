// Import React's useState Hook so we can store values inside our component
import { useState } from "react"

// Import the Board component that we will use to display 9 squares
import Board from "./board"

// Define a custom type "Player"
// A Player can only be "X", "O", or null (null means the square is empty)
type Player = "X" | "O" | null

// This is our main Game component
export default function Game() {
  // ---------------- STATE ----------------
  // 1. Create the "board" state.
  // - It is an array with 9 items.
  // - Each item is either "X", "O", or null.
  // - At the start, all 9 are null (empty board).
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))

  // 2. Create a state to track whose turn it is.
  // - true means it is "X"'s turn.
  // - false means it is "O"'s turn.
  const [xIsNext, setXIsNext] = useState(true)

  // ---------------- WINNER ----------------
  // Call the helper function "calculateWinner" to check if somebody has won.
  const winner = calculateWinner(board)

  // ---------------- HANDLE CLICK ----------------
  // This function runs when a player clicks on one of the 9 squares.
  function handleClick(index: number) {
    // 1. If the square is already filled, or if there is already a winner, do nothing.
    if (board[index] !== null || winner !== null) {
      return
    }

    // 2. Copy the current board into a new array.
    //    (We copy because React state should not be changed directly.)
    const newBoard = [...board]

    // 3. Place the correct player's symbol in the clicked square.
    if (xIsNext === true) {
      newBoard[index] = "X"
    } else {
      newBoard[index] = "O"
    }

    // 4. Update the state with the new board.
    setBoard(newBoard)

    // 5. Change the turn to the other player.
    setXIsNext(!xIsNext)
  }

  // ---------------- RESET GAME ----------------
  // This function will clear the board and start a new game.
  function resetGame() {
    // Reset the board to all empty (null)
    setBoard(Array(9).fill(null))
      

    // Always start with X
    setXIsNext(true)
  }

  // ---------------- STATUS MESSAGE ----------------
  // This text will show at the top of the game.
  // Example: "Winner: X" or "Next Player: O"
  let statusMessage = ""

  if (winner !== null) {
    // If there is a winner, display who won
    statusMessage = "Winner: " + winner
  } else {
    // Otherwise, tell whose turn is next
    if (xIsNext === true) {
      statusMessage = "Next Player: X"
    } else {
      statusMessage = "Next Player: O"
    }
  }

  // ---------------- RETURN JSX ----------------
  // This is what will be displayed on the screen
  return (
    <div className="game">
      {/* Display the status message */}
      <div className="status">{statusMessage}</div>

      {/* Render the board, and pass data and click handler */}
      <Board squares={board} onClick={handleClick} />

      {/* Reset button */}
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  )
}

// ---------------- HELPER FUNCTION ----------------
// This function checks if a player has won the game.
function calculateWinner(squares: Player[]) {
  // List of all possible winning lines (rows, columns, diagonals)
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ]

  // Go through each winning line
  for (const [a, b, c] of lines) {
    // If all three squares have the same value (and not null), return the winner
    if (
      squares[a] !== null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a] // Return "X" or "O"
    }
  }

  // If no winner found, return null
  return null
}
