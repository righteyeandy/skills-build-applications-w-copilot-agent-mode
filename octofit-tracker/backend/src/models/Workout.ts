import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'mobility', 'recovery'],
      required: true
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    suggestedFor: [{ type: String, trim: true }],
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = model('Workout', workoutSchema);

export default Workout;
