import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

const router = createHashRouter([
	{
		path: '/',
		element: <Navigate to="/login" replace />,
	},
	{
		path: '/app',
		element: <AppLayout />,
		children: [
		{
			index: true,
			element: <DashboardIndex />,
		},
		{
			path: 'vehicles',
			element: <VehiclesIndex />,
		},
		{
			path: 'vehicle/new',
			element: <VehiclesCreate />,
		},
		{
			path: 'vehicle/:id/edit',
			element: <VehiclesEdit />,
		},
		// Add more dashboard routes here as needed
		],
	},
	{
		path: '*',
		element: <Navigate to="/login" replace />,
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
