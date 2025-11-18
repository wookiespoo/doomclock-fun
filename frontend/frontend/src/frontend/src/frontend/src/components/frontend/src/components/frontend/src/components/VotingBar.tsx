import { FC, useState } from 'react'

const VotingBar: FC = () => {
  const [pumpVotes, setPumpVotes] = useState(0)
  const [doomVotes, setDoomVotes] = useState(0)

  return (
    <div className="mt-4 w-80 bg-black/50 rounded">
      <div className="flex h-8">
        <div className="bg-green-500 flex-1" style={{ flexBasis: `${pumpVotes / (pumpVotes + doomVotes) * 100}%` }}></div>
        <div className="bg-red-500 flex-1" style={{ flexBasis: `${doomVotes / (pumpVotes + doomVotes) * 100}%` }}></div>
      </div>
      <div className="flex justify-around p-2">
        <button onClick={() => setPumpVotes(pumpVotes + 1)} className="bg-green-600 px-4 py-1 rounded">PUMP</button>
        <button onClick={() => setDoomVotes(doomVotes + 1)} className="bg-red-600 px-4 py-1 rounded">DOOM</button>
      </div>
    </div>
  )
}

export default VotingBar
