import { useState, useEffect } from "react";
import "./Home.css";
import SignupModal from "../../components/SignupModal/SignupModal";
import AdminModal from "../../components/AdminModal/AdminModal";
import { Pencil, Trash2 } from "lucide-react";
import swal from "sweetalert";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const usersPerPage = 6;

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");

  const fetchUsers = async (page: number, limit: number) => {
    try {
      const response = await fetch(
        `https://gravitad-challenge.onrender.com/api/user?page=${page}&limit=${limit}`
      );
      const data = await response.json();

      if (data.ok) {
        setUsers(data.data.users);
        setTotalUsers(data.data.total);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, usersPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleOpenAdminModal = () => {
    setIsSignupModalOpen(false);
    setIsAdminModalOpen(true);
  };

  const handleSuccessfulAdminLogin = (token: string) => {
    setToken(token);
    setIsSignupModalOpen(false);
    setIsAdminModalOpen(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditedName(user.name);
    setEditedEmail(user.email);
  };

  const handleSaveEdit = async (userId: string) => {
    try {
      const response = await fetch(
        `https://gravitad-challenge.onrender.com/api/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: editedName, email: editedEmail }),
        }
      );
      const data = await response.json();

      if (data.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, name: editedName, email: editedEmail }
              : user
          )
        );
        setEditingUser(null);
        setEditedName("");
        setEditedEmail("");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await fetch(
            `https://gravitad-challenge.onrender.com/api/user/${userId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();

          if (data.ok) {
            const newUsers = users.filter((user) => user._id !== userId);
            setUsers(newUsers);

            const isLastUserOnPage = newUsers.length === 0 && currentPage > 1;
            const newPage = isLastUserOnPage ? currentPage - 1 : currentPage;

            fetchUsers(newPage, usersPerPage);
            setCurrentPage(newPage);

            swal("¡El usuario ha sido eliminado!", {
              icon: "success",
            });
          } else {
            console.error("Error al eliminar el usuario:", data.message);
            swal("Error", "No se pudo eliminar el usuario.", "error");
          }
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          swal(
            "Error",
            "Ocurrió un error al intentar eliminar el usuario.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="user-api-home">
      {token ? (
        <button className="admin-panel-button" onClick={() => setToken(null)}>
          CERRAR SESIÓN
        </button>
      ) : null}

      <h1>API DE USUARIOS</h1>

      <div className="user-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <img
              src="https://g-oa94pcexkfq.vusercontent.net/placeholder-user.jpg"
              alt={user.name}
              className="user-avatar"
            />
            {editingUser?._id === user._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="edit-input"
                />
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="edit-input"
                />
                <div className="edit-actions">
                  <button
                    onClick={() => handleSaveEdit(user._id)}
                    className="confirm-edit-button"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setEditedName("");
                      setEditedEmail("");
                    }}
                    className="cancel-edit-button"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="user-email">{user.email}</p>
                <h2>{user.name}</h2>
                <p className="user-id">ID: {user._id}</p>
              </>
            )}
            {token && !editingUser && (
              <div className="user-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(user)}
                >
                  <Pencil size={16} />
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user._id)}
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <h2 style={{ color: "white" }}>
        CREA TU CUENTA PARA CONTRIBUIR CON NOSOTROS
      </h2>

      <button
        className="styled-button"
        onClick={() => setIsSignupModalOpen(true)}
      >
        Registrarme
        <div className="inner-button">
          <svg
            id="Arrow"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            width="30px"
            className="icon"
          >
            <defs>
              <linearGradient
                y2="100%"
                x2="100%"
                y1="0%"
                x1="0%"
                id="iconGradient"
              >
                <stop
                  style={{ stopColor: "#AAAAAA", stopOpacity: "1" }}
                  offset="0%"
                ></stop>
                <stop
                  style={{ stopColor: "#AAAAAA", stopOpacity: "1" }}
                  offset="100%"
                ></stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#iconGradient)"
              d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
            ></path>
          </svg>
        </div>
      </button>

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onOpenAdminModal={handleOpenAdminModal}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccessfulLogin={handleSuccessfulAdminLogin}
      />
    </div>
  );
}

export default Home;
