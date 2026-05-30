import mongoose, { Schema, Document } from 'mongoose';

// 1. Defining the TypeScript Interface for the Contact Document
export interface IContact extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Creating the Mongoose Schema with validation and automatic timestamps
const ContactSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    subject: { 
      type: String, 
      default: 'Contact Form Submission' 
    },
    message: { 
      type: String, 
      required: [true, 'Message is required'] 
    }
  },
  { 
    // CRITICAL: This automatically manages and creates 'createdAt' and 'updatedAt' fields
    timestamps: true 
  }
);

// 3. Exporting the Model safely as a default export
const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
export default Contact;