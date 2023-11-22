import App from '@/app';
import UsersRoute from '@routes/user.routes';
import AuthRoutes from './routes/auth.routes';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new UsersRoute(), new AuthRoutes()]);

app.listen();
