<p align="center">
  <img src="./assets/logo.svg" width="100" />
</p>
<p align="center">
    <h1 align="center">Webster Backend</h1>
</p>
<p align="center">
    <em>Design Tool API</em>
</p>
<p align="center">
 <img src="https://img.shields.io/github/license/maxkrv/webster-be?style=flat&color=0080ff" alt="license">
 <img src="https://img.shields.io/github/last-commit/maxkrv/webster-be?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
 <img src="https://img.shields.io/github/languages/top/maxkrv/webster-be?style=flat&color=0080ff" alt="repo-top-language">
 <img src="https://img.shields.io/github/languages/count/maxkrv/webster-be?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
  <em>Developed with the software and tools below.</em>
</p>
<p align="center">
 <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
 <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
 <img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
 <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
 <img src="https://img.shields.io/badge/Node.js-339933.svg?style=flat&logo=Node.js&logoColor=white" alt="Node.js">
 <img src="https://img.shields.io/badge/Zod-000000.svg?style=flat&logo=Zod&logoColor=white" alt="Zod">
 <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=white" alt="Prettier">
 <img src="https://img.shields.io/badge/Swagger-85EA2D.svg?style=flat&logo=Swagger&logoColor=black" alt="Swagger">
 <img src="https://img.shields.io/badge/OpenAPI-6BA539.svg?style=flat&logo=OpenAPI-Initiative&logoColor=white" alt="OpenAPI">
 <img src="https://img.shields.io/badge/Amazon_S3-569A31.svg?style=flat&logo=Amazon-S3&logoColor=white" alt="AWS S3">
 <img src="https://img.shields.io/badge/nestjs-E0234E?style=flat&logo=nestjs&logoColor=white" alt="Nest.js">
 <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL">
 <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=flat&logo=redis&logoColor=white" alt="Redis">
 <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens&logoColor=white" alt="JWT">
 <img src="https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white" alt="Stripe">
</p>
<hr>

## 🔗 Quick Links

> - [📋 Overview](#-overview)
> - [🚀 Tech Stack](#-tech-stack)
> - [🗄️ Database Schema](#️-database-schema)
> - [💻 Getting Started](#-getting-started)
>     - [⚙️ Installation](#️-installation)
>     - [🕜 Running webster Backend](#-running-webster-be)
> - [📜 Swagger Documentation](#-swagger-documentation)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)

---

## 📋 Overview

Webster is a design tool API that provides a backend solution for managing design projects, assets, and collaboration. It is built using TypeScript and Nest.js, ensuring a robust and scalable architecture. The API supports user authentication, project management, asset storage.

---

## 🚀 Tech Stack

- **Core**: [TypeScript](https://www.typescriptlang.org/), [Nest.js](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/)
- **Caching**: [Redis](https://redis.io/)
- **Authentication**: [JWT](https://jwt.io/), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- **Storage**: [AWS S3](https://aws.amazon.com/s3/)
- **Email**: [React-email](https://react.email/), [Nodemailer](https://nodemailer.com/)
- **Validation**: [class-validator](https://github.com/typestack/class-validator), [class-transformer](https://github.com/typestack/class-transformer), [zod](https://zod.dev/)
- **Payments**: [Stripe](https://stripe.com/)
- **Security**: [helmet](https://helmetjs.github.io/)
- **Documentation**: [Swagger](https://swagger.io/)
- **Development**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Containerization**: [Docker](https://www.docker.com/)

---

## 🗄️ Database Schema

The database schema is defined using Prisma and includes the following main entities:

- **Users**: Authentication, profiles, and user settings

---

## 💻 Getting Started

### ⚙️ Installation

1. Clone the Webster Backend repository:

```sh
git clone https://github.com/maxkrv/webster-be.git
```

2. Change to the project directory:

```shellscript
cd webster-be
```

3. Install the dependencies:

```shellscript
npm install
```

4. Create a `.env` file in the root directory with the following variables:

```plaintext
# App
PORT=3000
NODE_ENV=development
SERVER_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
THROTTLE_TTL=10
THROTTLE_LIMIT=200

# Database
DB_URL=postgresql://postgres:password@localhost:5432/webster?schema=public
DB_USER=postgres
DB_PASS=password
DB_NAME=webster
DB_PORT=5432

# JWT
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_ACCESS_TOKEN_TIME=15m
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_REFRESH_TOKEN_TIME=14d

# Mail
MAIL_PORT=465
MAIL_HOST=smtp.example.com
MAIL_AUTH_USER=user@example.com
MAIL_AUTH_PASS=password
MAIL_FROM_NAME=Webster
MAIL_FROM_ADDRESS=noreply@webster.com
MAIL_TOKEN_TIME=20m
MAIL_TOKEN_SECRET=your_mail_token_secret

# Redis
REDIS_PORT=6379
REDIS_HOST=localhost
REDIS_PASS=password
REDIS_USER=default
REDIS_ROOT_PASS=root_password

# AWS S3
AWS_S3_REGION=your_region
AWS_S3_ACCESS_KEY_ID=your_access_key
AWS_S3_SECRET_ACCESS_KEY=your_secret_key
AWS_PUBLIC_BUCKET_NAME=your_bucket_name

# Google Auth
AUTH_GOOGLE_APP_ID=your_google_app_id
AUTH_GOOGLE_APP_SECRET=your_google_app_secret
AUTH_GOOGLE_CALLBACK=your_callback_url
```

5. Initialize the database:

```shellscript
npx prisma migrate dev
```

### 🕜 Running Webster Backend

1. Start the required services using Docker:

```shellscript
docker-compose up -d
```

2. Run the application in development mode:

```shellscript
npm run start:dev
```

For production:

```shellscript
npm run build
npm run start:prod
```

---

## 📜 Swagger Documentation

To view the Swagger documentation for the Webster API, follow these steps:

1. Ensure the Webster Backend application is running.
2. Open your web browser and navigate to `http://localhost:6969/api/docs`.

This will open the Swagger UI, where you can explore and test the API endpoints interactively.

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **Submit Pull Requests**: Review open PRs, and submit your own PRs.
- **Report Issues**: Submit bugs found or log feature requests for Webster Backend.

<details><summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.

```shellscript
git clone https://github.com/maxkrv/webster-be
```

3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.

```shellscript
git checkout -b new-feature-x
```

4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.

```shellscript
git commit -m 'Implemented new feature x.'
```

6. **Push to GitHub**: Push the changes to your forked repository.

```shellscript
git push origin new-feature-x
```

7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/maxkrv/webster-be/blob/main/LICENSE) file for details.
