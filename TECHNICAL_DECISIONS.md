# Technical Decision Log

### 1. **Language: TypeScript vs. Go**

- **Considered**: Go, TypeScript
- **Decided on**: TypeScript

#### Rationale:

- **Familiarity**: The decision to use TypeScript was driven by my familiarity with it, as I have not worked with Go before. By choosing TypeScript, I can more effectively demonstrate my expertise.
- **Ecosystem**: TypeScript has a well-established ecosystem for backend development (e.g., Fastify, Express, NestJS) and integrates seamlessly with other JavaScript/TypeScript tools.
- **Type Safety**: TypeScript provides static typing out of the box, which can significantly reduce runtime errors and improve code quality and maintainability.

---

### 2. **API Framework: Fastify vs. Express vs. Next.js vs. Nest.js vs. Koa vs. Hapi**

- **Considered**: Express, Fastify, Next.js, Nest.js, Koa, Hapi
- **Decided on**: Fastify

#### Rationale:

- **Performance Focused**: Fastify is known for its high performance, being one of the fastest frameworks in the Node.js ecosystem.
- **TypeScript Support**: Fastify has excellent TypeScript support, providing automatic type inference, which reduces boilerplate and helps maintain type safety.
- **Built-in Features**: Fastify includes built-in schema validation and OpenAPI generation, which simplifies the development process and reduces the need for additional tools or libraries.
- **Scalability**: Fastify is designed to be lightweight and scalable, making it a great choice for handling high-throughput applications.

---

### 3. **Architecture: Hexagonal vs. Domain-Driven Design vs. MVC vs. Clean Architecture**

- **Considered**: Hexagonal, Domain-Driven Design (DDD), MVC, Clean Architecture
- **Decided on**: Clean Architecture

*I am aware that the architecture of this API is well beyond what was requested in the instructions, or would be suitable for a simple MVP, but I had the time available and wanted to build something to a professional standard that would be scaleable, maintainable and readable. Following the Clean Architecture principles provides a strong foundation for growith, and ensures that the codebase remains flexible and easy to extend.

#### Rationale:

- **Separation of Concerns**: Clean Architecture enforces a strong separation of concerns, which makes the codebase more maintainable and testable. The organization of layers (e.g., core/domain, application, infrastructure) is clear and reduces complexity.
- **Testability**: The structure of Clean Architecture allows for easy unit testing and mocks, which aligns well with the use of Jest for testing in this project.
- **Flexibility**: It allows for easy adaptation of different frameworks or infrastructure changes without affecting the core business logic.

---

### 4. **UUID Generation: uuid package vs. crypto vs. nanoid**

- **Considered**: uuid package, crypto, nanoid
- **Decided on**: crypto

#### Rationale:

- **Built-in Support**: By using the `crypto` module (built into Node.js), I avoid the need for external dependencies, keeping the project lighter.
- **Performance**: The `crypto` module offers a secure, performant way to generate unique identifiers.

---

### 5. **Testing: Mocha vs. Jest vs. Jasmine vs. Supertest vs. Chai**

- **Considered**: Mocha, Jest, Jasmine, Supertest, Chai
- **Decided on**: Jest

#### Rationale:

- **Familiarity**: Jest is a popular and well-documented testing framework, and my familiarity with it ensures smoother development and maintenance.
- **Code Coverage**: Jest has excellent built-in code coverage reporting, allowing me to quickly identify untested code and improve test coverage.
- **Mocking**: Jest provides easy-to-use mocking capabilities, which simplifies testing of components in isolation and helps improve test reliability (though I admit, typescript can add complexity here).
- **Ecosystem**: Jest has a robust ecosystem with integrations for TypeScript, which aligns with my project setup.

---

### 6. **API Documentation: Swagger vs. Postman Collections vs. Redoc**

- **Considered**: Swagger, Postman Collections, Redoc
- **Decided on**: Swagger

#### Rationale:

- **OpenAPI Generation**: Fastify’s built-in schema validation and OpenAPI support integrate seamlessly with Swagger. This means that API documentation can be auto-generated from route schemadefinitions. Since these schema definitions also enforce request validation, this helps ensure documentation is always up-to-date since it is generated from the source of truth.
- **Interactivity**: Swagger UI provides an interactive interface, allowing developers to easily test API endpoints directly from the documentation.
- **Standardization**: Swagger/OpenAPI is a widely adopted standard for API documentation, making it easier to integrate with other tools and services.

---

### 7. **Performance Benchmarking: wrk vs. k6 vs. siege vs. gatling vs. AutoCannon**

- **Considered**: wrk, k6, siege, gatling, AutoCannon
- **Decided on**: AutoCannon

#### Rationale:

- **Integration with Project**: AutoCannon can be installed directly as a project dependency, making it easy to run benchmarks as part of the development workflow without needing to install external tools.
- **Convenience**: Being able to run performance tests directly from the command line in the context of the project allows for easy benchmarking during the development cycle.
- **Charting**: AutoCannon provides clear, easy-to-read chart outputs in the terminal, giving immediate insights into API performance metrics.

---

## Folder Structure

Folder structure follows a Clean Architecture approach, organizing code into separate layers that focus on specific concerns:

```
src/
├── app/
│   ├── core/
│   ├── domain/
│   └── services/
├── infrastructure/
│   ├── config/
│   ├── repositories/
│   └── index.ts
├── interface/
│   ├── routes/
│   ├── controllers/
│   ├── hooks/
│   ├── errors/
│   └── index.ts
├── types/
├── utils/
└── server.ts
```

#### Rationale:

- **Clear Separation of Concerns**: By organizing the code into separate layers (domain, application, infrastructure, and interface), it ensures that each layer has a distinct responsibility, making the application easier to maintain and extend.
- **Scalability**: This structure allows for easy scaling of the application. New features can be added to the appropriate layer without affecting the others.
- **Maintainability**: Each component (e.g., services, repositories, controllers) is encapsulated in its own directory, which improves the maintainability of the codebase as the project grows.

---
