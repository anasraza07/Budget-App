const expenseCategory = document.getElementById("select-category");
const expenseDescription = document.getElementById("expense-description-value");
const expenseAmount = document.getElementById("expense-amount-value");
const expenseDate = document.getElementById("expense-date-value");

const expenseBtn = document.getElementById("expense-button");
const saveBtn = document.getElementById("save-button");

const thead = document.getElementById("table-thead");
const tbody = document.getElementById("table-tbody");

const expenseList = JSON.parse(localStorage.getItem('expense-list')) || [];

const categories = ["Housing", "Transportation", "Food", "Utilities", "Insurance", "Medical", "Saving", "Personal", "Entertainment", "Other"]
categories.forEach(category => {
    const option = document.createElement("option");
    option.textContent = category;
    expenseCategory.appendChild(option);
})

// dashboard set
const totalBudgetElem = document.getElementById("total-budget");
const totalExpenseElem = document.getElementById("total-expense");
const totalBalanceElem = document.getElementById("total-balance");

let totalBudget = JSON.parse(localStorage.getItem("total-budget")) || 0;
totalBudgetElem.innerText = String(totalBudget).padStart(2, 0);

let totalExpense = 0;
updateDashboardExpense();

let totalBalance = 0;
updateDashboardBalance();

function updateDashboardExpense() {
    totalExpense = 0;
    expenseList.forEach(expenseObj => {
        totalExpense += expenseObj.amountQuery;
    });

    totalExpenseElem.innerText = String(totalExpense).padStart(2, 0);
};

function updateDashboardBalance() {
    totalBalance = totalBudget - totalExpense;
    totalBalanceElem.innerText = String(totalBalance).padStart(2, 0);
};

// budget form
const budgetAmount = document.getElementById("budget-amount");

if (totalBalance === 0) budgetAmount.focus();
else expenseDescription.focus();

const budgetForm = document.querySelector(".budget-form");
amountCustomValidation('setExpense');
budgetForm.addEventListener("submit", (e) => {
    setBudget(e);
    expenseDescription.focus();
});

function setBudget(e) {
    e.preventDefault();

    totalBudget = Number(budgetAmount.value);
    totalBudgetElem.innerText = String(totalBudget).padStart(2, 0);

    localStorage.setItem('total-budget', JSON.stringify(totalBudget));

    budgetForm.reset();

    updateDashboardBalance();
};

// expense amount input custom validation
function amountCustomValidation(caller, currentAmount = 0) {
    if (caller === 'editExpense') {
        expenseAmount.addEventListener('input', () => {
            if (expenseAmount.value === '') {
                expenseAmount.setCustomValidity('Set the expense amount')
            } else if (totalBalance + currentAmount === 0) {
                expenseAmount.setCustomValidity('Your balance is zero. Set a new budget first!')
            }
            else if (expenseAmount.value > (totalBalance + Number(currentAmount))) {
                expenseAmount.setCustomValidity('Amount must be less than your balance')
            } else {
                expenseAmount.setCustomValidity('');
            }
            expenseAmount.reportValidity();
        });
    } else {
        expenseAmount.addEventListener('input', () => {
            if (expenseAmount.value === '') {
                expenseAmount.setCustomValidity('Set the expense amount')
            } else if (totalBalance === 0) {
                expenseAmount.setCustomValidity('Your balance is zero. Set a new budget first!')
            }
            else if (expenseAmount.value > totalBalance) {
                console.log(expenseAmount.value)
                expenseAmount.setCustomValidity('Amount must be less than your balance')
            } else {
                expenseAmount.setCustomValidity('');
            }
            expenseAmount.reportValidity();
        });
    }
};

const expenseForm = document.querySelector('.expense-inputs');
expenseForm.addEventListener("submit", setExpense);

function setExpense(e) {
    e.preventDefault();

    const categoryQuery = expenseCategory.value;
    const descriptionQuery = expenseDescription.value;
    const amountQuery = Number(expenseAmount.value);
    const dateQuery = new Date(expenseDate.value).toDateString().slice(4);

    let expenseObj = {
        categoryQuery,
        descriptionQuery,
        amountQuery,
        dateQuery,
    };

    expenseList.unshift(expenseObj);
    localStorage.setItem('expense-list', JSON.stringify(expenseList));
    expenseForm.reset();
    displayExpenseTable();
    refreshDashboard();
}

function refreshDashboard() {
    updateDashboardExpense();
    updateDashboardBalance();
};

// display table of all expense
displayExpenseTable();
function displayExpenseTable() {
    if (!expenseList.length) {
        thead.innerHTML = "";
    } else {
        thead.innerHTML = `
        <tr>
            <th>S.no.</th>
            <th>Description</th>
            <th>Category</th>
            <th id="amount">Amount</th>
            <th id="actions">Actions</th>
        </tr>`;
    }

    let tbodyHtml = '';
    expenseList.forEach((expenseObj, index) => {
        tbodyHtml += `
            <tr>
                <td>${index + 1}.</td>
                <td id="first-data">
                    <div>${expenseObj.descriptionQuery}</div>
                    <p>${expenseObj.dateQuery}</p>
                </td>
                <td>${expenseObj.categoryQuery}</td>
                <td id="amount">$${expenseObj.amountQuery}.00</td>
                <td id="actions">
                    <img src="./img/edit.png" id="edit" class="actionsImg" data-expense-id="${index}">
                    <img src="./img/delete.png" id="delete" class="actionsImg" data-expense-id="${index}">
                </td>
            </tr>`;
    });
    tbody.innerHTML = tbodyHtml;

    // edit expense
    document.querySelectorAll("#edit").forEach(editBtn => {
        editBtn.addEventListener('click', () => {
            const { expenseId } = editBtn.dataset;
            editExpense(expenseId);
            document.querySelector('.scroll-view-control').scrollIntoView();
        });
    });

    // delete expense
    document.querySelectorAll("#delete").forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => {
            const { expenseId } = deleteBtn.dataset;
            deleteExpense(expenseId);
        });
    });
};

function deleteExpense(expenseId) {
    expenseList.splice(expenseId, 1);
    localStorage.setItem('expense-list', JSON.stringify(expenseList));
    refreshDashboard();
    displayExpenseTable();
}

let globalExpenseId;
function editExpense(expenseId) {
    globalExpenseId = expenseId;
    const currentObject = expenseList[expenseId];
    const { categoryQuery, descriptionQuery, amountQuery, dateQuery } = currentObject;

    expenseCategory.value = categoryQuery;
    expenseDescription.value = descriptionQuery;
    expenseAmount.value = amountQuery;
    expenseDate.value = formatDate(new Date(dateQuery));

    amountCustomValidation('editExpense', amountQuery);

    expenseBtn.style.display = "none";
    saveBtn.style.display = "block"
    saveBtn.setAttribute("type", "submit");
    expenseDescription.focus();

    expenseForm.removeEventListener("submit", setExpense);

    expenseForm.removeEventListener("submit", handleSaveExpense);
    // console.log('handleSaveExpense removed')

    expenseForm.addEventListener('submit', handleSaveExpense);
    // console.log("handleSaveExpense attached");
};

function handleSaveExpense(event) {
    const currentObject = expenseList[globalExpenseId];
    saveExpense(event, currentObject, handleSaveExpense)
};

function saveExpense(event, currentObject, handleSaveExpense) {
    event.preventDefault();
    currentObject.categoryQuery = expenseCategory.value;
    currentObject.descriptionQuery = expenseDescription.value;
    currentObject.amountQuery = Number(expenseAmount.value);
    currentObject.dateQuery = expenseDate.value;

    localStorage.setItem('expense-list', JSON.stringify(expenseList));

    displayExpenseTable();
    refreshDashboard();

    saveBtn.style.display = "none"
    expenseBtn.style.display = "block";
    saveBtn.setAttribute("type", "button");

    expenseForm.reset();

    expenseForm.removeEventListener("submit", handleSaveExpense);
    expenseForm.addEventListener("submit", setExpense);
    amountCustomValidation('setExpense');
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}