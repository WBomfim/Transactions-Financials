# Boas-vindas ao projeto de teste de Willian Bomfim!

<details>
<summary><strong>👨‍💻 Descrição do projeto</strong></summary><br />

O projeto consiste em estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.
</details>

<details>
<summary><strong>📝 Detalhes do desenvolvimento</strong></summary><br />

Nesse projeto foi utilizado **Node.js** com **Express** para o desenvolvimento da API, para o banco de dados foi utilizado o **PostgreSQL** junto com o ORM **Sequelize**, para criar hash de senha foi utilizado **bcrypt** e **JTW** para geração de tokens. No front-end foi utilizado **React.js** com **TypeScript** e **CSS** puro para estilização.

Requisitos desenvolvidos no back-end:
- Criados o endpoint GET `/users` para listar os usuários, o filtro trás um array com os usuários que podem receber um depósito;
- Criado o endpoint POST `/users` onde é possível realizar o cadastro de um usuário;
- Criado o endpoint POST `/login` onde é possível realizar o login de um usuário cadastrado no banco;
- Criado o endpoint GET `accounts/balance` onde é possível buscar o saldo do usuário logado;
- Criado o endpoint POST `/transactions` onde é possível realizar e cadastrar uma tranferência informando o nome do usuário de destino e o valor;
- Criado o endpoint GET `transactions` onde é possível buscar todas as transações que o usuário participou;
- Criado o endpoint GET `/transactions/cash-in` onde é possivel buscar todas as transações de crédito do usuário logado;
- Criaod o endpoint GET `/transactions/cash-out` onde é possível buscar todas as transações de débito do usuário logado;
- Criado o endpoint GET `/transactions/date` onde é possível buscar todas as transações de uma data especifica via query string;

Requisitos desenvolvidos no front-end:
- Criado uma tela de cadastro na rota `/registration` onde é possível realizar o cadastro informando nome e senha;
- Criado uma tela de login na rota `/login` onde é possível realizar o login de um usuário cadastrado;
- Criado uma tela home na rota `/home` onde é possível visualizar seu extrato, filtrar as transações por tipo e por data, também é possível visualizar seu saldo em tela e realizar transações para outros usuários cadastrados. O filtro por data também contempla a opção associar os filtro de tipo na mesma requisição.

Mais detalhes:
- Durante o desenvolvimento foram aplicadas regras de validações em todas as entradas, desde a contrução do banco onde já foi realizado o set dos tipos de dados e relacionamentos entre as entidades, na API todos os dados são verificados antes de qualquer transação e no front-end os dados também são validados antes de qualquer entrada.
</details>

<details>
<summary><strong>🎲 Diagrama de entidades e relacionamentos</strong></summary><br />

![digram](https://user-images.githubusercontent.com/95863726/203177211-44b28a84-ddcf-4eba-ba4f-2656b83afaa6.png)

### Tabelas

O banco terá três tabelas: 

- A tabela `Users`, com os atributos `id`, `username`, `password` e `accountId`;
- A tabela `Accounts` com os atributos `id` e `balance`;
- A tabela `transactions`, com os atributos `id`, `debitedAccountId`, `creditedAccountId`, `value` e `createdAt`;
</details>
  
<details>
<summary><strong>📖 Documentação do back-end</strong></summary>

### **Back-end:**
```bash
http://localhost:3001
```
### **DB:**
```bash
http://localhost:3002
```

<details>
<summary><strong>▶️ Rota para Login</strong></summary>

## `POST` /login

**Realiza o login de um usuário cadastrado no banco de dados**

O username e password devem ser enviados no `body` no seguinte formato:

```bash
{
	"username": "User1",
	"password": "senhaSecreta1"
}
```

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna um objeto contendo username, account e o token JTW - Response status `200` (application/json):

```bash
{
	"username": "User1",
	"account": 1,
	"token": "/.../"
}
```

- `Bad Request` - Quando o usuário não está cadastrado no banco de dados - Response status `400` (application/json):

```bash
{ 
  "message": "Invalid username"
}
```

- `Bad Request` - Quando a senha do usuário não corresponde a senha cadastrada no banco - Response status `401` (application/json):

```bash
{ 
  "message": "Invalid password"
}
```
</details>

<details>
<summary><strong>▶️ Rotas para Users</strong></summary>

## `POST` /users

**Realiza o cadastro de um usuário no banco de dados**

O username e password devem ser enviados no `body` no seguinte formato:

```bash
{
	"username": "User1",
	"password": "senhaSecreta1"
}
```

Os retornos seguem os formatos abaixo:

- `Created` - Retorna um objeto com as informações do usuário criado e um token de autenticação - Response status `201` (application/json):

```bash
{
	"username": "User1",
	"account": 1,
	"token": "/.../"
}
```
  
- `Bad Request` - Retorna um erro quando o username possui menos de 3 caracteres - Response status `400` (application/json):

```bash
{
	"message": "username must be at least 3 characters long"
}
```
  
- `Conflict` - Retorna um erro quando o usuário ja está cadastrado no banco - Response status `409` (application/json):

```bash
{
	"message": "User already exists"
}
```
  
- `Bad Request` - Retorna um erro quando o password possui menos de 8 caracteres - Response status `400` (application/json):

```bash
{
	"message": "password must be at least 8 characters long"
}
```
  
- `Bad Request` - Retorna um erro quando o password não possui nenhuma letra maiúscula - Response status `400` (application/json):

```bash
{
	"message": "password must have at least one upper case letter"
}
```
  
- `Bad Request` - Retorna um erro quando o password não possui nenhum número - Response status `400` (application/json):

```bash
{
	"message": "password must have at least one numeric character"
}
```

## `GET` /users

**Lista todos os usuários cadastrados no banco, menos o que está fazendo a requisição**
  
O token de autenticação deve ser enviado nos headers da requisição

Os usuários possuem `id`, `username` e `accountId`.

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna todos os usuários cadastrados - Response status `200` (application/json):

```bash
[
  {
    "id": 2,
    "username": "User2",
    "accountId": 2
  },
  {
    "id": 3,
    "username": "User3",
    "accountId": 3
  },
  /* ... */
]
```

- `Unauthorized` - Retorna uma mensagem de erro caso o token enviado na requisição seja inválido - Response status `401` (application/json):

```bash
{
	"message": "Invalid token"
}
```
</details>

<details>
<summary><strong>▶️ Rotas para Accounts</strong></summary>

## `GET` /accounts/balance

**Realiza a busca pelo saldo da conta do usuário que efetua a requisição**

O token de autenticação deve ser enviado nos headers da requisição

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna um objeto com o saldo da conta - Response status `200` (application/json):

```bash
{
	"balance": "88.50"
}
```
  
- `Unauthorized` - Retorna uma mensagem de erro caso o token enviado na requisição seja inválido - Response status `401` (application/json):

```bash
{
	"message": "Invalid token"
}
```
</details>

<details>
<summary><strong>▶️ Rotas para Transactions</strong></summary>

## `POST` /transactions

**Realiza uma transferência entre contas, o usuário logado envia a requisição informando o nome do usuário que irá receber
  o montante e informa também o valor, dessa forma é realizada a operação de débito na conta do usuáirio logado e crédito na conta
  do usuário informado, após essa operação a transação é armazenada em uma tabela especifica**

O token de autenticação deve ser enviado nos headers da requisição
  
O usernameCredited e value devem ser enviados no `body` no seguinte formato:

```bash
{
	"usernameCredited": "User2",
	"value": 100.00
}
```

Os retornos seguem os formatos abaixo:

- `Created` - Retorna um objeto com as informações da transação realizada com sucesso - Response status `201` (application/json):

```bash
{
	"id": 47,
	"debitedAccountId": 1,
	"creditedAccountId": 2,
	"value": "0.01",
	"createdAt": "2022-11-22T05:19:32.684Z"
}
```

- `Unauthorized` - Retorna uma mensagem de erro caso o token enviado na requisição seja inválido - Response status `401` (application/json):

```bash
{
	"message": "Invalid token"
}
```
  
- `Not Found` - Retorna uma mensagem de erro caso o usuário de destino seja inexistente - Response status `404` (application/json):

```bash
{
	"message": "User not found"
}
```
  
- `Conflict` - Retorna uma mensagem de erro caso o valor informado seja menor ou igual a zero  - Response status `409` (application/json):

```bash
{
	"message": "The value cannot be less than or equal to zero"
}
```
  
- `Conflict` - Retorna uma mensagem de erro caso o usuário tente realizar uma transação na própria conta  - Response status `409` (application/json):

```bash
{
	"message": "Invalid credit account"
}
```
  
- `Conflict` - Retorna uma mensagem de erro caso o valor informado seja maior que o saldo que o usuário possui na conta  - Response status `409` (application/json):

```bash
{
	"message": "Insufficient account balance"
}
```
  
## `GET` /transactions

**Realiza uma busca por todas as transações que o usuário participou**

O token de autenticação deve ser enviado nos headers da requisição

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna um array com todas as transações que o usuário participou - Response status `200` (application/json):

```bash
[
  {
		"id": 1,
		"debitedAccountId": 1,
		"creditedAccountId": 2,
		"value": "10.00",
		"createdAt": "2022-11-19T04:06:32.687Z"
	},
	{
		"id": 4,
		"debitedAccountId": 4,
		"creditedAccountId": 1,
		"value": "10.00",
		"createdAt": "2022-11-19T04:06:32.687Z"
	},
  /* ... */
]
```
  
- `Unauthorized` - Retorna uma mensagem de erro caso o token enviado na requisição seja inválido - Response status `401` (application/json):

```bash
{
	"message": "Invalid token"
}
```
  
## `GET` /transactions/cash-in

**Realiza uma busca por todas as transações que o usuário recebeu crédito**

O token de autenticação deve ser enviado nos headers da requisição

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna um array com todas as transações crédito que o usuário participou - Response status `200` (application/json):

```bash
[
  {
		"id": 4,
		"debitedAccountId": 4,
		"creditedAccountId": 1,
		"value": "10.00",
		"createdAt": "2022-11-19T04:06:32.687Z"
	},
	{
		"id": 46,
		"debitedAccountId": 18,
		"creditedAccountId": 1,
		"value": "50.00",
		"createdAt": "2022-11-21T21:33:56.986Z"
	}
  /* ... */
]
```
  
- `Unauthorized` - Retorna uma mensagem de erro caso o token enviado na requisição seja inválido - Response status `401` (application/json):

```bash
{
	"message": "Invalid token"
}
```
  
## `GET` /transactions/cash-out

**Realiza uma busca por todas as transações que o usuário recebeu débito**

O token de autenticação deve ser enviado nos headers da requisição

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna um array com todas as transações débito que o usuário participou - Response status `200` (application/json):

```bash
[
  {
		"id": 1,
		"debitedAccountId": 1,
		"creditedAccountId": 2,
		"value": "10.00",
		"createdAt": "2022-11-19T04:06:32.687Z"
	},
	{
		"id": 5,
		"debitedAccountId": 1,
		"creditedAccountId": 2,
		"value": "10.02",
		"createdAt": "2022-11-19T20:15:08.921Z"
	},
  /* ... */
]
```
  
- `Unauthorized` - Retorna uma mensagem de erro caso o token enviado na requisição seja inválido - Response status `401` (application/json):

```bash
{
	"message": "Invalid token"
}
```
  
## `GET` /transactions/date

**Realiza uma busca por todas as transações que o usuário participou em uma data especifica enviada via query string**

O token de autenticação deve ser enviado nos headers da requisição

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna um array com todas as transações que o usuário participou - Response status `200` (application/json):

```bash
[
  {
		"id": 1,
		"debitedAccountId": 1,
		"creditedAccountId": 2,
		"value": "10.00",
		"createdAt": "2022-11-19T04:06:32.687Z"
	},
	{
		"id": 5,
		"debitedAccountId": 1,
		"creditedAccountId": 2,
		"value": "10.02",
		"createdAt": "2022-11-19T20:15:08.921Z"
	},
  /* ... */
]
```
  
- `Unauthorized` - Retorna uma mensagem de erro caso o token enviado na requisição seja inválido - Response status `401` (application/json):

```bash
{
	"message": "Invalid token"
}
```
</details>
</details>

<details>
<summary><strong>📖 Documentação do front-end</strong></summary>

### **Front-end:**
```bash
http://localhost:3000
```

<details>
<summary><strong>▶️ Diretório pages</strong></summary>

## `Registration` /registration

**Neste diretório possui os arquivos relacionados a página de cadastro de um usuário**

A página possui toda a estrutura para efetuar o cadastro de um usuário. Para as entradas de dados foram implementadas verificações
a fim de impossibilitar a entrada de dados inválidos para a requisição. As validações contemplam verificar se o username possui 3 ou mais caracteres, 
verifica se a senha é maior ou igual a 8 caracteres, onde é necessário possuir ao menos uma letra maiúscula e um número. Assim que o cadastro é realizado o usuário é encaminhado para a página home na rota /home.

## `Login` /login

**Neste diretório possui os arquivos relacionados a página de login do usuário**
	
A página possui toda a estrutura para efetuar o login de um usuário. Similarmente a página de registro possui validações para a entrada de dados, 
no entanto, não há como garantir sucesso na requição pelo fato de que os dados serão verificados no banco de dados. Se o login for realizado com sucesso o usuário é encaminhado para a página home na rota /home.
	
## `Home` /home

**Neste diretório possui os arquivos relacionados a página principal da aplicação**
	
Nesta página é possivel visualizar o saldo do usuário e suas transações, possui também botões para realizar filtros nas transações tais como, filtrar por crédito e débito, há também a possibilidade de filtrar por uma data especifica, quando solicitado esse filtro é exibido um modal onde o usuário pode optar por retornar as transações de uma determinada data filtrada também pelo tipo crédito e débito, possui um botão para realizar transações, ao selecionar a opção de tranferir é exibido um modal onde o usuário seleciona o destinatário, informa o valor da transação e confirma.
</details>
	
<details>
<summary><strong>▶️ Diretório components</strong></summary>

## `Header`

**Neste diretório possui os arquivos realacionados ao componente Header**

O componente consiste em um header que é renderizado na página home, o componente é responsavel por exibir uma saldação ao usuário, exibir tambem o número da conta e o saldo. O nome e a conta possui lógica no proprio componente para processar, já o saldo é recebido via props da página home, e por fim o header possui um botão de sair que efetua o logout do usuário.
	
## `Modal`

**Neste diretório possui os arquivos realacionados ao componente Modal**
	
Esse componete é um modal utilizado na página home para exibir alguns componente durante um filtro de transações ou a realização de uma tranferência. Ele recebe por props 3 parametros, o primeiro é o componente que será exibido no seu body, o segundo é o estado de sua exibição e o terceiro é a função que realiza o set do estado para ele deixar de ser exibido em tela.
	
## `StatementTable`

**Neste diretório possui os arquivos realacionados ao componente StatementTable**
	
Esse componente é uma tabela utilizada na página home para exibir as informações sobre as tansações do usuário, ele recebe um array com as transações por props e renderiza essas informações em uma tabela.
	
## `FilterByDate`

**Neste diretório possui os arquivos realacionados ao componente FilterByDate**	
	
Esse componente é exibido na tela de home pelo componente modal, nele possui a lógica para obter as transações filtradas por uma data especifica e também associar demais filtro como o de débito e crédito. Esse componente recebe como props a função de setState da página home, assim que os valores filtados são obtido ele realiza um state lifiting provendo a informação para os demais componetes da página home.
	
## `DoTransfer`

**Neste diretório possui os arquivos realacionados ao componente DoTransfer**
	
Esse componente é exibido na tela de home pelo componente modal, nele possui a lógica responsável por realizar uma tranferência, ele recebe por props duas funções, uma que da a ele a opção de alterar o valor que do estado destinado a sua exibição e outra que chama uma atualização das informações assim que uma tranferência é realizada.
</details>
	
<details>
<summary><strong>▶️ Diretório helpers</strong></summary>

## `handleRequests`

**Esse arquivo possui todas as funções relacionadas as requisições realizadas em toda a aplicação**

Neste arquivo foram contruídas funções genéricas que realizam requisições a API utilizando o axios como base.

## `handleStorage`

**Esse arquivo possui as funções que lidam com o armazenamento de informações no localStorage**
	
Similar ao hadleRequests esse arquivo possui funções genericas que são providas para toda aplicação para manipular dados que tenham a necessidade de ser persistido no localStorage.
</details>	
</details>

# Instruções para rodar o projeto

<details>
<summary><strong>:whale: Rodando com docker</strong></summary><br />

Abra o projeto na raiz onde se encontra o arquivo docker-compose.yml

Rode os serviços `node` e `db`:

```bash
  docker-compose up -d
```

- Lembre-se de verificar se não há outra aplicação rodando nas portas 3000, 3001 e 3002, caso tenha será necessário parar os serviços antes de subir os containers.
- Esses serviços irão inicializar 3 containers chamados de `NG_frontend-app`, `NG_backend-app` e `NG_db`;
- A partir daqui você pode rodar os containers `NG_frontend-app` e `NG_backend-app` via CLI ou abri-los no VS Code.

## Para o back-end:
Acesse o terminal interativo do container criado pelo compose:

```bash
  docker exec -it NG_backend-app sh
```

Instale as dependências dentro do container:

```bash
  npm install
```

Execute o script para criar e iniciar o banco de dados:
- Esse script faz o build para compilação do código typescript, após é realizado um drop no banco caso ele exista, na sequência ele cria o banco, executa as migrations e por ultimo executa as seeders para termos dados iniciais no banco de desenvolvimento.
- **:warning: Atenção:** Esse script só deve ser executado para estabelecer o banco de desenvolvimento inicialmente, caso contrário ele apagara toda a informação existente. 

```bash
  npm run db:reset
```

Inicie o servidor em modo de desenvolvimento:
- Apartir desse comando todos os endpoints estarão disponíveis em `localhost:3001`

```sh
  npm run dev
```
	
**:warning: Atenção:** Todos os comandos disponíveis no `package.json` devem ser executados dentro do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

## Para o front-end:
Acesse o terminal interativo do container criado pelo compose:

```sh
  docker exec -it NG_frontend-app sh
```

Instale as dependências dentro do container:

```sh
  npm install
```

Inicie a aplicação:
- Apartir desse comando basta acessar `localhost:3000` em um navegador de sua preferência.

```sh
  npm start
```
</details>

<details>
<summary><strong>⏩️ Scripts</strong></summary><br />

Criar o banco de dados, gerar as tabelas e popular o banco:

```sh
  npm run db:reset
```

Executar o servidor node em modo de desenvolvimento:

```sh
  npm run dev
```
	
Executar os testes no back-end:

```sh
  npm test
```
	
Executar os testes com o log de cobertura:

```sh
  npm run test:coverage
```
</details>

# Demais detalhes
<details>
<summary><strong>🚀 Próximas implementações</strong></summary><br />

- Implementar testes para cobrir 100% da aplicação, tanto no front-end quanto no back-end.
- implementar o JTW no react para podermos utilizar o payload de forma mais otimizada no front-end. 
</details>

# Autor

🖋️ [@Willian Bomfim](https://www.linkedin.com/in/willianbomfim/)
