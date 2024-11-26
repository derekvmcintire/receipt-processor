# Receipt Processor Challenge

## Summary

**Objective:** Build a web service that implements the specified API for processing receipts.

**API Overview:**

- **Endpoint:** `/receipts/process` (POST)
  - **Payload:** JSON receipt (retailer, purchaseDate, purchaseTime, items, total)
  - **Response:** JSON with a generated receipt ID.
- **Endpoint:** `/receipts/{id}/points` (GET)
  - **Response:** JSON with the number of points awarded for the receipt.

**Technology Used:**

- [TypeScript](https://www.typescriptlang.org/): Although the preferred language for this challenge was Go, I've never used it before, so I chose TypeScript because I was confident that I could build something that showcases my abilities. I plan to attempt to build this in Go once the TypeScript version is complete.
- [Fastify](https://fastify.dev/): I wanted a lightweight, performant framework to use, since I am aware Go is generally more performant than Node.js. Although I have never used it before, I found it intuitive and easy to get something up and running quickly.
- [Docker](https://www.docker.com/): One of the requirements of this challenge was to use docker, so the app is available in a docker container via `npm run docker:run`.
- [Jest](https://jestjs.io/): I used jest for unit tests.
- [Swagger](https://swagger.io/): I used Swagger to generate documentation UI based on an openAPI spec generated by `@fastify/swagger`.
- [AutoCannon](https://www.npmjs.com/package/autocannon): Used for benchmarking performance
- **In-memory Storage**: There is no database, data is stored in a Map and will be lost if the server is restarted.

This API was built as part of a code challenge for [Fetch Rewards](https://fetch.com/). For detailed instructions and rules, refer to the [full API documentation](link-to-api-docs).

---

## **Instructions to Run the Application**

Follow these steps to set up, build, and run this application:

---

### **1. Prerequisites**

Make sure the following are installed on your system:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Docker** (if you intend to run the application in a container)

---

### **2. Clone the Repository**

```bash
git clone git@github.com:derekvmcintire/receipt-processor.git
cd receipt-processor
```

---

### **3. Install Dependencies**

Run the following command to install all necessary dependencies:

```bash
npm install
```

---

### **4. Run the Application Locally**

You have two options to run the application: **development mode** or **production mode**.

#### **a. Development Mode**

Run the application in development mode with TypeScript support:

```bash
npm run dev
```

- The server will start at [http://localhost:3000](http://localhost:3000).
- Swagger documentation will be available at [http://localhost:3000/docs](http://localhost:3000/docs).
- Changes to the source code will automatically reload the server.

#### **b. Production Mode**

1. Build the application:
   ```bash
   npx tsc
   ```
   This will compile the TypeScript code into JavaScript files in the `dist` folder.
2. Start the application:
   ```bash
   npm start
   ```
   - The server will start at [http://localhost:3000](http://localhost:3000).
   - Swagger documentation will be available at [http://localhost:3000/docs](http://localhost:3000/docs).

---

### **5. Run with Docker**

#### **Getting Started**

You must have Docker installed to run this API in a Docker container. If you are unfamiliar with, or need to install it, you can reference this [Documentation](https://docs.docker.com/get-started/)

#### **a. Build the Docker Image**

```bash
npm run docker:build
```

#### **b. Run the Docker Container**

```bash
npm run docker:run
```

- The server will be accessible at [http://localhost:3000](http://localhost:3000).
- Swagger documentation will be available at [http://localhost:3000/docs](http://localhost:3000/docs).
- This [Docker Cheatsheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf) may be useful if you are not familiar with docker.

---

### **6. Run Tests**

To run all tests using Jest:

```bash
npm test
```

---

### **7. Format and Lint the Code**

#### **a. Check Code Formatting**

```bash
npm run pretty:check
```

#### **b. Automatically Fix Formatting Issues**

```bash
npm run pretty
```

#### **c. Run ESLint to Check Code Quality**

```bash
npm run lint
```

---

### **8. Application Features**

- **Health Check**: Access [http://localhost:3000/](http://localhost:3000/) to verify the application is running.
- **API Documentation**: Swagger UI is available at [http://localhost:3000/docs](http://localhost:3000/docs) with detailed API information.
- **OpenAPI Spec**: Retrieve the OpenAPI JSON spec at [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json).

---

### **Troubleshooting**

- If you encounter errors during development, check the logs output in the terminal.
- Ensure the required ports (e.g., `3000`) are not in use by other applications.
- If Docker fails to run, verify your Docker installation and ensure it is running.
- Run `docker ps` to see containers that are running and `docker stop <id>` to stop a container.
- If it seems like things aren't quite right, try re-building docker with --no-cache, sometimes the container can get stuck.

---

### **Summary of npm Scripts**

| Command                      | Description                                                    |
| ---------------------------- | -------------------------------------------------------------- |
| `npm run dev`                | Runs the application in development mode with live reloading.  |
| `npm start`                  | Runs the application in production mode.                       |
| `npm test`                   | Runs all Jest tests.                                           |
| `npm run pretty`             | Formats code using Prettier.                                   |
| `npm run lint`               | Lints the code using ESLint.                                   |
| `npm run docker:build`       | Builds a Docker image for the application.                     |
| `npm run docker:run`         | Runs the application inside a Docker container on port `3000`. |
| `npm run autocannon`         | Performs a load test. Requires a URL to be provided.           |
| `npm run autocannon:process` | Performs a load test on receipt/process endpoint.              |

---

## **Technical Decisions**

This project follows several architectural and technical decisions aimed at ensuring performance, maintainability, and scalability. Some of the key decisions include:

- **Language**: TypeScript (chosen for familiarity and static typing)
- **API Framework**: Fastify (chosen for performance, TypeScript support, and built-in schema validation)
- **Architecture**: Clean Architecture (enforces separation of concerns and testability)

For a detailed breakdown of all technical decisions, see the [TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md) file.

---

## **API Performance**

Performance benchmarks for key endpoints show high throughput and low latency, with the `receipts/points` endpoint handling 15,744 requests/second and the `receipts/process` endpoint averaging 13,964 requests/second. For more details, see [PERFORMANCE.md](./PERFORMANCE.md).

---

## **Test Coverage**

Near complete test coverage, focusing on core business logic:

- `PointsCalculator` class
- `ReceiptEntity` class
- `ReceiptService` class

But also includes interface and infrastructure classes:

- controllers
- `InMemoryReceiptRepository` class

---

### Overview

**Test Suites**: 6
**Total Tests**: 26
**Code Coverage**:

- Overall statement coverage: 98.31%
- Branch coverage: 92.1%
- Function coverage: 96.66%
- Line coverage: 98.3%


---

### **Coverage Chart**

---

### **Updated Code Coverage**

```
Coverage %   Statements    Branches   Functions    Lines
┌────────────┬─────────────┬──────────┬────────────┬──────────┐
│ Directory  │    98.31    │   92.1   │   96.66    │   98.3   │
├────────────┼─────────────┼──────────┼────────────┼──────────┤
│ Entities   │    100.00   │  100.00  │   100.00   │  100.00  │
│ Services   │    100.00   │  100.00  │   100.00   │  100.00  │
│ Utilities  │    91.66    │   70.00  │   88.88    │   91.66  │
│ Controllers│    100.00   │  100.00  │   100.00   │  100.00  │
└────────────┴─────────────┴──────────┴────────────┴──────────┘
```

---

## **Future Considerations**

- **Logging & Monitoring**: Integrate logging (`pino` Fastify's built-in logger is one option) and set up centralized logging. Implement performance monitoring.
  
- **CI/CD Workflow**: Set up a GitHub Actions workflow for automated testing, linting, building Docker images, and deploying to staging/production environments.

- **Security Enhancements**:
  - **CORS**: Fastify offers `@fastify/cors` to restrict API access to trusted domains.
  - **HTTP Headers**: Fastify offers `@fastify/helmet` to protect http headers.
  - **Rate Limiting**: Fastify offers `@fastify/rate-limit` to prevent abuse and DoS attacks.
  - **JWT Authentication**: Fastify offers `@fastify/jwt` for user authentication.

--- 
