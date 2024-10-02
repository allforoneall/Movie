import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  movieId: mongoose.Schema.Types.ObjectId;
  reviewerName?: string;
  rating: number;
  reviewComments: string;
}

const ReviewSchema: Schema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  reviewerName: { type: String, default: 'Anonymous' },
  rating: { type: Number, required: true, min: 1, max: 10 },
  reviewComments: { type: String, required: true },
});

export default mongoose.model<IReview>('Review', ReviewSchema);
