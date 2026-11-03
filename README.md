# API de Produtos (Não Relacional)

API REST simples para gerenciamento de produtos, construída com **Node.js**, **Express** e **MongoDB**.

## Deploy

A API está publicada no Render:

🔗 **https://api-produtos-naorelacionavel.onrender.com/produtos**

> Como o serviço está no plano gratuito do Render, a primeira requisição pode demorar alguns segundos enquanto a instância "acorda".

Para usar a versão em produção nos exemplos abaixo, troque `http://localhost:3000` por `https://api-produtos-naorelacionavel.onrender.com`.

## Tecnologias

- [Node.js](https://nodejs.org/) (v20.6+ recomendado, para suporte a `--env-file`)
- [Express](https://expressjs.com/) 5
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/) 7

## Estrutura do projeto

```
api-produtos-naorelacional/
├── index.js          # Servidor Express e rotas da API
├── package.json
├── .env              # Variáveis de ambiente (não versionado)
└── .gitignore
```

## Pré-requisitos

- Node.js instalado
- Uma instância do MongoDB (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))

## Instalação

```bash
git clone <url-do-repositorio>
cd api-produtos-naorelacional
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com a string de conexão do MongoDB:

```env
MONGO_URI=mongodb://localhost:27017
```

> A API utiliza o banco `loja` e a coleção `produtos`, que são criados automaticamente pelo MongoDB na primeira inserção.

## Executando

```bash
node --env-file=.env index.js
```

Se tudo estiver correto, você verá:

```
CONECTADO AO MONGODB COM SUCESSO!
API RODANDO NA PORTA 3000
```

A API ficará disponível em `http://localhost:3000`.

## Endpoints

| Método   | Rota             | Descrição                         |
| -------- | ---------------- | --------------------------------- |
| `POST`   | `/produtos`      | Cria um novo produto              |
| `GET`    | `/produtos`      | Lista todos os produtos           |
| `GET`    | `/produtos/:id`  | Busca um produto pelo ID          |
| `PUT`    | `/produtos/:id`  | Atualiza um produto pelo ID       |
| `DELETE` | `/produtos/:id`  | Remove um produto pelo ID         |

> O parâmetro `:id` deve ser um `ObjectId` válido do MongoDB (24 caracteres hexadecimais).

### Exemplos

**Criar produto**

```bash
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teclado", "preco": 150.0, "estoque": 10}'
```

Resposta (`201 Created`):

```json
{ "acknowledged": true, "insertedId": "6543a1b2c3d4e5f678901234" }
```

**Listar produtos**

```bash
curl http://localhost:3000/produtos
```

**Buscar produto por ID**

```bash
curl http://localhost:3000/produtos/6543a1b2c3d4e5f678901234
```

**Atualizar produto**

```bash
curl -X PUT http://localhost:3000/produtos/6543a1b2c3d4e5f678901234 \
  -H "Content-Type: application/json" \
  -d '{"preco": 129.9}'
```

> A atualização usa `$set`, ou seja, apenas os campos enviados são alterados.

**Remover produto**

```bash
curl -X DELETE http://localhost:3000/produtos/6543a1b2c3d4e5f678901234
```

## Licença

ISC

