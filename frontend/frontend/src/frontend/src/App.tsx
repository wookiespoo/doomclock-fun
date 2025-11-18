import { useState, useEffect } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Clock from './components/Clock'
import BetBar from './components/BetBar'
import VotingBar from './components/VotingBar'
import { startDoomsdayTicker } from './utils/tickingSound'
import { pickDailyCoin } from './utils/coinPicker'
import Confetti from 'react-confetti'

function App() {
  const [timeLeft, setTimeLeft] = useState(600)
  const [isDoom, setIsDoom] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [dailyCoin, setDailyCoin] = useState(null)
  const [pot, setPot] = useState(0)
  const [players, setPlayers] = useState(0)

  useEffect(() => {
    const now = new Date()
    if (now.getUTCHours() === 0 && now.getUTCMinutes() === 0 && now.getUTCSeconds() < 10) {
      pickDailyCoin().then(setDailyCoin)
    }

    const interval = setInterval(() => {
      const now = new Date()
      const nextMidnight = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
      nextMidnight.setUTCHours(0, 0, 0, 0)
      const diff = nextMidnight.getTime() - now.getTime()
      const seconds = Math.floor(diff / 1000)
      setTimeLeft(Math.max(0, Math.floor(seconds / 60)))

      if (seconds <= 0) {
        setIsDoom(Math.random() > 0.5)
        if (!isDoom) setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      }
    }, 1000)

    if (timeLeft > 0 && timeLeft <= 600) {
      startDoomsdayTicker(timeLeft * 60)
    }

    return () => clearInterval(interval)
  }, [timeLeft, isDoom])

  return (
    <div className="App">
      <style>{`
        .doom-flash { background: rgba(255,0,51,0.9); transition: opacity 800ms; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .glitch { animation: shake 0.5s infinite; font-family: 'Courier New', monospace; font-size: 4rem; color: #ff0033; text-shadow: 0 0 10px #ff0033; }
      `}</style>
      {showConfetti && <Confetti />}
      {isDoom && <div className="doom-flash glitch fixed inset-0 flex items-center justify-center z-50">DOOM.</div>}
      <WalletMultiButton className="fixed top-4 right-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded" />
      <div className="flex flex-col items-center justify-center h-screen">
        <Clock timeLeft={timeLeft} />
        <svg className="w-64 h-32 mt-4" viewBox="0 0 400 200">
          <path className="chart-line" d="M50 150 Q150 100 250 50 Q350 0 350 50" fill="none" />
          <circle className="gold-coin" cx="350" cy="50" r="10" fill="gold" />
        </svg>
        <VotingBar />
        <BetBar pot={pot} players={players} />
        <div className="mt-4 text-sm opacity-75">Pot: {pot} SOL | Players: {players}</div>
      </div>
    </div>
  )
}

export default App
