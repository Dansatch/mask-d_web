# Official Node.js LTS image as base for building the frontend
FROM node:16.20.2-alpine3.18

# Create and set user and working directory in the container
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port to allow outside access to the frontend
EXPOSE 5173 

# Command to start the vite server
CMD ["npm", "run", "dev"]
