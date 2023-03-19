// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', function ({ username, password }) {
  cy.request('POST', 'http://localhost:3003/api/login', { username, password }).then(({ body }) => {
    localStorage.setItem('loggedInUserJSON', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createUser', function (username, password) {
  const user = {
    username,
    password,
  };
  cy.request('POST', 'http://localhost:3003/api/users', user);
});

Cypress.Commands.add('createBlog', function (title) {
  const user = localStorage.getItem('loggedInUserJSON');
  const newBlog = {
    title,
    author: 'author',
    url: 'www.example.com',
  };
  const request = {
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: newBlog,
    headers: {
      Authorization: 'Bearer ' + JSON.parse(user).token,
    },
  };

  cy.request(request).then(() => {
    cy.visit('http://localhost:3000');
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
