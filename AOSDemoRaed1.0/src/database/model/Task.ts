import { model, Schema, Document } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'Task';
export const COLLECTION_NAME = 'tasks';

export default interface Task extends Document {
  createdBy: User;
  sharedTo?: any[];
  title: string;
  description: string;
  completed?: boolean;
  comments?: object[];
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
   
   
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    
    sharedTo: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
            
    },
    title: {
      type: Schema.Types.String,
      default: "",
      unique:true,
      index: true
    },
    description: {
      type: Schema.Types.String,
      default: "",
    },
    completed: {
      type: Schema.Types.Boolean,
      default: false,
    },
    comments: [{
      comment: {type: Schema.Types.String},
      by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    }],
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);
export const TaskModel = model<Task>(DOCUMENT_NAME, schema, COLLECTION_NAME);
