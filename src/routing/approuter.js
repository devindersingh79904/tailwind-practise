import {createBrowserRouter} from 'react-router-dom';
import Error from '../component/Error';
import App from '../App';
import About from '../component/About';
import Body from '../component/Body';
import ContactUs from '../component/ContactUs';
import ReastaurantMenu from '../component/RestaurantMenu';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <ContactUs />
            },
            {
                path: '/restaurant/:id',
                element: <ReastaurantMenu />
            }
        ]
    },
]);

export default appRouter;