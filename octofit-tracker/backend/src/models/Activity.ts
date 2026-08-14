import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    type: {
      type: String,
      enum: ['run', 'bike', 'strength', 'yoga', 'swim', 'walk'],
      required: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true }
  },
  {
    timestamps: true
  }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = model('Activity', activitySchema);

export default Activity;
