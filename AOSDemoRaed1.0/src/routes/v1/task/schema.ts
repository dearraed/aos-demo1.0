import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

//define validation controls of call apis
export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  putTask: Joi.object().keys({
    description: Joi.string().optional().min(15).max(2000),
    completed: Joi.boolean().optional(),
  }),
  shareTask: Joi.object().keys({
    shareTo: Joi.array().required().items(Joi.string()),
  }),
  commentTask: Joi.object().keys({
    comment: Joi.string().required().min(5).max(2000),
  }),
  taskCreate: Joi.object().keys({
    title: Joi.string().required().min(3).max(30),
    description: Joi.string().required().min(3).max(2000),
    sharedTo: Joi.array().optional().items(JoiObjectId()),
    completed: Joi.boolean().optional(),
    comments: Joi.array().optional().items(Joi.string()),
  }),
};
