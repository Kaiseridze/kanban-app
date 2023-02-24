import Home from '../Pages/Home';
import Project from '../Pages/Project';

const router = [
	{
		id: 1,
		href: '/',
		title: 'Home',
		Page: Home,
	},
	{
		id: 2,
		href: '/project/:id',
		title: 'Project',
		Page: Project,
	},
];

export default router;
