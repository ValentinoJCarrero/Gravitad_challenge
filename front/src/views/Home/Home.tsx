import { useState, useEffect } from "react";
import "./Home.css";

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
  const usersPerPage = 6;

  useEffect(() => {
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

    fetchUsers(currentPage, usersPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="user-api-home">
      <h1>API DE USUARIOS</h1>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <img
              src="https://g-oa94pcexkfq.vusercontent.net/placeholder-user.jpg"
              alt={user.name}
              className="user-avatar"
            />
            <p className="user-email">{user.email}</p>
            <h2>{user.name}</h2>
            <p className="user-id">ID: {user._id}</p>
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

      <button className="styled-button">
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
        <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient">
          <stop style={{ stopColor: '#AAAAAA', stopOpacity: '1' }} offset="0%"></stop>
          <stop style={{ stopColor: '#AAAAAA', stopOpacity: '1' }} offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#iconGradient)"
        d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
      ></path>
    </svg>
        </div>
      </button>
    </div>
  );
}

export default Home;