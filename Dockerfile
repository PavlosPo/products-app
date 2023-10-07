# OS
FROM node:18

# Create the working Directory ( Linux )
WORKDIR /usr/src/app  

# Get the .json files 
COPY package*.json ./ 

# Install the libraries read by package.json
RUN npm install

# Get the rest of the fileas and save them 
COPY . .

# Open the PORT 3000 for us to use it
EXPOSE 3000

# RUN THE APPLICATION (with script 'start')
CMD ["npm", "run", "start"] 