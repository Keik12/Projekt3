const revenueForm = document.querySelector("#revenueForm");
const revenueName = document.querySelector("#revenueName");
const revenueAmount = document.querySelector("#revenueAmount");
const spendingForm = document.querySelector("#spendingForm");
const spendingName = document.querySelector("#spendingName");
const spendingAmount = document.querySelector("#spendingAmount");
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
const revenueDetails = document.querySelector("#revenueDetails");
const spendingDetails = document.querySelector("#spendingDetails");
const revenueList = document.querySelector("#revenueList");
const spendingList = document.querySelector("#spendingList");
const item = document.querySelector("#item");
const revenueSum = document.querySelector("#revenueSum");
const spendingSum = document.querySelector("#spendingSum");

let revenueTable = [];

let spendingTable = [];

revenueForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("poszlo");
  let nameValue1 = revenueName.value;
  let amountValue1 = revenueAmount.value;
  revenueName.value = "";
  revenueAmount.value = "";
  const li = appendList(nameValue1, amountValue1, revenueList);
  console.log(li.id);
  revenueTable.push({ id: li.id, name: nameValue1, amount: amountValue1 });
  const calculate = calcSum(revenueTable);
  console.log(calculate);
  const showSum = document.getElementById("revenueSum");
  showSum.textContent = calculate;
});

spendingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("poszlo2");
  let nameValue2 = spendingName.value;
  let amountValue2 = spendingAmount.value;
  spendingName.value = "";
  spendingAmount.value = "";
  const li = appendList(nameValue2, amountValue2, spendingList);
  console.log(li.id);
  spendingTable.push({ id: li.id, name: nameValue2, amount: amountValue2 });
  const calculate = calcSum(spendingTable);
  console.log(calculate);
  const showSum = document.getElementById("spendingSum");
  showSum.textContent = calculate;
});

// function spanList(name, amount) {
//   const spanName = document.createElement("span");
//   spanName.textContent = name;
//   spanName.id = `${li.id}-name`;
//   const spanAmount = document.createElement("span");
//   spanAmount.textContent = amount;
//   spanAmount.id = `${li.id}-amount`;
// }

function appendList(name, amount, container) {
  let li = document.createElement("li");
  li.id = uuidv4();

  const spanName = document.createElement("span");
  spanName.textContent = name;
  spanName.id = `${li.id}-name`;

  const spanAmount = document.createElement("span");
  spanAmount.textContent = amount;
  spanAmount.id = `${li.id}-amount`;

  li.appendChild(spanName);
  li.appendChild(spanAmount);
  container.appendChild(li);
  let btnEdit = document.createElement("button");
  btnEdit.textContent = "edytuj";
  li.appendChild(btnEdit);
  let btnDelete = document.createElement("button");
  btnDelete.textContent = "usuń";
  li.appendChild(btnDelete);

  btnEdit.addEventListener("click", (event) => {
    document.getElementById(`${li.id}-amount`).contentEditable = true;
    document.getElementById(`${li.id}-name`).contentEditable = true;
  });

  btnDelete.addEventListener("click", (event) => {
    document.getElementById(li.id).remove();
  });

  spanAmount.addEventListener("input", (event) => {
    revenueTable = revenueTable.map((item) => {
      return item.id === li.id
        ? { ...item, amount: event.target.innerText }
        : item;
    });
    console.log(revenueTable);
  });

  spanName.addEventListener("input", (event) => {
    revenueTable = revenueTable.map((item) => {
      return item.id === li.id
        ? { ...item, name: event.target.innerText }
        : item;
    });
    console.log(revenueTable);
  });

  function editElement(id) {
    currentElement = revenues.find((element) => element.id === id);

    const name = window.prompt("Nowa nazwa", currentElement.name);
    const amount = window.prompt("Nowa wartosc", currentElement.amount);

    currentElement.name = name;
    currentElement.amount = amount;
  }

  editButton.addEventListener("click", () => {
    editElement(id);
  });

  // const editSpan = (span) = > {
  // span.addEventListener
  // editSpan(spanAmount)
  // editSpan(spanName)
  // editSpan(spanName, revenueTable,  "name")
  // editSpan(spanAmount, revenueTable,  "amount")

  return li;
}

function calcSum(array) {
  const sum = array.reduce((acc, prev) => {
    console.log(Number(acc.amount), Number(prev.amount), acc);
    return acc + Number(prev.amount);
  }, 0);
  return sum;
}
