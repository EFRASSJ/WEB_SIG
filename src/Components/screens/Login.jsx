import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import logoCompleto from './../img/LogoCompleto.png';

export default function Form() {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().required("Ingresa un email").email("Ingresa un email válido"),
        password: yup.string().required("Ingresa una contraseña").min(4, "Mínimo 4 caracteres"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Función para manejar el submit
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/empleado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),  // Usa los datos del formulario
            });

            if (!response.ok) {
                throw new Error('Error en la conexión');
            }

            const result = await response.json();
            console.log(result);

            // Redirige al usuario a otra página después de un login exitoso
            navigate("/home");

        } catch (error) {
            console.error('Error en la conexión:', error);
        }
    };


    return (
        <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#9B1C31' }}>
            <div className="row w-75 bg-white shadow-lg rounded-4 overflow-hidden">
                <div className="col-md-6 p-5 d-flex align-items-center justify-content-center bg-white">
                    <img src={logoCompleto} alt="SIGERP RESTAURANTE" className="img-fluid" style={{ maxWidth: '85%' }} />
                </div>
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <h3 className="text-center mb-4 fw-bold text-dark">SIGERP RESTAURANTE</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold text-dark">Correo:</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="ejemplo@correo.com"
                                {...register("email")}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-semibold text-dark">Contraseña:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="********"
                                {...register("password")}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </div>
                        <button type="submit" className="btn btn-danger w-100 fw-bold py-2">Continuar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
