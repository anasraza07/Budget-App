// Step 01
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
const thead = document.getElementById("table-thead");
const tbody = document.getElementById("table-tbody");
// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const categories = ["Housing", "Transportation", "Food", "Utilities", "Insurance", "Medical", "Saving", "Personal", "Entertainment", "Other"]
categories.forEach(category => {
    const option = document.createElement("option");
    option.textContent = category;
    expenseCategory.appendChild(option);
})

let expenseList = []
let totalExpense = 0;
budgetDashboard.innerText = "00"
expenseDashboard.innerText = "00"
balanceDashboard.innerText = "00"

// Budget Dashboard
budgetButton.addEventListener("click", () => {
    if (budgetValue.value === "") {
        budgetDashboard.innerText = "00";
    }
    else {
        budgetDashboard.innerText = budgetValue.value;
        budgetValue.value = ""
    }
    showBalance();
})

// // Expense Dashboard
const showExpense = () => {
    let sum = 0;
    expenseList.forEach((obj) => {
        sum += obj.amountQuery;
    })
    if (sum === 0) {
        expenseDashboard.innerText = "00";
    }
    else {
        expenseDashboard.innerText = `${sum} `
    }
    showBalance();
}

// Balance Dashboard
const showBalance = () => {
    // let balance = 0;
    if (budgetDashboard.innerText === "00" && expenseDashboard.innerText === "00") {
        balanceDashboard.innerText = budgetDashboard.innerText;
    }
    else {
        balanceDashboard.innerText = budgetDashboard.innerText - expenseDashboard.innerText;
    }
}

// Taking input from user
expenseBtn.addEventListener("click", () => {
    const categoryQuery = expenseCategory.value;
    const descriptionQuery = expenseDescription.value;
    const amountQuery = +expenseAmount.value;
    const longDateQuery = expenseDate.value;

    const yearOnly = new Date(`"${longDateQuery}"`).getFullYear();
    const monthOnly = months[new Date(`"${longDateQuery}"`).getMonth()];
    let dateOnly = new Date(`"${longDateQuery}"`).getDate();
    dateOnly < 10 ? dateOnly = "0" + dateOnly : dateOnly;

    const warning = document.getElementById("warning");
    if (categoryQuery === "" || descriptionQuery === "" || amountQuery === "" || longDateQuery === "") {
        // alert("Please Enter all Values")
        warning.style.display = "flex";
        setTimeout(() => {
            warning.style.display = "none";
        }, 3000)
    }
    else {

        let expenseObj = {
            categoryQuery,
            descriptionQuery,
            amountQuery,
            longDateQuery,
            dateQuery: `${dateOnly} ${monthOnly} ${yearOnly}`

        }
        expenseList.push(expenseObj)

        displayExpense();
        showExpense();

        expenseCategory.value = "";
        expenseDescription.value = "";
        expenseAmount.value = "";
        expenseDate.value = "";
    }
}
)

// Displaying expenses
function displayExpense() {
    thead.innerHTML = `
        <tr>
            <th>S.no.</th>
            <th>Category</th>
            <th class="firstData">Description</th>
            <th>Amount</th>
            <th>Buttons</th>
        </tr>`;

    let tbodyHtml = '';
    expenseList.forEach((obj, index) => {
        tbodyHtml += `
        <tr>
                <td>${index + 1}.</td>
                <td>${obj.categoryQuery}</td>
                <td class="firstData">
                    <div class="m-0">${obj.descriptionQuery}</div>
                    <p class="m-0 baloo-bhai" id="date">${obj.dateQuery}</p>
                </td>
                <td>$${obj.amountQuery}</td>
                <td><img id="edit" class="actionsImg"src="./img/edit.png">
                                <img id="delete" class="actionsImg"src="./img/delete.png">
                </td>
            </tr>
        `
    })

    tbody.innerHTML = tbodyHtml;

    // Edit And Delete Functionality
    document.querySelectorAll("#edit").forEach((n) => {
        n.addEventListener('click', (event) => {
            let storedCategory = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
            let storedDescription = event.target.parentNode.previousElementSibling.previousElementSibling.firstChild.nextSibling.innerText;
            let storedAmount = event.target.parentNode.previousElementSibling.innerText
            storedAmount = storedAmount.slice(1)
            storedDate = event.target.parentNode.previousElementSibling.previousElementSibling.firstChild.nextSibling.nextSibling.nextSibling.innerText;

            let indexOfCurrObj = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText - 1

            expenseCategory.value = storedCategory;
            expenseDescription.value = storedDescription;
            expenseAmount.value = storedAmount;
            expenseDate.value = expenseList[indexOfCurrObj].longDateQuery;
            event.target.parentNode.parentNode.remove()
            expenseList.splice(indexOfCurrObj, 1);
            const expenseInput = document.getElementById("expense-input");
            expenseInput.scrollIntoView()
            displayExpense()
            showExpense()
            if (expenseList.length === 0) {
                thead.innerHTML = "";
            }
        })
    })

    document.querySelectorAll("#delete").forEach((n) => {
        n.addEventListener('click', (event) => {

            let indexOfCurrObj = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText - 1
            event.target.parentNode.parentNode.remove()
            expenseList.splice(indexOfCurrObj, 1);

            displayExpense()
            showExpense();
            if (expenseList.length === 0) {
                thead.innerHTML = "";
            }

        })
    })
}

// // Extra work after to be done:
// const tableDetails = () => {
//     const today = new Date();
//     const month = months[today.getMonth()]
//     let date = today.getDate()
//     date < 10 ? date = "0" + date : date;
//     const year = today.getFullYear()
//     // console.log(month, date, year)

//     const div = document.createElement("div");
//     div.classList.add("table-details");
//     div.innerHTML = `
//         <div class="today">${month} ${date} ${year}</div>
//         <div class="expense-details">
//             <div class="transaction">Number of transactions: 04</div>
//             <div class="expense-values">Values: 1234</div>
//         </div>
//     `
// table.appendChild(div);
// }
// tableDetails()