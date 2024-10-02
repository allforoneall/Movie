import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  name: string;
  releaseDate: Date;
  averageRating?: number | null;
}

const MovieSchema: Schema = new Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  averageRating: { type: Number, default: null },
});

export default mongoose.model<IMovie>('Movie', MovieSchema);
