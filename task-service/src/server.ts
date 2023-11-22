import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { TaskRoutes } from './routes/task.routes';

validateEnv();

const app = new App([new TaskRoutes()]);

app.listen();
