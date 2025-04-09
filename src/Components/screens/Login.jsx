import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import logoCompleto from './../img/LogoCompleto.png';

export default function Form() {
    const navigate = useNavigate();

    function onSubmit(data) {
        if (data.email === "admin@gmail.com" && data.password === "1234") {
            return navigate(`/Home`);
        }
        return alert("Contraseña incorrecta");
    }

    const schema = yup.object().shape({
        email: yup.string().required("Ingresa un email").email("Ingresa un email válido"),
        password: yup.string().required("Ingresa una contraseña").min(4, "Mínimo 4 caracteres"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    return (
        <div className=" vh-100 d-flex align-items-center justify-content-center" style={{backgroundColor:'#9B1C31'}}>
            <div className="row text-light rounded shadow-lg overflow-hidden" style={{backgroundColor:'#FFF'}} >
                {/* Imagen */}
                <div className="col-md-6 p-4 d-flex align-items-center justify-content-center " style={{backgroundColor:'#FFF'}}>
                    <img src={logoCompleto} alt="SIGERP RESTAURANTE" className="img-fluid" style={{ maxWidth: '80%' }} />
                </div>
                
                {/* Formulario */}
                <div className="col-md-6 p-4">
                    <h3 className="text-center mb-4" style={{color:'#000'}}>SIGERP RESTAURANTE</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"  style={{color:'#000'}}>Correo:</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Correo"
                                {...register("email")}
                                className="form-control"
                            />
                            {errors.email && <div className="text-warning small">{errors.email.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label " style={{color:'#000'}}>Contraseña:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                {...register("password")}
                                className="form-control"
                            />
                            {errors.password && <div className="text-warning small">{errors.password.message}</div>}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-light w-100 fw-bold bg-danger text-light"
                        >
                            Continuar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
