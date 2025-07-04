import { NextRequest, NextResponse } from 'next/server'

export async function GET(request) {
  console.log("🔥 GET API Route called")
  
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 })
    }

    // TODO: Fetch from database
    const vaccinations = []
    
    return NextResponse.json(vaccinations)
  } catch (error) {
    console.error("❌ GET Error:", error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
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

    const newVaccination = {
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
  } catch (error) {
    console.error("❌ POST Error:", error)
    return NextResponse.json({ 
      message: 'Internal server error',
      error: error.message 
    }, { status: 500 })
  }
}