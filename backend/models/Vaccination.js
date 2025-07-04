// models/Vaccination.js
import mongoose from 'mongoose'

const vaccinationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'overdue'],
    default: 'upcoming',
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  ageGroup: {
    type: String,
    enum: [
      'birth',
      '2-months',
      '4-months', 
      '6-months',
      '12-months',
      '15-months',
      '18-months',
      '24-months',
      '4-6-years',
      '11-12-years',
      'pregnancy',
      'adult'
    ],
    required: true
  },
  category: {
    type: String,
    enum: ['routine', 'catch-up', 'high-risk', 'travel', 'pregnancy'],
    default: 'routine',
    required: true
  },
  completedDate: {
    type: Date,
    default: null
  },
  reminder: {
    enabled: {
      type: Boolean,
      default: true
    },
    daysBeforeReminder: {
      type: Number,
      default: 7
    },
    lastReminderSent: {
      type: Date,
      default: null
    }
  },
  healthcareProvider: {
    name: {
      type: String,
      trim: true
    },
    contact: {
      type: String,
      trim: true
    }
  },
  batchNumber: {
    type: String,
    trim: true
  },
  manufacturer: {
    type: String,
    trim: true
  },
  sideEffects: {
    type: String,
    trim: true
  },
  nextDueDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

// Index for efficient querying
vaccinationSchema.index({ userId: 1, dueDate: 1 })
vaccinationSchema.index({ userId: 1, status: 1 })
vaccinationSchema.index({ userId: 1, ageGroup: 1 })

// Virtual for formatted due date
vaccinationSchema.virtual('dueDateFormatted').get(function() {
  return this.dueDate.toISOString().split('T')[0]
})

// Method to check if vaccination is overdue
vaccinationSchema.methods.isOverdue = function() {
  return this.status === 'upcoming' && this.dueDate < new Date()
}

// Static method to update overdue vaccinations
vaccinationSchema.statics.updateOverdueVaccinations = async function(userId) {
  const overdueVaccinations = await this.find({
    userId: userId,
    status: 'upcoming',
    dueDate: { $lt: new Date() }
  })

  if (overdueVaccinations.length > 0) {
    await this.updateMany(
      {
        userId: userId,
        status: 'upcoming',
        dueDate: { $lt: new Date() }
      },
      { status: 'overdue' }
    )
  }

  return overdueVaccinations.length
}

// Pre-save middleware to update status
vaccinationSchema.pre('save', function(next) {
  if (this.status === 'upcoming' && this.dueDate < new Date()) {
    this.status = 'overdue'
  }
  
  if (this.status === 'completed' && !this.completedDate) {
    this.completedDate = new Date()
  }
  
  next()
})

// Ensure virtual fields are serialized
vaccinationSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.dueDate = ret.dueDateFormatted
    delete ret.dueDateFormatted
    return ret
  }
})

export default mongoose.models.Vaccination || mongoose.model('Vaccination', vaccinationSchema)