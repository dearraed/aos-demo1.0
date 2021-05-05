import Logger from './core/Logger';
import { port } from './config';
import app from './app';


//server listen on port in config
app
  .listen(port, () => {
    Logger.info(`server running on port : ${port}`);
  })
 .on('error', (e) => Logger.error(e));
