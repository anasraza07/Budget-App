const budgetDashboard = document.getElementById("budget-amount");
const expenseDashboard = document.getElementById("expense-amount");
const balanceDashboard = document.getElementById("balance-amount");

const budgetValue = document.getElementById("budget-value");
const budgetButton = document.getElementById("budget-button");

const expenseCategory = document.getElementById("expense-category-value");
const expenseDescription = document.getElementById("expense-description-value");
const expenseAmount = document.getElementById("expense-amount-value");
const expenseDate = document.getElementById("expense-date-value");
const expenseButton = document.getElementById("expense-button");

const table = document.getElementById("expense-table");
const tbody = document.getElementById("table-tbody");

let totalExpense = 0;

// Budget Dashboard
budgetButton.addEventListener("click", () => {
    if (budgetValue.value === "") {
        budgetDashboard.innerText = "00"
    }
    else {
        budgetDashboard.innerText = budgetValue.value;
    }
    showBalance();
})

// Balance Dashboard
const showBalance = () => {
    // let balance = 0;
    balanceDashboard.innerText = budgetDashboard.innerText - expenseDashboard.innerText;
}

// Taking input from user
let expenseList = [];
expenseButton.addEventListener("click", () => {
    const categoryQuery = expenseCategory.value;
    const descriptionQuery = expenseDescription.value;
    const amountQuery = +expenseAmount.value;
    const dateQuery = expenseDate.value;

    let expenseObj = {
        categoryQuery,
        descriptionQuery,
        amountQuery,
        dateQuery
    }
    expenseList.push(expenseObj)

    expenseCategory.value = "";
    expenseDescription.value = "";
    expenseAmount.value = "";
    expenseDate.value = "";
    displayExpense(expenseObj);
    showExpense();
})

// Expense Dashboard
const showExpense = () => {
    let sum = 0;
    expenseList.forEach((obj) => {
        sum += obj.amountQuery;
    })
    if (sum === 0) {
        expenseDashboard.innerText = "00";
    }
    else {
        expenseDashboard.innerText = sum
        showBalance();
        // console.log(sum)
    }
}

// Displaying expenses
const displayExpense = (expenseObj) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.setAttribute("id", "firstData")
    td.innerHTML = `<div class="m-0">${expenseObj.categoryQuery}</div>
    <p class="m-0" id="date">${expenseObj.dateQuery}</p>`
    tr.appendChild(td);

    const td1 = document.createElement("td");
    td1.innerHTML = `<div>$${expenseObj.amountQuery}</div>`
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerHTML = `<button class="edit" id="edit-btn">Edit</button>
    <button class="delete" id="delete-btn">Delete</button>`
    tr.appendChild(td2);

    tbody.appendChild(tr);
    console.log(expenseList)
}


//     document.getElementById("edit-btn").addEventListener("click", editButton)

// const editButton = (e, expenseList) => {
//     // let elem = e.target.parentNode;
//     const edit = (elem) => {
//         console.log(expenseList);
//     }
//     edit()

//     // console.log(expenseList.indexOf(elem))
// }


