describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser('tester', 'password');
    cy.visit('http://localhost:3000');
  });

  describe('User not logged in', () => {
    it('shows the login form by default', function () {
      cy.contains('login to application');
      cy.get('input[name="username"]');
      cy.get('input[name="password"]');
    });

    it('should login a user with correct credentials', function () {
      cy.login({ username: 'tester', password: 'password' });
      cy.contains('blogs');
    });

    it('should not login user with incorrect credentials and show error notification', function () {
      cy.get('input[name="username"]').type('tester');
      cy.get('input[name="password"]').type('wrong');
      cy.contains('submit').click();
      cy.contains('login to application');
      cy.get('[data-cy="notification"]')
        .should('contain', 'invalid username or password')
        .and('have.css', 'background-color', 'rgb(220, 38, 38)');
    });
  });

  describe('User logged in', () => {
    it('a blog can be created', function () {
      const newBlog = {
        title: 'new blog',
        author: 'tester',
        url: 'www.example.com',
      };
      cy.login({ username: 'tester', password: 'password' });
      cy.contains('new blog').click();
      cy.get('input[name="title"]').type(newBlog.title);
      cy.get('input[name="author"]').type(newBlog.author);
      cy.get('input[name="url"]').type(newBlog.url);
      cy.get('button').contains('create').click();
      cy.contains(newBlog.title);
      cy.contains(newBlog.author);
    });

    it('a blog can be liked', function () {
      cy.login({ username: 'tester', password: 'password' });
      cy.createBlog();
      cy.contains('View').click();
      cy.get('.likes-count').contains('0');
      cy.get('.like-button').click();
      cy.get('.likes-count').contains('1');
    });

    it('a user can delete blogs they create', function () {
      cy.login({ username: 'tester', password: 'password' });
      cy.createBlog('test');
      cy.contains('View').click();
      cy.contains('Remove').click();
      cy.get('[data-cy="notification"]')
        .should('contain', 'Blog deleted successfully')
        .and('have.css', 'background-color', 'rgb(34, 197, 94)');
    });

    it('a user only sees remove option for their blogs', function () {
      // user can view remove button for thier blogs
      cy.createUser('tester2', 'password');
      cy.login({ username: 'tester2', password: 'password' });
      cy.createBlog('test');
      cy.contains('View').click();
      cy.get('[data-cy="remove-button"]').should('exist');

      cy.contains('logout').click();
      cy.login({ username: 'tester', password: 'password' });
      cy.contains('View').click();
      cy.get('[data-cy="remove-button"]').should('not.exist');
    });

    it.only('should list blogs in order of most likes', function () {
      cy.login({ username: 'tester', password: 'password' });
      // create 2 blogs
      cy.createBlog('second most likes');
      cy.createBlog('most likes');
      // like second blog w/ title "most likes"
      cy.get('[data-cy="blog"]')
        .eq(1)
        .contains('View')
        .click()
        .get('[data-cy="like-button"]')
        .click();
      // verify blog is liked
      cy.get('[data-cy="likes-count"]').should('contain', '1');
      // add another like
      cy.get('[data-cy="like-button"]').click();
      // verify blog at top of list is correct
      cy.get('[data-cy="blog-header"] > h3')
        .eq(0)
        .should(($h3) => {
          expect($h3.text()).to.equal('most likes');
        });
    });
  });
});
