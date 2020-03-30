
// get the heading element
const headingEl = document.querySelector('#headingTotal');

// get the desc element
const inputDescEl = document.querySelector('#inputDesc');

//refernce to input amount
const inputElement = document.querySelector('#inputAmount');

//get the reference to table
const expenseTableEl = document.querySelector('#expenseTable');

// init value of expense at 0
let totalExpense = 0;

// set the heading element to totalExpense
headingEl.textContent = totalExpense;

//allExpenses at one place
const allExpenses = [];

//onButtonClick add inputAmount to totalExpense

function addExpenseToTotal() {

    const expenseItem = {};

    //read value from inputAmount
    const textAmount = inputElement.value;

    //read desc from inputDesc
    const textDesc = inputDescEl.value;

    console.log({textDesc,textAmount});

    //convert it to number
    const expense = parseInt(textAmount, 10);

    //put it in object
    expenseItem.desc = textDesc;
    expenseItem.amount = expense;

    allExpenses.push(expenseItem);

    console.clear();
    console.table(allExpenses);

    //add that value to totalExpense
    totalExpense = totalExpense + expense;

    // set the heading element to totalExpense
    const someText = `Total : ${totalExpense}`;
    headingEl.textContent = someText;


    const allExpenseHTML = allExpenses.map(expense => {
        return `<div>${expense.amount} :: ${expense.desc}</div>`
    });

    const joinedAllExpenseHTML = allExpenseHTML.join("");


    expenseTableEl.innerHTML = joinedAllExpenseHTML;
}


//get the button element            
const element = document.querySelector("#btnAddExpense");

//listen to click event
element.addEventListener("click", addExpenseToTotal, false);

