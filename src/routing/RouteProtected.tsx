import { Navigate } from "react-router-dom";

interface IRouteProtect {
    element: React.JSX.Element;
}

export const RouteProtect = ({ element }: IRouteProtect) => {
    const user = {}


    if (user) {
        return element

    } else {
        <Navigate to="/" />
    }
}

export default RouteProtect;