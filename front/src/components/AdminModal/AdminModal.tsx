import { useState } from "react";
import "./AdminModal.css";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulLogin: (token: string) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSuccessfulLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Email no válido");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch("https://gravitad-challenge.onrender.com/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.ok) {
        setEmail('');
        setPassword('');
        onSuccessfulLogin(data.token); 
      } else {
        if (data.error === "Credenciales invalidas.") {
          setErrorMessage("Credenciales invalidas.");
        } else if (data.error === "Acceso solo para administradores.") {
          setErrorMessage("Acceso solo para administradores.");
        } else {
          setErrorMessage("Error en el inicio de sesión, intenta nuevamente.");
        }
      }
    } catch (error) {
      setErrorMessage("Error al iniciar sesión, intenta nuevamente.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="container">
          <div className="heading">Acceso de Administrador</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                required
                autoComplete="off"
                type="text"
                name="email"
                id="adminEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="adminEmail">Email</label>
            </div>

            <div className="input-field">
              <input
                required
                autoComplete="off"
                type="password"
                name="adminPassword"
                id="adminPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="adminPassword">Contraseña</label>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="btn-container">
              <button type="submit" className="btn">Ingresar</button>
            </div>
          </form>
        </div>
        <button className="close-button" onClick={onClose}>
          CERRAR
        </button>
      </div>
    </div>
  );
};

export default AdminModal;
