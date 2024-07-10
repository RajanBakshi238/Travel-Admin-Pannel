import './App.css'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import {  GoogleOAuthProvider } from "@react-oauth/google";
import Home from './pages/Home';
import Welcome from './pages/Welcome';


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
      <GoogleOAuthProvider clientId='268770122624-igrqs8psmqocfu7pksaa4m2ab73bjt2t.apps.googleusercontent.com'>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
