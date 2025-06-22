import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('day', { ascending: true })

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data || [])
  }

  if (req.method === 'POST') {
    const { p1, p2, goal, game, day, time } = req.body
    const { data, error } = await supabase
      .from('matches')
      .insert([{ p1, p2, goal, game, day, time }])
      .select()

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ success: true, data })
  }

  // Method not allowed for any other HTTP methods
  return res.status(405).json({ error: 'Method Not Allowed' })
}
