import { FC } from 'react'

interface BetBarProps {
  pot: number
  players: number
}

const BetBar: FC<BetBarProps> = ({ pot, players }) => (
  <div className="mt-8 p-4 bg-black/50 rounded-lg w-80">
    <input type="number" placeholder="Bet SOL" className="w-full p-2 bg-transparent border border-green-500 rounded mb-2" step="0.01" />
    <div className="flex space-x-2 mb-2">
      <input type="range" min="1.01" max="20" defaultValue="2" className="flex-1" />
      <span>2x</span>
    </div>
    <button className="w-full bg-green-600 hover:bg-green-700 p-2 rounded mb-2">BET</button>
    <button className="w-full bg-yellow-600 hover:bg-yellow-700 p-2 rounded">Early Cashout (+20%)</button>
  </div>
)

export default BetBar
