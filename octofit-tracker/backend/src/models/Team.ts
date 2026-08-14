import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = model('Team', teamSchema);

export default Team;
