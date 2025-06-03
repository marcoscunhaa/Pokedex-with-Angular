# 🧠 Pokedex App - Angular

This is the frontend of the **Pokedex** application, developed with Angular, styled with Tailwind CSS, and connected to an API in Spring Boot. The application consumes data from the PokéAPI through an intermediary API ([Repositório Backend (Spring Boot)](https://github.com/marcoscunhaa/Pokedex-with-Angular/tree/main/backend)) and displays information about Pokémon in a modern and responsive way.

---

### 🛠️ Technologies Used

* **Angular CLI**: v17.3.17

* **Node.js**: v22.12.0

* **NPM**: v11.4.1

* **RxJS**

* **Tailwind CSS**

* **TypeScript**

---

### 📑 Environment Structure:

The application has two environment files, The active environment is imported into the services through:

* `environment.ts` (development):
  
  ```ts
  import { environment } from '../../environments/environment'
  ```

* `environment.prod.ts` (production)
  
  ```ts
  import { environment } from '../../environments/environment.prod';
  ```

---

### 🌐 Endpoints used by environment:

* **Development:** points to the local Spring Boot backend (usually `http://localhost:8080`)

* **Production:** points to to the backend hosted on [Railway](https://pokedex-with-springboot-production.up.railway.app/api/pokemons)

---

👨‍💻Installation and Execution:
------------------------

### ✅ 1. Prerequisites

Make sure you have installed:

* Node.js v22.12.0

* NPM v11.4.1

* Angular CLI v17.3.17

### 🔄 2. Clone the repository

```bash
git clone https://github.com/marcoscunhaa/Pokedex-with-Angular
cd Pokedex-with-Angular
```

### 💾 3. Install dependencies

```bash
npm install
```

### 🚀 4. Run in development environment

```bash
ng serve
```

---

### 🎯 Application running:

![pokedex-app](assets/pokedex-application.gif "pokedex-app")


