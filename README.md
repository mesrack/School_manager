# School_manager

This project consists of creating an intranet site to allow administrators to manage a primary school.
An authorization system will be created to differentiate a teacher from a school head or an administrator

Here is a list of the tools I use in this project:

- Pencil: digital model or pencil paper
- Git : for version management
- JMerise: for data design models
- VisualParadigme: class, use case and sequence diagrams that I would be led to make.
- Trello: my todolist = https://trello.com/b/GJptecb8/projet-gestionnaire-scolaire

I use NodeJs server side and Express client side. I implement Passport.js to authenticate the user.

To compile the code, you will have to install npm and nodejs : https://www.npmjs.com/get-npm  

With the node command prompt, move the source folder of the code and use this command : `npm install`  
This will have the effect of loading all the dependencies contained in the file package.json

You can now run this code with this command : `npm run devStart`.

All you have to do is go to your favorite browser and go to the site: `localhost: 8080`

by default the server listens on port 8080.
It is possible to change it in the server.js folder