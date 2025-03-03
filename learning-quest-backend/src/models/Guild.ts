import mongoose, { Document, Schema } from 'mongoose';

export interface IQuest {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: string;
  reward: string;
}

export interface IGuild extends Document {
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  requirements: string[];
  quests: IQuest[];
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const questSchema = new Schema<IQuest>({
  id: {
    type: String,
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
});

const guildSchema = new Schema<IGuild>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    memberCount: {
      type: Number,
      default: 0,
    },
    requirements: [{
      type: String,
    }],
    quests: [questSchema],
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGuild>('Guild', guildSchema); 