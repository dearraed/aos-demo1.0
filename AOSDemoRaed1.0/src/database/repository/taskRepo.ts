import Task, { TaskModel } from '../model/Task';
import User from '../model/User';
import { InternalError } from '../../core/ApiError';
import { Types } from 'mongoose';
import KeystoreRepo from './KeystoreRepo';
import Keystore from '../model/Keystore';

export default class TaskRepo {
  // contains critical information of the user
public static findByIdAndCreator(idTask: Types.ObjectId, createdBy: User): Promise<Task | null> {
    return TaskModel.findOne({ _id: idTask, createdBy: createdBy})
    .select('+title +description +completed +sharedTo +comments +createdBy')
      .populate({
        path: 'createdBy',
        match: { status: true },
        select: { name: 1, email: 1 }
      }) 
      .populate({
        path: 'sharedTo',
        match: { status: true },
        select: { name: 1, email: 1 }
      }) 
      .populate({
        path: 'comments.by',
        match: { status: true },
        select: { name: 1, email: 1 }
      })
    .lean<Task>()
      .exec();
  }

  public static findById(idTask: Types.ObjectId): Promise<Task | null> {
    return TaskModel.findOne({ _id: idTask})
    .select('+title +description +completed +sharedTo +comments +createdBy')
      .lean<Task>()
      .exec();
  }

  public static findMyTasks(user: User): Promise<Task[]> {
    return TaskModel.find({createdBy: user})
    .populate({
      path: 'createdBy',
      match: { status: true },
      select: { name: 1, email: 1 }
    }) 
    .populate({
      path: 'sharedTo',
      match: { status: true },
      select: { name: 1, email: 1 }
    }) 
    .populate({
      path: 'comments.by',
      match: { status: true },
      select: { name: 1, email: 1 }
    })
      .lean<Task[]>()
      .exec();
  }


  public static findTasksSharedToMe(user: User): Promise<Task[]> {
    return TaskModel.find({sharedTo: user})
    .populate({
      path: 'createdBy',
      match: { status: true },
      select: { name: 1, email: 1 }
    }) 
    .populate({
      path: 'sharedTo',
      match: { status: true },
      select: { name: 1, email: 1 }
    }) 
    .populate({
      path: 'comments.by',
      match: { status: true },
      select: { name: 1, email: 1 }
    })
      .lean<Task[]>()
      .exec();
  }


  public static findByTitle(title: string): Promise<Task | null> {
    return TaskModel.findOne({ title: title })
      .lean<Task>()
      .exec();
  }


  public static async create(task: Task): Promise<Task> {
    const now = new Date();
    task.createdAt = now;
    task.updatedAt = now;
    const createdTask = await TaskModel.create(task);
    return createdTask;
  }

  public static deleteTask(taskId: Types.ObjectId, user: User): Promise<any>{
   return TaskModel.findOneAndDelete({ _id: taskId, createdBy: user._id })
        .populate({
          path: 'createdBy',
          match: { status: true },
          select: { name: 1, email: 1 }
        }) 
        .populate({
          path: 'sharedTo',
          match: { status: true },
          select: { name: 1, email: 1 }
        }) 
        .populate({
          path: 'comments.by',
          match: { status: true },
          select: { name: 1, email: 1 }
        })
    .lean()
      .exec();
  }

  public static updateTask(task: Task): Promise<any> {
    task.updatedAt = new Date();
    return TaskModel.updateOne({ _id: task._id }, { $set: { ...task } })
      .lean()
      .exec();
  }

  public static shareTask(task: Task, sharedTo: Types.ObjectId[]): Promise<any> {
    return TaskModel.updateOne({ _id: task._id}, { $addToSet: { "sharedTo": sharedTo }})
      .lean()
      .exec();
  }

  
  public static async commentTask(task: Task, comment : string, by: User): Promise<any> {
    await TaskModel.updateOne({ _id: task._id}, { $push: { "comments": {by: by._id, comment: comment} }})
      .lean()
      .exec();

      return await TaskModel.findOne({_id: task._id})
      .populate({
        path: 'createdBy',
        match: { status: true },
        select: { name: 1, email: 1 }
      }) 
      .populate({
        path: 'sharedTo',
        match: { status: true },
        select: { name: 1, email: 1 }
      }) 
      .populate({
        path: 'comments.by',
        match: { status: true },
        select: { name: 1, email: 1 }
      })
        .lean<Task[]>()
        .exec();
  }


}
