// import "./style.scss";

import './App.css'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './pages/Home';
import store from './redux/store';
import RouteProtect from './RouteProtected';
import { UserContextProvider } from './context/User';
import Layout from './components/Dashboard/Layout/Layout';
import CreateTrip from './pages/Dashboard/CreateTrip';
import GetTrip from './pages/Dashboard/GetTrip';
import AllTrip from './pages/Dashboard/AllTrip';
import OrganizerPersonalForm from './pages/Dashboard/OrganizerPersonalForm';
import AdminLogin from './pages/AdminLogin';
import AdminOrganizerList from './pages/Dashboard/AdminOrganizerList';
import { ADMIN, ORGANIZER, USER } from './contracts/constants/roleConstant';
import GetBooking from './pages/Dashboard/GetBooking';
// import SingleTripView from './pages/Dashboard/SingleTripView';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />

  },
  {
    path: "/admin-login",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: <RouteProtect
      authorizedRoles={[ORGANIZER]}
      element={<Layout />}
    />,
    children: [
      {
        path: '*',
        index: true,
        element: <CreateTrip />
      },
      {
        path: "my-trip",
        element: <GetTrip />
      },

      {
        path: "organizer-verification",
        element: <OrganizerPersonalForm />
      },

    ]
  },
  {
    path: "/dashboard",
    element: <RouteProtect
      authorizedRoles={[USER]}
      element={<Layout />}
    />,
    children: [
      {
        path: "trip",
        element: <AllTrip />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <RouteProtect
      authorizedRoles={[ADMIN]}
      element={<Layout />}
    />,
    children: [
      {
        path: "admin-organizer",
        element: <AdminOrganizerList />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <RouteProtect
      authorizedRoles={[ADMIN, ORGANIZER, USER]}
      element={<Layout />}
    />,
    children: [
      {
        path: "bookings",
        element: <GetBooking />
      }
    ]
  }
])

function App() {

  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId='268770122624-igrqs8psmqocfu7pksaa4m2ab73bjt2t.apps.googleusercontent.com'>
          <UserContextProvider>

            <RouterProvider router={router} />
          </UserContextProvider>
        </GoogleOAuthProvider>
      </Provider>
    </>
  )
}

export default App
