// use context permite extraer los datos del context
import { useContext } from 'react'
// Identificar de que context se quiere extraer los datos
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
    // hago disponible los valores disponibles del context del provider
    return useContext(AuthContext);
};

export default useAuth;

