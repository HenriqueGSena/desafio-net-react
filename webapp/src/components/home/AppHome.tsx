import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

export default function AppHome() {
    return (
      <div className="d-flex align-items-center" style={{ height: "35vh" }}>
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col">
              <Form className="w-50 mx-auto">
                <Form.Control type="text" placeholder="Pesquise contato aqui" />
              </Form>
            </div>
            {/* <div className="col-2">
              <AppRegister getAllContatos={getAllContatos} />
            </div> */}
          </div>

          <Table striped bordered hover>
            <thead>
              <th />
              <th>Nome</th>
              <th>Idade</th>
              <th>Serie</th>
              <th>Media</th>
              <th>Endereço</th>
              <th>Pai</th>
              <th>Mae</th>
              <th>Data Nascimento</th>
            </thead>
            {/* <tbody>
              {filteredData.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.nome}</td>
                  <td>{contact.email}</td>
                  <td>{contact.telefone}</td>
                </tr>
              ))}
            </tbody> */}
          </Table>
        </div>
      </div>
    );
}
