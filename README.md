# Pokédex - APP

Este projeto é o frontend de uma aplicação fullstack de Pokédex, desenvolvido com **Angular CLI 17.3.17**. Ele consome uma API REST construída com **Spring Boot** ([repositório](https://github.com/marcoscunhaa/Pokedex-with-springboot)).

## 🛠️ Tecnologias utilizadas

- [Angular CLI 17.3.17](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- [Node.js v22.12.0](https://nodejs.org/)
- [npm v11.4.1](https://www.npmjs.com/)

## 📁 Estrutura de ambientes

A aplicação possui dois ambientes configurados:

- **environment.dev.ts (desenvolvimento)**: Usa a API local (`http://localhost:8080` ou conforme configurado).

```ts
import { environment } from '../../environments/environment.dev';
```

- **environment.prod.ts (produção)**: Usa o endereço da API hospedada no Railway.

```ts
import { environment } from '../../environments/environment.prod';
```

🚀 Como rodar o projeto localmente
----------------------------------

### 1. Pré-requisitos

* Node.js v22 ou superior

* npm v11 ou superior

* Angular CLI instalado globalmente:
  
  ```
  
  ```

### 2. Clonar o repositório

```

```



### 3. Instalar as dependências

bash

CopiarEditar

`npm install`

### 4. Rodar em ambiente de desenvolvimento

bash

CopiarEditar

`ng serve`

Acesse em: `http://localhost:4200`

### 5. Build para produção

bash

CopiarEditar

`ng build --configuration production`

O build estará disponível na pasta `dist/`.
