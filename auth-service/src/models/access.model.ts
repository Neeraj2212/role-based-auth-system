import mongoose, { Schema, Document } from 'mongoose';

interface Access extends Document {
  role: string;
  permissions: string[];
}

const AccessSchema: Schema = new Schema({
  role: { type: String, required: true },
  permissions: { type: [String], required: true },
});

const accessModel = mongoose.model<Access & Document>('Access', AccessSchema);

export default accessModel;
