# Stage 1: Build the React application
FROM node:alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:1.21.6-alpine

# Copy the built React app from the builder stage to Nginx's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 1200
EXPOSE 5173

# Update Nginx configuration to listen on port 5173
RUN sed -i 's/listen       80;/listen       5173;/g' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]