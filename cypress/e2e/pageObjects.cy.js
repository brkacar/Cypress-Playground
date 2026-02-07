/// <reference types="cypress" />

import { onDatepickerPage } from "../page-objects/datepickerPage"
import { onFormsLayoutsPage } from "../page-objects/formsLayoutsPage"
import { navigateTo } from "../page-objects/navigationPage"


beforeEach('Open application', () => {
    cy.openHomePage()  //invisible for intellisense
})

it('navigation tests', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.toastrPage()
    navigateTo.tooltipPage()

})

it.only('test with page objects', () => {
    navigateTo.formLayoutsPage()
    onFormsLayoutsPage.submitUsingTheGridForm('test@test.com', 'password', 1)
    onFormsLayoutsPage.submitBasicForm('test@test.com', 'password', true)

    navigateTo.datepickerPage()
    onDatepickerPage.selectCommonDatepickerDateFromToday(10)
    onDatepickerPage.selectRangePickerDateFromToday(5, 15)
  

    

})