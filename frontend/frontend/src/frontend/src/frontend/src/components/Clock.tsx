import { FC } from 'react'

interface ClockProps {
  timeLeft: number
}

const Clock: FC<ClockProps> = ({ timeLeft }) => {
  const format = (t: number) => t.toString().padStart(2, '0')
  const mins = format(Math.floor(timeLeft / 60))
  const secs = format(timeLeft % 60)

  return (
    <svg viewBox="0 0 400 400" className={`clock ${timeLeft <= 10 ? 'final-10' : ''}`}>
      <defs>
        <radialGradient id="glow">
          <stop offset="0%" stopColor="#ff0033" stopOpacity="1"/>
          <stop offset="100%" stopColor="#ff0033" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="none" stroke="#ff0033" strokeWidth="6"/>
      <circle cx="200" cy="200" r="190" fill="none" stroke="url(#glow)" strokeWidth="20" opacity="0.6" filter="blur(8px)"/>
      <text x="200" y="230" fontSize="72" textAnchor="middle" fill="#ff0033" fontFamily="Orbitron, monospace" filter="drop-shadow(0 0 20px #ff0033)">
        {`${mins}:${secs}`}
      </text>
    </svg>
  )
}

export default Clock
