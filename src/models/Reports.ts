import mongoose, { Document } from 'mongoose'

export interface IReports extends Document {
  name: string
}

const ReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your report'],
  },
})

export const Report = mongoose.model<IReports>('Report', ReportSchema)
