const budgetDashboard = document.getElementById("budget-amount");
const expenseDashboard = document.getElementById("expense-amount");
const balanceDashboard = document.getElementById("balance-amount");

const budgetValue = document.getElementById("budget-value");
const budgetButton = document.getElementById("budget-button");

const expenseCategory = document.getElementById("expense-category-value");
const expenseDescription = document.getElementById("expense-description-value");
const expenseAmount = document.getElementById("expense-amount-value");
const expenseDate = document.getElementById("expense-date-value");
const expenseBtn = document.getElementById("expense-button");

const table = document.getElementById("expense-table");
const tbody = document.getElementById("table-tbody");

let expenseList = []
// displayExpense();
// displayExpense();
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

// Balance Dashboard
const showBalance = () => {
    // let balance = 0;
    balanceDashboard.innerText = budgetDashboard.innerText - expenseDashboard.innerText;
}

// Taking input from user
// let expenseList = [];
expenseBtn.addEventListener("click", () => {
    const categoryQuery = expenseCategory.value;
    const descriptionQuery = expenseDescription.value;
    const amountQuery = +expenseAmount.value;
    const dateQuery = expenseDate.value;

    let expenseObj = {
        categoryQuery,
        descriptionQuery,
        amountQuery,
        dateQuery,
        // isEdit: false,
        isDeleted: false
    }
    expenseList.push(expenseObj)

    displayExpense();
    showExpense();

    expenseCategory.value = "";
    expenseDescription.value = "";
    expenseAmount.value = "";
    expenseDate.value = "";
})

// Displaying expenses
// var currObj;
function displayExpense() {
    // console.log(expenseList)
    let tbodyHtml = '';
    expenseList.forEach((obj, index) => {
        // console.log(obj.categoryVal  )
        tbodyHtml += `
        <tr>
                <td>${index + 1}</td>
                <td id="firstData">
                    <div class="m-0">${obj.categoryQuery}</div>
                    <p class="m-0" id="date">${obj.dateQuery}</p>
                </td>
                <td>${obj.amountQuery}</td>
                <td><button class="edit btn" id="edit">Edit
                </button>
                                <button class="delete btn" id="delete">Delete</button>
                </td>
            </tr>
        `
        tbody.innerHTML = tbodyHtml;
        document.querySelectorAll("#edit").forEach((n) => {
            n.addEventListener('click', (event) => {
                // console.log(event, index)
                let storedCategory = event.target.parentNode.previousElementSibling.previousElementSibling.firstChild.nextSibling.innerText,
                    storedAmount = event.target.parentNode.previousElementSibling.innerText,
                    storedDate = event.target.parentNode.previousElementSibling.previousElementSibling.firstChild.nextSibling.nextSibling.nextSibling.innerText;

                event.target.parentNode.parentNode.remove()
                expenseList.splice(index)
                expenseCategory.value = storedCategory;
                expenseDescription.value = storedCategory;
                expenseAmount.value = storedAmount;
                expenseDate.value = storedDate;
                displayExpense()
                // console.log(index)
            })

            document.querySelectorAll("#delete").forEach((n) => {
                n.addEventListener('click', (event) => {

                    event.target.parentNode.parentNode.remove()
                    expenseList.splice(index)
                    displayExpense()
                })
            })
            // console.log(expenseObj.categoryQuery)
            //     const tr = document.createElement("tr");
            //     const td = document.createElement("td");
            //     td.setAttribute("id", "firstData")
            //     td.innerHTML = `<div class="m-0">${obj.categoryQuery}</div>
            // <p class="m-0" id="date">${obj.dateQuery}</p>`
            //     tr.appendChild(td);

            //     const td1 = document.createElement("td");
            //     td1.innerHTML = `<div>$${obj.amountQuery}</div>`
            //     tr.appendChild(td1);

            //     const td2 = document.createElement("td");
            //     td2.innerHTML = `<button class="edit" id="edit-btn">Edit</button>
            // <button class="delete" id="delete-btn" onclick="deleteBtn(${obj.isDeleted})">Delete</button>`
            //     tr.appendChild(td2);

            //     tbody.appendChild(tr);
        })
    }
    )
}

