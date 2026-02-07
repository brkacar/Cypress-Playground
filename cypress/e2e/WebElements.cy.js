/// <reference types="cypress" />

describe('The First Test Suite', () => {

    beforeEach('Open application',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    })

    it('Locator Syntax', () => {

        //by tag
        cy.get('input')

        //by id
        cy.get('#inputFirstName').type('John')
        cy.get('#inputFirstName').should('have.value', 'John')

        //by class  
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[placeholder="Email"]').should('exist')

        //by attribute name and value
        cy.get('[placeholder="Email"][type="email"]')

        //by custom attribute
        cy.get('[data-cy="inputEmail1"]')

        //by tag and attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][fullwidth]')



    })

    it('Cpress Locator Methods Find and Contains', () => {
        //Theory: 
        // get : to find elements in the entire page
        // find : to find only child elements (within another element)
        // contains: to find web elements by text 

        cy.contains('Sign in')
        cy.contains('Sign In', { matchCase: false }) //case insensitive
        cy.contains('[status="warning"]', 'Sign in') //by attribute and text
        cy.contains('nb-card', 'Horizontal form').find('button') //find button only in this card
        cy.contains('nb-card', 'Horizontal form').contains('Sign in') //find text only in this card
        cy.contains('nb-card', 'Horizontal form').get('button') //get button in the entire page


    })

    it('Child Elements', () => {

        cy.contains('nb-card', 'Using the Grid').find('.row').find('button')

        cy.get('nb-card').find('nb-radio-group').contains('Option 1')

        cy.get('nb-card nb-radio-group').contains('Option 1')  //the same as above but better, descendant any child

        cy.get('nb-card > nb-card-body [placeholder="Jane Doe"]')  //direct child
    })

    it('Parent Elements', () => {

        cy.get('#inputEmail1').parents('form').find('button')

        cy.contains('Using the Grid').parent().find('button')

        cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button') //all parents until nb-card-body  just below it
    })

    it('Cypress Chains', () => {
        cy.get('#inputEmail1')
            .parents('form')
            .find('button')
            .click()

        cy.get('#inputEmail1')
            .parents('form')
            .find('nb-radio')
            .first()
            .should('have.text', 'Option 1')
    })

    it('Reusing Locators', () => {

        //THIS WILL NOT WORK!!! DON"T DO LIKE THIS!!!
        //const inputEmail1 = cy.get('#inputEmail1')
        //inputEmail1.parents('form').find('button')
        //inputEmail1.parents('form').find('nb-radio')

        // 1. Cypress Alias - using as() method
        cy.get('#inputEmail1').as('inputEmail1')
        cy.get('@inputEmail1').parents('form').find('button')
        cy.get('@inputEmail1').parents('form').find('nb-radio')

        // 2. Cypress then() method to work with jQuery elements

        cy.get('#inputEmail1').then(inputEmail => {
            cy.wrap(inputEmail).parents('form').find('button')
            cy.wrap(inputEmail).parents('form').find('nb-radio')
            cy.wrap('Hello').should('equal', 'Hello')
            cy.wrap(inputEmail).as('inputEmail2')
        })

        cy.get('@inputEmail2').click()

    })

    it('Extracting Values', () => {
        // 1. using a JQuery method
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const emailLabel = label.text()
            console.log(emailLabel)
        })

        // 2. Using invoke command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
            console.log(emailLabel)
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('emailLabel')
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 3. Invoke attribute value
        cy.get('#exampleInputEmail1').invoke('attr', 'class').then(classValue => {
            console.log(classValue)
        })
        cy.get('#exampleInputEmail1').should('have.attr', 'class', 'input-full-width size-medium status-basic shape-rectangle nb-transition')

        // 4. Invoke input field value
        cy.get('#exampleInputEmail1').type('hello@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').then(value => {
            console.log(value)
        })

    })

    it('Assertions', () => {

        cy.get('[for="exampleInputEmail1"]').should('have.text', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label).to.have.text('Email address')
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
            expect(emailLabel).to.equal('Email address')
            cy.wrap(emailLabel).should('equal', 'Email address')
        })

    })


    it('Timeouts', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Dialog').click()

        cy.contains('Open with delay 10 seconds').click()
        cy.get('nb-dialog-container nb-card-header', { timeout: 11000 })
            .should('have.text', 'Friendly reminder')
    })
})