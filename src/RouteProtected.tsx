import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "./redux/store";
import { selectAuthUser } from "./redux/slices/auth";
import { AuthorizedRoles, ORGANIZER } from "./contracts/constants/roleConstant";

interface IRouteProtect {
    element: React.JSX.Element;
    authorizedRoles: AuthorizedRoles[]
}

export const RouteProtect = ({ element, authorizedRoles }: IRouteProtect) => {
    const user = useTypedSelector(selectAuthUser)
    const location = useLocation()
    console.log(user, ">>>>>>>>>>>>>>>>uuuuu", location)

    if (user && user?.role && authorizedRoles.includes(user?.role)) {
        // if (user?.role === ORGANIZER && !user?.isVerified && location.pathname != "/dashboard/organizer-verification") {
        //     return <Navigate to="/dashboard/organizer-verification" />
        // }
        // if(user?.role === ORGANIZER && user?.isVerified && location.pathname === "/dashboard/organizer-verification"){
        //     return <Navigate to="/dashboard" />

        // }

        return element

    } else {
        return <Navigate to="/" />
    }
}

export default RouteProtect;