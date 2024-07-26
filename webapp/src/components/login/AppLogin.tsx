import React, { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import api from "../../service/api";
import { AuthContext } from "../../context/AuthContext";

export default function AppLogin() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const loginData = {
        username: inputUsername,
        password: inputPassword,
      };

      const response = await api.post("/api/auth/login", loginData);
      const { token } = response.data;

      if (authContext) {
        authContext.login(token);
      }

      setLoading(true);
      await delay(500);
      navigate("/AppHome");
    } catch (error) {
      setLoading(false);
      setShow(true);
      setErrorMessage("Falha na autenticação. Verifique suas credenciais.");
    }
  };

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Seja Bem-Vindo</div>
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Usuario ou Senha incorreto
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-4" controlId="username">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-5" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          {!loading ? (
            <Button className="w-100" variant="primary" type="submit">
              Log In
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Logging In...
            </Button>
          )}
        </Form.Group>
      </Form>

      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-black text-center">
        Desafio Técnico WebAPI | &copy;2024
      </div>
    </div>
  );
}
