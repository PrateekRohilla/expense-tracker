
// get the heading element
const headingEl = document.querySelector('#headingTotal');


// init value of expense at 0
let totalExpense = 0;

// set the heading element to totalExpense
headingEl.textContent = totalExpense;

//onButtonClick add inputAmount to totalExpense

function addExpenseToTotal() {
    //read value from inputAmount
    const inputElement = document.querySelector('#inputAmount');
    const textAmount = inputElement.value;


    //convert it to number
    const expense = parseInt(textAmount, 10);

    //add that value to totalExpense
    totalExpense = totalExpense + expense;

    // set the heading element to totalExpense
    headingEl.textContent = totalExpense;
}


//get the button element            
const element = document.querySelector("#btnAddExpense");

//listen to click event
element.addEventListener("click", addExpenseToTotal, false);
