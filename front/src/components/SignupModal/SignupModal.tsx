import { useState } from "react";
import "./SignupModal.css";
import swal from "sweetalert";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminModal: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onOpenAdminModal,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateName = (name: string) => {
    const nameParts = name.trim().split(" ");
    return (
      nameParts.length >= 2 &&
      nameParts.every((part) => /^[A-Z][a-z]*$/.test(part))
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Email no válido");
      return;
    }

    if (!validateName(name)) {
      setErrorMessage(
        "El nombre debe contener al menos dos palabras y estar en formato correcto"
      );
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://gravitad-challenge.onrender.com/api/auth/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        onClose();
        swal("Usuario cargado correctamente", { icon: "success" });
        setEmail("");
        setName("");
      } else {
        if (data.error === "El usuario ya existe") {
          setErrorMessage("El usuario ya existe.");
        } else {
          setErrorMessage("Error en el registro, intenta nuevamente.");
        }
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setErrorMessage("Error al registrar, intenta nuevamente.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="container">
          <div className="heading">Aportá tus datos</div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                required
                autoComplete="off"
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input
                required
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Nombre Completo</label>
            </div>

            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="btn-container">
              <button type="submit" className="btn">
                Registrar data
              </button>
              <div className="acc-text">
                ¿Eres admin?
                <span
                  style={{ color: "#0000ff", cursor: "pointer" }}
                  onClick={onOpenAdminModal}
                >
                  Ingresa
                </span>
              </div>
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

export default SignupModal;
