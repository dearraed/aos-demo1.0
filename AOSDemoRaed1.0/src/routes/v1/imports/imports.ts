import express from 'express';
import Role, { RoleModel } from '../../../database/model/Role';
import ApiKey, { ApiKeyModel } from '../../../database/model/ApiKey';
import { SuccessResponse } from '../../../core/ApiResponse';
import { NextFunction, Request, Response } from 'express';


const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
   
         await RoleModel.deleteMany();
         await ApiKeyModel.deleteMany();
         const createdApiKey = await ApiKeyModel.create({
             "metadata": "To be used in the demo created by Raed",
            "key": "MRUSDerB5a7WvyAEt4n8IrtToSHzK7Uj",
            "version": 1,
            "status": true,
            "createdAt": new Date(),
            "updatedAt": new Date()
        })
         const createdRoles = await RoleModel.create([{
            "code": "TESTER",
            "status": true,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "code": "WRITER",
            "status": true,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "code": "EDITOR",
            "status": true,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
    ] as unknown as Role[]);
  
        console.log(`created role : ${createdRoles}`);
        
      new SuccessResponse('Roles and apiKey created successfully',
       {createdRoles: createdRoles, apiKey:createdApiKey}).send(res);
});

  export default router;