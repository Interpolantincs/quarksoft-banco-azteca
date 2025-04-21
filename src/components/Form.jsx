import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './Form.css'
import usuariosData from '../data/users.json';

const Form = () => {
    const history = useHistory();
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('authToken'));

        if (!token || Date.now() > token.expires) {
            localStorage.removeItem('authToken');
            history.push('/');
        }
    }, [history]);

    const handleFetchUser = async () => {
        setError("");
        try {
            const users = usuariosData.usuarios;

            const user = users.find((user) => user.id === parseInt(userId));

            if (user) {
                setUserInfo(user);
            } else {
                setUserInfo(null)
                setError('Usuario no encontrado')
            }
        } catch (err) {
            console.error('Error al obtener los datos: ', err)
            setError('Error al obtener los datos.')
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');

        history.push('/');
    };

    return (
        <div className="form-container">
            <h2>Usuarios</h2>
            <div className="form">
                <label className="form-label">ID Usuario:</label>
                <input
                    type="number"
                    className="form-input"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button className="form-button" onClick={handleFetchUser}>Buscar</button>

            </div>
            {error && <p style={{ color: '#278252' }}>{error}</p>}
            {userInfo && (
                <div className="form">
                    <div>
                        <label className="form-label">Nombre:</label>
                        <input type="text" className="form-input" value={userInfo.nombres} disabled />
                    </div>
                    <div>
                        <label className="form-label">Apellido Materno:</label>
                        <input type="text" className="form-input" value={userInfo.apellidoMaterno} disabled />
                    </div>
                    <div>
                        <label className="form-label">Apellido Paterno:</label>
                        <input type="text" className="form-input" value={userInfo.apellidoPaterno} disabled />
                    </div>
                </div>

            )}
            <div className="logout-container">
                <button className="form-button logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>

        </div>
    );
}

export default Form;