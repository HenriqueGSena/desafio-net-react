import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import api from "../../../service/api";
import { AuthContext } from "../../../context/AuthContext";

export default function AppRegister({ getAllStudents }: { getAllStudents: () => void }) {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { authToken } = context;
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        serie: '',
        notaMedia: '',
        endereco: '',
        nomePai: '',
        nomeMae: '',
        dataNascimento: ''
    });

    const [errors, setErrors] = useState({
        nome: false,
        idade: false,
        serie: false,
        notaMedia: false,
        endereco: false,
        nomePai: false,
        nomeMae: false,
        dataNascimento: false
    });

    const handleClose = () => {
        setShow(false);
        setFormData({
            nome: '',
            idade: '',
            serie: '',
            notaMedia: '',
            endereco: '',
            nomePai: '',
            nomeMae: '',
            dataNascimento: ''
        });
        setErrors({
            nome: false,
            idade: false,
            serie: false,
            notaMedia: false,
            endereco: false,
            nomePai: false,
            nomeMae: false,
            dataNascimento: false
        });
    };

    const handleShow = () => setShow(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear the error for the specific field when user types
        setErrors({
            ...errors,
            [name]: false
        });
    };

    const validateForm = () => {
        const newErrors = {
            nome: !formData.nome,
            idade: !formData.idade,
            serie: !formData.serie,
            notaMedia: !formData.notaMedia,
            endereco: !formData.endereco,
            nomePai: !formData.nomePai,
            nomeMae: !formData.nomeMae,
            dataNascimento: !formData.dataNascimento
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Botão "Cadastrar" clicado.');
            try {
                const response = await api.post("/api/students", formData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                console.log('Estudante registrado com sucesso:', response.data);
                getAllStudents();
                handleClose();
            } catch (error) {
                console.error('Erro ao registrar o estudante:', error);
            }
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Novo Estudante
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Estudante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        isInvalid={errors.nome}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Nome é obrigatório.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Idade"
                                        name="idade"
                                        value={formData.idade}
                                        onChange={handleChange}
                                        isInvalid={errors.idade}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Idade é obrigatória.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Série"
                                        name="serie"
                                        value={formData.serie}
                                        onChange={handleChange}
                                        isInvalid={errors.serie}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Série é obrigatória.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nota Média"
                                        name="notaMedia"
                                        value={formData.notaMedia}
                                        onChange={handleChange}
                                        isInvalid={errors.notaMedia}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Nota Média é obrigatória.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Endereço"
                                        name="endereco"
                                        value={formData.endereco}
                                        onChange={handleChange}
                                        isInvalid={errors.endereco}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Endereço é obrigatório.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome do Pai"
                                        name="nomePai"
                                        value={formData.nomePai}
                                        onChange={handleChange}
                                        isInvalid={errors.nomePai}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Nome do Pai é obrigatório.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome da Mãe"
                                        name="nomeMae"
                                        value={formData.nomeMae}
                                        onChange={handleChange}
                                        isInvalid={errors.nomeMae}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Nome da Mãe é obrigatório.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Control
                                        type="date"
                                        placeholder="Data de Nascimento"
                                        name="dataNascimento"
                                        value={formData.dataNascimento}
                                        onChange={handleChange}
                                        isInvalid={errors.dataNascimento}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Data de Nascimento é obrigatória.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="text-end">
                            <Button variant="primary" type="submit">
                                Cadastrar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
