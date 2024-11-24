# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript
RUN npx tsc

# Expose the port the app will run on
EXPOSE 3000

# Run the compiled server file (from dist folder)
CMD ["node", "dist/server.js"]
