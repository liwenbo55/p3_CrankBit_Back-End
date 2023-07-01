import mongoose, { Document } from 'mongoose'
import { ICompany } from './Company'

export interface IUser extends Document {
  name: string
  role: string
  email: string
  password: string
  companies: ICompany[]
  createJwt(): string
  comparePassword(inputPassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
  },
  role: {
    type: String,
    required: [true, 'please select your role'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
  },
  companies: [
    {
      domain: {
        type: String,
        required: [true, 'please provide a company name'],
        unique: true,
        validate: {
          validator(value: string): boolean {
            const pattern = /^[A-Za-z0-9_-]+\.crankbit\.net$/
            return pattern.test(value)
          },
          message: 'Please provide a valid domain name',
        },
        minlength: 3,
        maxlength: 30,
      },
    },
  ],
})

export const User = mongoose.model<IUser>('User', UserSchema)
