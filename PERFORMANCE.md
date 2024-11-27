# **API Performance**

Performance benchmarking results using **AutoCannon** to assess the scalability and reliability of key endpoints.

### **Goals**

- Validate the API's ability to handle concurrent requests under moderate traffic.
- Identify latency and throughput benchmarks for optimization.
- Ensure consistent performance across different endpoints.

---

### **Summary of npm Scripts**

| Command                      | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| `npm run autocannon`         | Performs a load test. Requires a URL to be provided. |
| `npm run autocannon:process` | Performs a load test on receipt/process endpoint.    |

---

#### Endpoint:

`http://localhost:3000/v1/receipts/278cfda7-caec-44b4-9bc8-23535aa339fd/points`

#### Configuration:

- **Connections**: 10
- **Duration**: 20 seconds

The above configuration is set with a default script in package.json. You can run it like this:

```bash
npm run autocannon <url>
```

---

#### Summary:

| **Metric**       | **2.5%** | **50% (Median)** | **97.5%** | **99%** | **Average** | **Std Dev** | **Max** |
| ---------------- | -------- | ---------------- | --------- | ------- | ----------- | ----------- | ------- |
| **Latency (ms)** | 0        | 0                | 1         | 1       | 0.09        | 0.31        | 12      |

| **Metric**    | **1%**  | **2.5%** | **50% (Median)** | **97.5%** | **Average** | **Std Dev** | **Min** |
| ------------- | ------- | -------- | ---------------- | --------- | ----------- | ----------- | ------- |
| **Req/Sec**   | 12,943  | 12,943   | 15,943           | 16,247    | 15,744.4    | 711.67      | 12,943  |
| **Bytes/Sec** | 2.38 MB | 2.38 MB  | 2.93 MB          | 2.99 MB   | 2.9 MB      | 131 kB      | 2.38 MB |

#### **Requests and Data:**

- **Total Requests**: 315,000
- **Total Data Read**: 57.9 MB
- **Samples**: 20 (1 per second)

---

### **Key Observations**:

- Processed approximately **15,744 requests/second** on average with minimal deviation.
- Handled a peak of **16,247 requests/second**.

---

### Endpoint:

`http://localhost:3000/v1/receipts/process`

#### Configuration:

- **Connections**: 10
- **Duration**: 20 seconds

The above configuration is set with a default script in `package.json`. You can run it like this:

```bash
npm run autocannon:process
```

---

### Summary:

| **Metric**       | **2.5%** | **50% (Median)** | **97.5%** | **99%** | **Average** | **Std Dev** | **Max** |
| ---------------- | -------- | ---------------- | --------- | ------- | ----------- | ----------- | ------- |
| **Latency (ms)** | 0        | 0                | 1         | 2       | 0.16        | 0.64        | 41      |

| **Metric**    | **1%**  | **2.5%** | **50% (Median)** | **97.5%** | **Average** | **Std Dev** | **Min** |
| ------------- | ------- | -------- | ---------------- | --------- | ----------- | ----------- | ------- |
| **Req/Sec**   | 7,707   | 7,707    | 14,903           | 15,927    | 13,963.9    | 2,295.56    | 7,707   |
| **Bytes/Sec** | 2.07 MB | 2.07 MB  | 4.01 MB          | 4.28 MB   | 3.76 MB     | 617 kB      | 2.07 MB |

#### **Requests and Data:**

- **Total Requests**: 279,271
- **Total Data Read**: 75.1 MB
- **Samples**: 20 (1 per second)

---

### **Key Observations**:

- Processed approximately **13,963 requests/second** on average with some variance.
- Handled a peak of **15,927 requests/second**.
- **Bytes/Sec** averaged **3.76 MB/s**.

#### **Next Steps**:

- Consider increasing concurrency or duration to simulate higher traffic volumes.
- Monitor the system's resource usage (e.g., CPU, memory) during peak load for further optimization and scaling strategies.
