import { Link } from "react-router-dom"
import { useState } from 'react'
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassowrd ] = useState('');

    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg: 'Hay campos vacios', error: true});
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({msg: 'Los passwords no coinciden', error: true});
            return;
        }

        if (password.length < 6) {
            setAlerta({msg: 'El password es muy corto', error: true});
            return;
        }
        setAlerta({});

        // Crear el usuario en la api
        try {
            const url = `/veterinarios`
            await clienteAxios.post(url, {nombre, email, password});
            setAlerta( {
                msg: 'Creado correctamente, revisa tu email',
                error: false
            });
        } catch (error) {
            setAlerta( {
                msg: error.response.data.msg,
                error: true
            })
        }

    }
    const {msg} = alerta;
    return (
        <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus {""}<span className="text-black">Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                { msg && <Alerta
                    alerta = {alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor=""
                        >
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>

                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor=""
                        >
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="Email de Registro"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor=""
                        >
                            Passsword
                        </label>
                        <input 
                            type="password" 
                            placeholder="Tu Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor=""
                        >
                            Repetir Passsword
                        </label>
                        <input 
                            type="password" 
                            placeholder="Repite tu Password"
                            value={repetirPassword}
                            onChange={e => setRepetirPassowrd(e.target.value)}
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>
                    <input type="submit" 
                        value="Crear Cuenta"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="/">Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/olvide-password">Olvide mi password</Link>
                </nav>
            </div>
        
    </>
    )
}

export default Registrar