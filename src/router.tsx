import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AppIndex from './pages/index/AppIndex'; // Corrected path
import VehiclesIndex from './pages/vehicles/VehiclesIndex';
import VehiclesCreate from './pages/vehicles/VehiclesCreate';
import VehiclesEdit from './pages/vehicles/VehiclesEdit';
import ConfigurationsIndex from './pages/configurations/ConfigurationsIndex';

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
		{
			path: 'configurations',
			element: <ConfigurationsIndex />,
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
