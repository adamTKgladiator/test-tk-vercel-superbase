import { useState, useEffect } from 'react'

export default function Home() {
  const [matches, setMatches] = useState([])
  const [formData, setFormData] = useState({
    p1: '',
    p2: '',
    goal: '',
    game: '',
    day: '',
    time: ''
  })

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(setMatches)
  }, [])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (data.success) {
      setFormData({ p1: '', p2: '', goal: '', game: '', day: '', time: '' })
      setMatches(prev => [...prev, data.data[0]])
    } else {
      alert('Error: ' + (data.error || 'Unknown error'))
    }
  }

  return (
    <main style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Match Entry</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input name="p1" placeholder="Player 1" value={formData.p1} onChange={handleChange} required />
        <input name="p2" placeholder="Player 2" value={formData.p2} onChange={handleChange} required />
        <input name="goal" placeholder="Goal (e.g. 3-2)" value={formData.goal} onChange={handleChange} required />
        <input name="game" placeholder="Game" value={formData.game} onChange={handleChange} required />
        <input name="day" type="date" value={formData.day} onChange={handleChange} required />
        <input name="time" type="time" value={formData.time} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>

      <h2>Matches</h2>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th><th>Player 1</th><th>Player 2</th><th>Goal</th><th>Game</th><th>Day</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(match => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.p1}</td>
              <td>{match.p2}</td>
              <td>{match.goal}</td>
              <td>{match.game}</td>
              <td>{match.day}</td>
              <td>{match.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
