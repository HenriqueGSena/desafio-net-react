import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AppRegister from "./register/AppRegister";
import api from "../../service/api";
import { User } from "./interface/User";
import { AuthContext } from "../../context/AuthContext";

export default function AppHome() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { authToken } = context;
  const [users, setUsers] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/students", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUsers();
    }
  }, [authToken]);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.nome.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filteredUsers);
  }, [users, filterValue]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("pt-BR", options).format(date);
  };

  const handleDelete = async (userId: number) => {
    try {
      await api.delete(`/api/students/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="container-fluid text-center">
      <div className="row mb-4" style={{ marginTop: "10vh" }}>
        <div className="col-12 col-md-8 mx-auto">
          <Form>
            <Form.Control
              type="text"
              placeholder="Pesquise pelo aluno aqui"
              value={filterValue}
              onChange={handleFilterChange}
            />
          </Form>
        </div>
        <div className="col-12 col-md-2 mt-3 mt-md-0">
          <AppRegister getAllStudents={fetchUsers} />
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Série</th>
              <th>Média</th>
              <th>Endereço</th>
              <th>Nome do Pai</th>
              <th>Nome da Mãe</th>
              <th>Data Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.idade}</td>
                <td>{user.serie}</td>
                <td>{user.notaMedia}</td>
                <td>{user.endereco}</td>
                <td>{user.nomePai}</td>
                <td>{user.nomeMae}</td>
                <td>{formatDate(new Date(user.dataNascimento))}</td>
                <td>
                  {/* <Button variant="warning">
                    <i className="bi bi-pencil-square"></i>
                  </Button> */}
                  <Button variant="danger" onClick={() => handleDelete(user.id)} className="ms-2">
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
