import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AppIndex from './pages/index/AppIndex'; // Corrected path
import ConfigurationsIndex from './pages/configurations/ConfigurationsIndex';
import SeriesShow from './pages/series/SeriesShow';

const router = createHashRouter([
	{
		path: '/',
		element: <Navigate to="/app" replace />,
	},
	{
		path: '/app',
		element: <AppLayout />,
		children: [
		{
			index: true,
			element: <AppIndex />,
		},
		{
			path: 'series/:id/show',
			element: <SeriesShow />,
		},
		{
			path: 'configurations',
			element: <ConfigurationsIndex />,
		},
		// Add more dashboard routes here as needed
		],
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
