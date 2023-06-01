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

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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
        budgetValue.value = ""
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
        // console.log(sum)
    }
    showBalance();
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

    const dayOnly = days[new Date(`"${dateQuery}"`).getDay()];
    const monthOnly = months[new Date(`"${dateQuery}"`).getMonth()];
    const dateOnly = new Date(`"${dateQuery}"`).getDate();
    if (categoryQuery === "" || descriptionQuery === "" || amountQuery === "" || dateQuery === "") {
        alert("Please Enter all Values")
    }
    else {

        // console.log(dayOnly, monthOnly, dateOnly)

        let expenseObj = {
            categoryQuery,
            descriptionQuery,
            amountQuery,
            dateQuery: `${dayOnly}, ${monthOnly} ${dateOnly}`
        }
        expenseList.push(expenseObj)

        displayExpense();
        showExpense();

        expenseCategory.value = "";
        expenseDescription.value = "";
        expenseAmount.value = "";
        expenseDate.value = "";
        // console.log(expenseObj.dateQuery);
    }
})
// Displaying expenses
// var currObj;
function displayExpense() {
    thead.innerHTML = `
    <tr>
        <th>S.no.</th>
        <th class="firstData">Description</th>
        <th>Amount</th>
        <th>Buttons</th>
    </tr>`;

    // console.log(expenseList)
    let tbodyHtml = '';
    expenseList.forEach((obj, index) => {
        // console.log(obj.categoryVal  )
        tbodyHtml += `
        <tr>
                <td>${index + 1}.</td>
                <td class="firstData">
                    <div class="m-0">${obj.categoryQuery}</div>
                    <p class="m-0" id="date">${obj.dateQuery}</p>
                </td>
                <td>${obj.amountQuery}</td>
                <td><img id="edit" class="actionsImg"src="./img/edit.png">
                                <img id="delete" class="actionsImg"src="./img/delete.png">
                </td>
            </tr>
        `

        tbody.innerHTML = tbodyHtml;
    })


    // const editAndDelBtn = () => {
    document.querySelectorAll("#edit").forEach((n) => {
        n.addEventListener('click', (event) => {
            // console.log(event, index)
            let storedCategory = event.target.parentNode.previousElementSibling.previousElementSibling.firstChild.nextSibling.innerText,
                storedAmount = event.target.parentNode.previousElementSibling.innerText,
                storedDate = event.target.parentNode.previousElementSibling.previousElementSibling.firstChild.nextSibling.nextSibling.nextSibling.innerText;

            expenseCategory.value = storedCategory;
            expenseDescription.value = storedCategory;
            expenseAmount.value = storedAmount;
            expenseDate.value = storedDate;
            // filterEdited(event.target);
            let indexOfCurrObj = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText - 1
            event.target.parentNode.parentNode.remove()
            expenseList.splice(indexOfCurrObj, 1);
            displayExpense()
            // expenseList.splice(index)
            // console.log(index)
        })
    })

    document.querySelectorAll("#delete").forEach((n) => {
        n.addEventListener('click', (event) => {

            let indexOfCurrObj = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText - 1
            event.target.parentNode.parentNode.remove()
            expenseList.splice(indexOfCurrObj, 1);
            // console.log(indexOfCurrDelObj)

            displayExpense()
            showExpense();
            if (expenseList.length === 0) {
                thead.innerHTML = "";
            }

            // expenseList.splice(index)
        })
    })
}

// }
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
    // })
//     }
//     )
// }
// const filterEdited = (a) => {
//     console.log(a)
// }

