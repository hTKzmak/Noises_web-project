import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    return !!localStorage.getItem('userData') ? (
        <Outlet/>
    ) : (
        <Navigate to='/login'/>
    );
}

export default PrivateRoute