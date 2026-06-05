let type = document.getElementById("type");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let description = document.getElementById("description");
let addTransBtn = document.getElementById("add-trans-btn")
let displayTrans = document.getElementById("display");
const amountError = document.getElementById("amount-error");
const descriptionError = document.getElementById("description-error");

let transactions = [];

addTransBtn.addEventListener("click", addTransaction);

// Create transaction object
function createTransaction() {

    return {
        id: crypto.randomUUID(),
        type: type.value,
        amount: Number(amount.value),
        category: category.value,
        description: description.value,
        date: new Date().toISOString() 
    };
}

// Save to local storage
function saveToStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load from local storage
function loadFromStorage(){
    const saved = localStorage.getItem("transactions");
    transactions = saved ? JSON.parse(saved) : [];
}

// Add transaction to the transactions array 
function addTransaction() {

    amountError.textContent = "";
    descriptionError.textContent = "";
    amount.classList.remove("input-error");
    description.classList.remove("input-error");

    // Create error dictionary 
    let errors = {};

    // Run validation on inputs
    if (!type.value) errors.type = "Select type";
    if (!category.value) errors.category = "Select category";

    if (amount.value <= 0 || isNaN(amount.value)) {
        errors.amount = "Enter valid amount";
        amount.classList.add("input-error");
    }

    if (!description.value.trim()) {
        errors.description = "Add description";
        description.classList.add("input-error");
    }

    if (Object.keys(errors).length > 0) {
        amountError.textContent = errors.amount || "";
        descriptionError.textContent = errors.description || "";
        return;
    }

    

    const transaction = createTransaction();

    transactions.push(transaction);

    // reset form after transition is added
    document.getElementById("transaction-form").reset();

    saveToStorage();
    displayTransactions();
}

// Delete transaction from array
function deleteTransaction(id) {

    transactions = transactions.filter((transaction)=> transaction.id !== id);

    saveToStorage();
    displayTransactions();
}

// Update object with new data if ID matches
function editTransaction(id, updatedData){
    transactions = transactions.map(t => {
        if(t.id === id) {
            return{
                ...t,            // copy all existing properties
                ...updatedData   // only overwrite what changed
            }
        }
        return t;
    });

    saveToStorage();
    displayTransactions();
}

// Handle the edits made to fields of the object (amount, description)
function handleEdit(id){
    const t = transactions.find(item => item.id === id);

    const newAmount = prompt("New amount: ", t.amount);
    const newDescription = prompt("New description", t.description);

    editTransaction(id, {
        amount: Number(newAmount),
        description: newDescription
    });
}

// Display transactions
function displayTransactions() {
    
    displayTrans.innerHTML = ""

    transactions.forEach((transaction)=>{
        //Card
        let transCard = document.createElement("div");
        transCard.classList.add("transaction-card");

        // Card Header
        // Create header container
        let transHeadContainer = document.createElement("div");
        transHeadContainer.classList.add("card-header")
        
        // Create heading
        let transHeading = document.createElement("h3");
        transHeading.textContent = transaction.type;

        // Create button container
        let transBtnContainer = document.createElement("div");
        transBtnContainer.classList.add("card-header-buttons");

        // Create buttons
        let transEditBtn = document.createElement("button");
        let transDelBtn = document.createElement("button");

        transEditBtn.classList.add("edit-icon")
        transDelBtn.classList.add("delete-icon")

        // Card Body
        // Create card body container
        let transBodyContainer = document.createElement("div")
        transBodyContainer.classList.add("card-body");

        // Create display fields
        let transBodyCategory = document.createElement("p");
        transBodyCategory.textContent = transaction.category;

        let transPrice = document.createElement("p");
        transPrice.textContent = "€" + transaction.amount;

        let transDescription = document.createElement("p");
        transDescription.textContent = transaction.description;

        // Add all the elements together
        // Add Card
        displayTrans.appendChild(transCard);
        
        // Add header + body to card
        transCard.appendChild(transHeadContainer);
        transCard.appendChild(transBodyContainer);

        // Add Heading and button container to card header
        transHeadContainer.appendChild(transHeading);
        transHeadContainer.appendChild(transBtnContainer);

        // Add buttons to button container in header
        transBtnContainer.appendChild(transEditBtn);
        transBtnContainer.appendChild(transDelBtn);

        // Add display fields to card body element
        transBodyContainer.appendChild(transBodyCategory);
        transBodyContainer.appendChild(transPrice);
        transBodyContainer.appendChild(transDescription);

        transDelBtn.addEventListener("click", ()=>{
            deleteTransaction(transaction.id)
        });
        
        transEditBtn.addEventListener("click", ()=> {
            handleEdit(transaction.id)
        });
    });
}

// Live input error checker
amount.addEventListener("input", ()=> {
    amountError.textContent = "";
    amount.classList.remove("input-error");
});

description.addEventListener("input", ()=> {
    descriptionError.textContent = "";
    description.classList.remove("input-error");
});