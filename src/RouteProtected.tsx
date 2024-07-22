import { Navigate } from "react-router-dom";
import { useTypedSelector } from "./redux/store";
import { selectAuthUser } from "./redux/slices/auth";
import { AuthorizedRoles } from "./contracts/constants/roleConstant";

interface IRouteProtect {
    element: React.JSX.Element;
    authorizedRoles: AuthorizedRoles[]
}

export const RouteProtect = ({ element,authorizedRoles }: IRouteProtect) => {
    const user = useTypedSelector(selectAuthUser)
    console.log(user, ">>>>>>>>>>>>>>>>")

    if (user && user?.role && authorizedRoles.includes(user?.role)) {
        return element

    } else {
        return <Navigate to="/" />
    }
}

export default RouteProtect;