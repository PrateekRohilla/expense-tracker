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
let savedArr = [];

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

  //store the array in local storage
  storeData(expenseItem, totalExpense);

  document.querySelector('#inputAmount').value='';
  document.querySelector('#inputDesc').value='';

  //display added items in expenseTable
  renderList(allExpenses);

}

// storing the data in local  storage
function storeData(expenseItem){
    savedArr.push(expenseItem);
    localStorage.setItem('saved', JSON.stringify(savedArr));
    localStorage.setItem('total', totalExpense);
}

// on load function called to restore the state of app on page
// refresh/reload or closed and reopened
window.onload = function(){
    if(localStorage.getItem('saved') === null){
        console.log('original state');
        return;
    }
    let arr = JSON.parse(localStorage.getItem('saved'));
    arr.map(a => {
        let dt = new Date(a.moment);
        a.moment = dt;
        savedArr.push(a);
    });

    let totExp = parseInt(localStorage.getItem('total'));
    allExpenses = savedArr;
    renderList(allExpenses);
    renderTotal(totExp);
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

// delete items
function deleteItem(dateValue){
    savedArr = [];
    allExpenses = allExpenses.filter((expense) => {
    if(expense.moment.valueOf() !== dateValue){
        storeData(expense);
        return expense;
    }
    });
    if(savedArr.length === 0){
        localStorage.removeItem('saved');
        localStorage.removeItem('total');
    }
    renderList(allExpenses);
    newTotal(allExpenses);
}

// new total called to display new value of total on deletion of list items
function newTotal(expenses){
    let sum = 0;
    for(let i=0; i<expenses.length; i++){
        sum = sum + expenses[i].amount;
    }
    totalExpense = sum;
    localStorage.setItem('total', sum);
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
