Cypress.on('uncaught:exception', (err) => {
    console.error('Error:', err.message);
    return false;
});

describe('No Viewport', () => {

    const baseUrl = 'https://en.wikipedia.org/wiki/Master_of_Reality'; // Define the webpage being tested
  
    // Custom command to scroll slowly until reaching the bottom of the page
    Cypress.Commands.add('scrollSlowly', () => {
      function scrollToBottom() {
        cy.window().then((win) => {
          const currentScroll = win.scrollY;
          const maxScroll = win.document.documentElement.scrollHeight - win.innerHeight;
          
          if (currentScroll < maxScroll) {
            win.scrollBy(0, 150); // Scroll by small increments
            cy.wait(50); // Wait a short period between scroll steps
            scrollToBottom(); // Recursive call to continue scrolling
          }
        });
      }
  
      scrollToBottom(); // Start the scrolling process
    });
  
    it('Default screen size', () => {
      cy.viewport(1920, 1080);
      cy.visit(baseUrl).wait(1000);
      cy.scrollSlowly(); // Scroll to the bottom
      cy.wait(1000);
    });
  
    it('Single test', () => {
      cy.viewport(640, 480);
      cy.visit(baseUrl).wait(1000);
      cy.scrollSlowly(); // Scroll to the bottom
      cy.wait(1000);
    });
  
    it('Check URL', () => {
      const presents = ['macbook-15', 'samsung-note9', 'ipad-mini', 'iphone-xr'];
      presents.forEach((device) => {
        cy.viewport(device);
        cy.visit(baseUrl);
        cy.scrollSlowly(); // Scroll to the bottom
        cy.wait(1000);
      });
    });
  
    it('Check orientation', () => {
      cy.viewport('samsung-note9', 'landscape');
      cy.visit(baseUrl);
      cy.scrollSlowly(); // Scroll to the bottom
      cy.viewport('samsung-note9', 'portrait');
      cy.visit(baseUrl);
      cy.scrollSlowly(); // Scroll to the bottom
      cy.wait(1000);
    });
  
    it('Single test', () => {
      cy.viewport(640, 480);
      cy.visit(baseUrl);
      cy.scrollSlowly(); // Scroll to the bottom
      cy.wait(1000);
    });
  
  });
  
