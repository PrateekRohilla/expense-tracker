//get reference to the elements
const headingEl = document.querySelector("#headingTotal");
const inputDescEl = document.querySelector("#inputDesc");
const inputElement = document.querySelector("#inputAmount");
const expenseTableEl = document.querySelector("#expenseTable");
const element = document.querySelector("#btnAddExpense");

// init value of expense at 0
let totalExpense = 0;
headingEl.textContent = totalExpense;
renderTotal(totalExpense);

//allExpenses at one place
let allExpenses = [];
let newArr = [];

//onButtonClick add inputAmount to totalExpense
function addExpenseToTotal() {
  
  //obj for storing expense item
  const expenseItem = {};

  //read value from inputs
  const textAmount = inputElement.value;
  const textDesc = inputDescEl.value;

  //convert it to number
  const expense = parseInt(textAmount, 10);

  //add value to totalExpense
  totalExpense = totalExpense + expense;
  renderTotal(totalExpense);

  //put it in object
  expenseItem.desc = textDesc;
  expenseItem.amount = expense;
  expenseItem.moment = new Date();

  //store object in array
  allExpenses.push(expenseItem);

  document.querySelector('#inputAmount').value='';
  document.querySelector('#inputDesc').value='';

  //display added items in expenseTable
  renderList(allExpenses);

}

//listen to click event on add button
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

//Delete items
function deleteItem(dateValue){
    newArr=[];
    allExpenses=allExpenses.filter((expense)=>
    {if(expense.moment.valueOf()!==dateValue){
        return expense;
    }
    });
    newTotal(allExpenses);
    renderList(allExpenses);
    
}

//new total function to display new value of total on deletion of list items
function newTotal(expenses){
let sum=0;
for(let i=0;i<expenses.length;i++){
    sum=sum+allExpenses[i].amount;
}
totalExpense=sum;
renderTotal(sum);
}

// render total in nav bar
function renderTotal(totalExpense){
    const someText=`Total : ${totalExpense}`;
    headingEl.textContent=someText;

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
