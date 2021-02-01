const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
	},
];

export default routes;
