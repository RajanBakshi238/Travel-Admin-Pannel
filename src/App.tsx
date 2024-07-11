import './App.css'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import store from './redux/store';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />

  }, {
    path: "/welcome",
    element: <Welcome />
  }
])

function App() {

  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId='268770122624-igrqs8psmqocfu7pksaa4m2ab73bjt2t.apps.googleusercontent.com'>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </Provider>
    </>
  )
}

export default App
