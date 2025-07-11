import { NextRequest, NextResponse } from 'next/server'

// Define vaccination type
interface Vaccination {
  _id: string
  name: string
  dueDate: string
  status: string
  notes: string
  ageGroup: string
  category: string
  createdAt: string
}

// GET /api/vaccinations
export async function GET(request: NextRequest) {
  console.log("🔥 GET API Route called")

  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 })
    }

    // TODO: Replace with DB fetch
    const vaccinations: Vaccination[] = []

    return NextResponse.json(vaccinations)
  } catch (error: unknown) {
    const err = error as Error
    console.error("❌ GET Error:", err.message)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/vaccinations
export async function POST(request: NextRequest) {
  console.log("🔥 POST API Route called")

  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 })
    }

    const body = await request.json()
    console.log("📋 Request body:", body)

    const { name, dueDate, status, notes, ageGroup, category } = body

    if (!name || !dueDate || !status || !ageGroup || !category) {
      return NextResponse.json({
        message: 'Missing required fields',
        required: ['name', 'dueDate', 'status', 'ageGroup', 'category'],
        received: body
      }, { status: 400 })
    }

    const newVaccination: Vaccination = {
      _id: Date.now().toString(),
      name,
      dueDate,
      status,
      notes: notes || '',
      ageGroup,
      category,
      createdAt: new Date().toISOString()
    }

    console.log("✅ Creating vaccination:", newVaccination)

    return NextResponse.json(newVaccination, { status: 201 })
  } catch (error: unknown) {
    const err = error as Error
    console.error("❌ POST Error:", err.message)
    return NextResponse.json({
      message: 'Internal server error',
      error: err.message
    }, { status: 500 })
  }
}
