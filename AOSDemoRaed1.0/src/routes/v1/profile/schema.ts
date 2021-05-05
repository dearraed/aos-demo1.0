import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

//define validation controls of call apis
export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  profile: Joi.object().keys({
    name: Joi.string().optional().min(1).max(200),
    profilePicUrl: Joi.string().optional().uri(),
  }),
};
