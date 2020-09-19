import { Document, Schema } from 'mongoose';

import { DndAttributes } from '~/constants';
import { connectToDatabase } from '~/utils';

const { ObjectId } = Schema.Types;

interface ISkill extends Document {
  id: string;
  name: string;
  description: string;
  relevantAttribute: DndAttributes;
}

const SkillSchema = new Schema({
  id: ObjectId,
  name: {
    type: String,
    required: true,
  },
  relevantAttribute: {
    type: String,
    enum: Object.values(DndAttributes),
    default: DndAttributes.STR,
    required: true,
  },
});

const createModel = async () => {
  const conn = await connectToDatabase(process.env.MONGODB_URI);
  const model = conn.model<ISkill>('Skill', SkillSchema);

  return model;
};

export default createModel;
