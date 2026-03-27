# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR  /src

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

#SET ENV variables
ENV PORT=5050

# Expose the port that the application will run on
EXPOSE 5050

# Run the application when the container starts
CMD ["npm", "start"]