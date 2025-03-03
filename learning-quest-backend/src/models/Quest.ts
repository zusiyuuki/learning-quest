import mongoose, { Document, Schema } from 'mongoose';

export interface IQuest extends Document {
  _id: mongoose.Types.ObjectId;
  guildId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: string;
  reward: string;
  participants: mongoose.Types.ObjectId[];
  status: 'available' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const questSchema = new Schema<IQuest>(
  {
    guildId: {
      type: Schema.Types.ObjectId,
      ref: 'Guild',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    timeLimit: {
      type: String,
      required: true,
    },
    reward: {
      type: String,
      required: true,
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    status: {
      type: String,
      enum: ['available', 'in_progress', 'completed'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuest>('Quest', questSchema); 