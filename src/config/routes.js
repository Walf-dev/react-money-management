import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signUp/SignUp';
import Dashboard from '../pages/dashboard/Dashboard';
import NotFound from '../pages/notFound/NotFound';
import ForgotPassword from '../pages/forgotPassword/ForgotPassword';
import SignInWithEmailLink from '../pages/signInWithEmailLink/SignInWithEmailLink';
import SendSignInEmailLink from '../pages/sendSignInEmailLink/SendSignInEmailLink';

//we create an array of objects that define what path is mapped to what component
const routes = [
	{
		path: '/sign-in',
		component: SignIn,
		isPrivate: false,
	},
	{
		path:'/sign-up',
		component: SignUp,
		isPrivate: false,
	},
	{
		path: '/dashboard',
		component: Dashboard,
		isPrivate: true,
	},
	{
		path: '/*',
		component: NotFound,
		isPrivate: true,
	},
	{
		path: '/forgot-password',
		component: ForgotPassword,
		isPrivate: false,
	},
	{
		path: '/sign-in-with-email-link',
		component: SignInWithEmailLink,
		isPrivate: false,
	},
	{
		path: '/send-sign-in-email-link',
		component: SendSignInEmailLink,
		isPrivate: false,
	},

];

export default routes;
