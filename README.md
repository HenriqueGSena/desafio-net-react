
# Desafio Técnico: Criação de uma WebAPI com .NET 6 e Front-end em React com Autenticação

Desenvolver uma aplicação web que permita gerenciar informações de estudantes, incluindo listagem, adição, atualização e exclusão de registros. A aplicação deve ser composta por uma WebAPI desenvolvida com .NET 6 e um front-end desenvolvido em React, incluindo uma tela de login.

#### Requisitos
##### Back-end (WebAPI)
1. **Framework**: .NET 6.
2. **Entity Framework**: Usar o EF Core com um banco de dados em memória.
3. **Autenticação**: Implementar autenticação básica (JWT).
4. **Endpoints**:
    - **GET** `/api/students`: Retorna todos os estudantes (autenticado).
    - **GET** `/api/students/{id}`: Retorna um estudante específico (autenticado).
    - **POST** `/api/students`: Cria um novo estudante (autenticado).
    - **PUT** `/api/students/{id}`: Atualiza um estudante existente (autenticado).
    - **DELETE** `/api/students/{id}`: Deleta um estudante (autenticado).
    - **POST** `/api/auth/login`: Autentica um usuário e retorna um token JWT.

5. **Modelo de Dados**:
    - `Student`
        - `int Id` (identificador único)
        - `string Nome` (nome do estudante)
        - `int Idade` (idade do estudante)
        - `int Serie` (série do estudante)
        - `double NotaMedia` (nota média do estudante)
        - `string Endereco` (endereço do estudante)
        - `string NomePai` (nome do pai do estudante)
        - `string NomeMae` (nome da mãe do estudante)
        - `DateTime DataNascimento` (data de nascimento do estudante)
    - `User`
        - `int Id` (identificador único)
        - `string Username` (nome de usuário)
        - `string Password` (senha)

6. **Seed Data**:
    - Popular a base de dados em memória com os dados do CSV fornecido e um usuário padrão.

##### Front-end (React)
1. **Framework**: React.
2. **Componentes**:
    - **Login**: Tela de login.
    - **StudentList**: Exibe a lista de estudantes.
    - **StudentForm**: Formulário para criar/atualizar estudantes.

3. **Funcionalidades**:
    - Login de usuário.
    - Listar todos os estudantes (após login).
    - Adicionar um novo estudante (após login).
    - Atualizar um estudante existente (após login).
    - Excluir um estudante (após login).

4. **UI/UX**:
    - Utilize uma biblioteca de componentes UI (por exemplo, Material-UI ou Bootstrap).
    - A interface deve ser responsiva e de fácil utilização.
    - Exiba mensagens de erro e sucesso para as operações de CRUD.
## Documentação da API

#### Retorna todos os itens

http://localhost:5215/swagger/index.html



## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar passar o seguinte comando:

**Back-end:** `dotnet Wacth Run`

**Front-end:** `npm start`


## Suporte

Para suporte, mande um email para carloshenrique3250@gmail.com ou entre em nosso canal https://wa.me/5521992834373
