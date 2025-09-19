type BoardProps = {
  squares: ("X" | "O" | null)[]
  onClick: (index: number) => void
}

export default function Board({ squares, onClick }: BoardProps) {
  return (
    <div className="board">
      {squares.map((value, i) => (
        <button key={i} className="square" onClick={() => onClick(i)}>
          {value}
        </button>
      ))}
    </div>
  )
}
