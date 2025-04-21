import { useState } from "react";
import { useHistory } from "react-router-dom";
import './Login.css'

const Login = ({onLoginSuccess}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const handleSubmit = (e)=> {
        e.preventDefault();

        const validUsername = 'azteca';
        const validPassword = '12345';


        if(!username || !password) {
            setErrorMessage('Por favor, complete ambos campos');
            return;
        }

        if(username === validUsername && password === validPassword) {
            const token = {
                username: validUsername,
                expires: Date.now() + 60 * 2000 
            };

            localStorage.setItem('authToken', JSON.stringify(token));

            onLoginSuccess();

            history.push('./form')
        } else {
            setAttempts(attempts + 1);
            setErrorMessage('Usuario o contraseña incorrectos');
            
            if(attempts >= 2) {
                console.log('Contraseña incorrecta');
                setIsDisable(true);
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2 className="tittle">Login</h2>
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrorMessage('');
                        }}
                        disabled={isDisable}
                        placeholder="Usuario"
                    />
                    <label className="form-label"> Usuario</label>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorMessage('');
                        }}
                        disabled={isDisable}
                        placeholder="Contraseña"
                    />
                    <label className="form-label"> Constraseña </label>
                </div>
                <div className="form-group">
                        <button 
                            type="submit"
                            disabled={isDisable}
                        > Ingresar </button>
                </div>
                {errorMessage && <p style={{ color: '#278252'}}>{errorMessage}</p>}
                {isDisable && <p className="error-message">Has alcanzado el número máximo de intentos</p>}
            </form>
        </div>
    );
};

export default Login;