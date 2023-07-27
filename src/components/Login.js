import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null); // Estado para el mensaje de error
    const navigate = useNavigate();

    const login = async () => {
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Inicio de sesión exitoso");
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrorMessage("Contraseña incorrecta"); // Establecer el mensaje de error
        }
    };

    return (
        <div className="container">
            <div className="form">
                <h2>Login</h2>
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Mostrar el mensaje de error en rojo */}
                <button className="button" onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
