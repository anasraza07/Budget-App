// Step 01
const budgetDashboard = document.getElementById("total-budget");
const expenseDashboard = document.getElementById("total-expense");
const balanceDashboard = document.getElementById("total-balance");

const budgetValue = document.getElementById("budget-value");
const budgetForm = document.querySelector(".budget-form");

const expenseCategory = document.getElementById("select-category");
const expenseDescription = document.getElementById("expense-description-value");
const expenseAmount = document.getElementById("expense-amount-value");
const expenseDate = document.getElementById("expense-date-value");

const expenseBtn = document.getElementById("expense-button");

// const table = document.getElementById("expense-table");
const thead = document.getElementById("table-thead");
const tbody = document.getElementById("table-tbody");

// // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const categories = ["Housing", "Transportation", "Food", "Utilities", "Insurance", "Medical", "Saving", "Personal", "Entertainment", "Other"]
categories.forEach(category => {
    const option = document.createElement("option");
    option.textContent = category;
    expenseCategory.appendChild(option);
})

const expenseList = JSON.parse(localStorage.getItem('expense-list')) || [];
// let totalExpense = 0;
// budgetDashboard.innerText = "00";
// expenseDashboard.innerText = "00";
// balanceDashboard.innerText = "00";

function updateLocalStorage() {
    localStorage.setItem('expense-list', JSON.stringify(expenseList));
};

// Budget Dashboard
budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (budgetValue.value === "") {
        budgetDashboard.innerText = "00";
    }
    else {
        budgetDashboard.innerText = budgetValue.value;
        budgetValue.value = "";
    }
    // showBalance();
});

// // Expense Dashboard
// const showExpense = () => {
//     let sum = 0;
//     expenseList.forEach((obj) => {
//         sum += obj.amountQuery;
//     })
//     if (sum === 0) {
//         expenseDashboard.innerText = "00";
//     }
//     else {
//         expenseDashboard.innerText = `${sum} `
//     }
//     showBalance();
// }

// // Balance Dashboard
// const showBalance = () => {
//     // let balance = 0;
//     if (budgetDashboard.innerText === "00" && expenseDashboard.innerText === "00") {
//         balanceDashboard.innerText = budgetDashboard.innerText;
//     }
//     else {
//         balanceDashboard.innerText = budgetDashboard.innerText - expenseDashboard.innerText;
//     }
// }

// Taking input from user
expenseBtn.addEventListener("click", () => {
    const categoryQuery = expenseCategory.value;
    const descriptionQuery = expenseDescription.value;
    const amountQuery = Number(expenseAmount.value);
    let dateQuery = expenseDate.value;
    dateQuery = new Date(dateQuery).toDateString().slice(4);

    // console.log(categoryQuery, descriptionQuery, amountQuery, dateQuery);

    // const yearOnly = new Date(`"${longDateQuery}"`).getFullYear();
    // const monthOnly = months[new Date(`"${longDateQuery}"`).getMonth()];
    // let dateOnly = new Date(`"${longDateQuery}"`).getDate();
    // dateOnly < 10 ? dateOnly = "0" + dateOnly : dateOnly;

    if (categoryQuery === "" || descriptionQuery === "" || amountQuery === "" || dateQuery === "") {
        const warningElem = document.getElementById("warning");
        warningElem.style.visibility = "visible";
        setTimeout(() => {
            warningElem.style.visibility = "hidden";
        }, 3000)
        return;
    }

    let expenseObj = {
        categoryQuery,
        descriptionQuery,
        amountQuery,
        dateQuery,
    };
    expenseList.push(expenseObj);
    updateLocalStorage();

    displayExpenseTable();
    // showExpense();

    expenseCategory.value = "";
    expenseDescription.value = "";
    expenseAmount.value = "";
    expenseDate.value = "";
});

// Displaying expenses
function displayExpenseTable() {
    thead.innerHTML = `
        <tr>
            <th>S.no.</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Buttons</th>
        </tr>`;

    if (expenseList.length === 0) {
        thead.innerHTML = "";
    };

    let tbodyHtml = '';
    expenseList.forEach((expenseObj, index) => {
        tbodyHtml += `
            <tr>
                <td>${index + 1}.</td>
                <td>${expenseObj.categoryQuery}</td>
                <td id="firstData">
                    <div>${expenseObj.descriptionQuery}</div>
                    <p>${expenseObj.dateQuery}</p>
                </td>
                <td>$${expenseObj.amountQuery}</td>
                <td>
                    <img src="./img/edit.png" id="edit" class="actionsImg" data-expense-id="${index}">
                    <img src="./img/delete.png" id="delete" class="actionsImg" data-expense-id="${index}">
                </td>
            </tr>`;
    })
    tbody.innerHTML = tbodyHtml;

    //     // Edit And Delete Functionality
    document.querySelectorAll("#edit").forEach((editBtn) => {
        editBtn.addEventListener('click', () => {
            const { expenseId } = editBtn.dataset;
            const currentObject = expenseList[expenseId];
            const { categoryQuery,
                descriptionQuery, amountQuery, dateQuery } = currentObject;

            // let storedCategory = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
            // let storedDescription = event.target.parentNode.previousElementSibling.previousElementSibling.firstChild.nextSibling.innerText;
            // let storedAmount = event.target.parentNode.previousElementSibling.innerText
            // storedAmount = storedAmount.slice(1)
            // storedDate = event.target.parentNode.previousElementSibling.previousElementSibling.firstChild.nextSibling.nextSibling.nextSibling.innerText;

            // let indexOfCurrObj = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText - 1

            expenseCategory.value = categoryQuery;
            expenseDescription.value = descriptionQuery;
            expenseAmount.value = amountQuery;
            expenseDate.value = formatDate(new Date(dateQuery));
            // expenseBtn.innerText = "SAVE";
            // expenseBtn.style.backgroundColor = "#fff";
            // expenseBtn.style.color = "#1c3e7d";
            // expenseBtn.style.border = "2px solid #1c3e7d";
            // expenseBtn
            // event.target.parentNode.parentNode.remove()
            // expenseList.splice(expenseId, 1);
            // const expenseInput = document.getElementById("expense-input");
            // expenseInput.scrollIntoView()
            displayExpenseTable()
            // showExpense()
            // if (expenseList.length === 0) {
            //     thead.innerHTML = "";
            // }
        })
    })

    document.querySelectorAll("#delete").forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => {
            const { expenseId } = deleteBtn.dataset;
            expenseList.splice(expenseId, 1);
            updateLocalStorage();
            displayExpenseTable();

            // showExpense();
        })
    })
}
displayExpenseTable();

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// // // Extra work after to be done:
// // const tableDetails = () => {
// //     const today = new Date();
// //     const month = months[today.getMonth()]
// //     let date = today.getDate()
// //     date < 10 ? date = "0" + date : date;
// //     const year = today.getFullYear()
// //     // console.log(month, date, year)

// //     const div = document.createElement("div");
// //     div.classList.add("table-details");
// //     div.innerHTML = `
// //         <div class="today">${month} ${date} ${year}</div>
// //         <div class="expense-details">
// //             <div class="transaction">Number of transactions: 04</div>
// //             <div class="expense-values">Values: 1234</div>
// //         </div>
// //     `
// // table.appendChild(div);
// // }
// // tableDetails()