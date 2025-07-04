// pages/api/vaccinations/[id].js (for individual vaccination updates)
export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query

  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    switch (method) {
      case 'PUT':
        const { name, dueDate, status, notes, ageGroup, category } = req.body
        
        if (!name || !dueDate || !status || !ageGroup || !category) {
          return res.status(400).json({ message: 'Missing required fields' })
        }

        // TODO: Update in database
        const updatedVaccination = {
          _id: id,
          name,
          dueDate,
          status,
          notes: notes || '',
          ageGroup,
          category,
          updatedAt: new Date().toISOString()
        }

        console.log("Updating vaccination:", updatedVaccination)
        
        return res.status(200).json(updatedVaccination)

      case 'DELETE':
        // TODO: Delete from database
        console.log("Deleting vaccination:", id)
        return res.status(200).json({ message: 'Vaccination deleted' })

      default:
        res.setHeader('Allow', ['PUT', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error("API Error:", error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}