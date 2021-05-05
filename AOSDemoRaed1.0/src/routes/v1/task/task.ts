import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import TaskRepo from '../../../database/repository/taskRepo';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../../core/ApiError';
import { Types } from 'mongoose';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import _ from 'lodash';
import authentication from '../../../auth/authentication';
import Task from '../../../database/model/Task';
import User from '../../../database/model/User';
import { ObjectId } from 'bson';
import UserRepo from '../../../database/repository/UserRepo';

const router = express.Router();


/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/
//api get my tasks
router.get(
  '/my',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const tasks = await TaskRepo.findMyTasks({
      _id: new Types.ObjectId(req.user._id),
    } as User);
      return new SuccessResponse('success', _.map(tasks, _.partialRight(_.pick, ['_id', 'createdBy', 'sharedTo', 'title', 'description', 'completed', 'comments']))).send(
      res,
    );
  }),
);

//api update my task by taskId
router.put(
  '/id/:id',
  validator(schema.putTask),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.findByIdAndCreator(new Types.ObjectId(req.params.id), {
      _id: new Types.ObjectId(req.user._id),
    } as User);
    if (!task) throw new BadRequestError('unauthorized or inexistant task');

    if (req.body.description) task.description = req.body.description;
    if (req.body.completed != undefined) task.completed = req.body.completed;

    await TaskRepo.updateTask(task);
    return new SuccessResponse(
      'Task updated',
      _.pick(task, ['_id', 'title', 'description', 'completed', 'sharedTo', 'comments', 'createdBy']),
    ).send(res);
  }),
);

//api share my task by task id
router.put(
  '/id/:id/share',
  validator(schema.shareTask),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.findByIdAndCreator(new Types.ObjectId(req.params.id), {
      _id: new Types.ObjectId(req.user._id),
    } as User);
    if (!task) throw new BadRequestError('unauthorized or inexistant task');

    const sharedTo = req.body.shareTo.map((x: ObjectId) => new Types.ObjectId(x));

    const users = await UserRepo.findUsersByIds(sharedTo);

    if (sharedTo.length != users.length) throw new BadRequestError('List of user is incorrect');

    await TaskRepo.shareTask(task, sharedTo);
    
    const taskUpd = await TaskRepo.findByIdAndCreator(new Types.ObjectId(req.params.id), {
      _id: new Types.ObjectId(req.user._id),
    } as User);
    
    return new SuccessResponse(
      'Task shared',
      _.pick(taskUpd, ['_id', 'title', 'description', 'completed', 'sharedTo', 'comments', 'createdBy']),
    ).send(res);
  }),
);


//api get tasks shared to me
router.get(
  '/shared/me',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const tasks = await TaskRepo.findTasksSharedToMe({
      _id: new Types.ObjectId(req.user._id),
    } as User);
      return new SuccessResponse('success', _.map(tasks, _.partialRight(_.pick, ['_id', 'createdBy', 'sharedTo', 'title', 'description', 'completed', 'comments']))).send(
      res,
    );
  }),
);

//api comment task by idTask
router.put(
  '/id/:id/comment',
  validator(schema.commentTask),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.findById(new Types.ObjectId(req.params.id));
    if (!task) throw new BadRequestError('inexistant task');

    const taskCommented = await TaskRepo.commentTask(task, req.body.comment, req.user._id as User);
    
    return new SuccessResponse(
      'Task commented',
      _.pick(taskCommented, ['_id', 'title', 'description', 'completed', 'sharedTo', 'comments', 'createdBy']),
    ).send(res);
  }),
);

//api delete my task
router.delete(
  '/id/:id',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.deleteTask(new Types.ObjectId(req.params.id),
    {
      _id: new Types.ObjectId(req.user._id),
    } as User);
    if (!task) throw new BadRequestError('unauthorized or inexistant task');
    return new SuccessResponse(
      'Task deleted', task
    ).send(res);
  }),
);

//api create a task
router.post(
  '/',
  validator(schema.taskCreate),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.findByTitle(req.body.title);
    if (task) throw new BadRequestError('Task already registered with this title');

    const createdTask = await TaskRepo.create({
        createdBy: req.user,
        title: req.body.title,
        description: req.body.description,
        completed: false
      } as unknown as Task);

    new SuccessResponse('Task created successfully', createdTask).send(res);
  }),
);

export default router;
