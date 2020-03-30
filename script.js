// get the heading element
const headingEl = document.querySelector("#headingTotal");

// get the desc element
const inputDescEl = document.querySelector("#inputDesc");

//refernce to input amount
const inputElement = document.querySelector("#inputAmount");

//get the reference to table
const expenseTableEl = document.querySelector("#expenseTable");

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

  //convert it to number
  const expense = parseInt(textAmount, 10);

  //put it in object
  expenseItem.desc = textDesc;
  expenseItem.amount = expense;
  expenseItem.moment = new Date();

  allExpenses.push(expenseItem);

  //add that value to totalExpense
  totalExpense = totalExpense + expense;

  // set the heading element to totalExpense
  const someText = `Total : ${totalExpense}`;
  headingEl.textContent = someText;

  renderList(allExpenses);

}

//get the button element
const element = document.querySelector("#btnAddExpense");

//listen to click event
element.addEventListener("click", addExpenseToTotal, false);

//controller function -- formatting of date
function getDateString(moment){

       return moment.toLocaleDateString('en-US', 
        {
            year:'numeric',
            month:'long',
            day:'numeric'
        })

}

//controller function -- delete Items
function deleteItem(dateValue){
    const newArr = [];

    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].moment.valueOf() !== dateValue) {
            newArr.push(allExpenses[i]);
        }
        
    }

    renderList(newArr);

}

//view -- getting the updated array
function renderList(arrOfList){

    const allExpenseHTML = arrOfList.map(expense => createListItem(expense));
    const joinedAllExpenseHTML = allExpenseHTML.join("");
    expenseTableEl.innerHTML = joinedAllExpenseHTML;

}

//view layer --creating list item
function createListItem({desc,amount,moment}){

    return `
        
        <li class="list-group-item d-flex justify-content-between">
            <div class="d-flex flex-column">
                    ${desc}
                <small class="text-muted">${getDateString(moment)}
                </small>
            </div>
            <div>
                <span class="px-5">
                    ${amount}
                </span>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteItem(${moment.valueOf()})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </li>
        
        `;

}
