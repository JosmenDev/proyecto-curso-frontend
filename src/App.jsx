import { BrowserRouter, Routes, Route } from "react-router-dom";
// routes: varias rutas; route: una ruta en especifico
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import NuevoPassword from "./pages/NuevoPassword";
// Provider: Es el que contiene los datos
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarPacientes from "./pages/AdministrarPacientes";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas Publicas */}
          <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="registrar" element={<Registrar/>}/>
            <Route path="olvide-password" element={<OlvidePassword/>}/>
            <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
            <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
          </Route>

          {/* Rutas Privadas */}
          <Route path="/admin" element={<RutaProtegida/>}>
            <Route index element={<AdministrarPacientes/>}/>
          </Route>  

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
