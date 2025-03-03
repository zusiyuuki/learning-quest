import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  level: number;
  experience: number;
  joinedGuilds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
    experience: {
      type: Number,
      default: 0,
    },
    joinedGuilds: [{
      type: Schema.Types.ObjectId,
      ref: 'Guild',
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema); 