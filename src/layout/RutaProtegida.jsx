import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();

    if (cargando) return 'cargando ...';
    return (
        <>
            <Header/>
                {auth?._id ? <Outlet/> : <Navigate to="/" />}
            <Footer/>

        </>
        
    )
}

export default RutaProtegida