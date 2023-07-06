import mongoose, { Document, Schema } from 'mongoose'

export interface IReport extends Document {
  title: string
  vehicle: string
  owner: string
  service: string
  createdAt: string
  description: string
  status: 'Pending' | 'In Progress' | 'Resolved'
  assignedTo: string
  attachments: string[]
  comments: string[]
}

const ReportSchema = new Schema<IReport>({
  title: {
    type: String,
    required: [true, 'Please enter your report title.'],
  },
  vehicle: {
    type: String,
    required: [true, 'Please enter the vehicle.'],
  },
  owner: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  service: {
    type: String,
    required: [true, 'Please enter the service.'],
  },
  createdAt: {
    type: String,
    required: [true, 'Please enter the creation date.'],
  },
  description: {
    type: String,
    required: [true, 'Please enter the description.'],
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    required: [true, 'Please enter the status.'],
  },
  assignedTo: {
    type: String,
    required: [true, 'Please enter the assigned person.'],
  },
  attachments: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
})

export const Report = mongoose.model<IReport>('Report', ReportSchema)
