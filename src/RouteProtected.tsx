import { Navigate } from "react-router-dom";
import { useTypedSelector } from "./redux/store";
import { selectAuthUser } from "./redux/slices/auth";

interface IRouteProtect {
    element: React.JSX.Element;
}

export const RouteProtect = ({ element }: IRouteProtect) => {
    const user = useTypedSelector(selectAuthUser)
    console.log(user, ">>>>>>>>>>>>>>>>")

    if (user) {
        return element

    } else {
        return <Navigate to="/" />
    }
}

export default RouteProtect;