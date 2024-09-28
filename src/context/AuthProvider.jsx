import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios';

// context: permite acceder al state de distintos lugardes de la app
const AuthContext = createContext();

// Provider es un componente grande que va a tener como hijos a los demas componentes
const AuthProvider = ({children}) => {
    // Es lo mismo a colocar props y despues => const {children} = props
    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    // Revisar si el usuario está autenticado
    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            // console.log('Verificando token');
            if(!token) {
                setCargando(false);
                return;
            };

            // console.log('Si hay token');;
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);

                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        };
        autenticarUsuario();
    }, [] );

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    return (
        // AuthProvider retorna el context y va a tener el Provider
        <AuthContext.Provider
            value = {{
                auth, 
                setAuth,
                cargando,
                cerrarSesion
            }}
        >
            {/* children quiere decir todos los componentes que estan dentro del AuthProvider en el app.jsx */}
            {children}
        </AuthContext.Provider> 
    )
};

export {
    AuthProvider
};

export default AuthContext;