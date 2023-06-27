import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const revenueForm = document.querySelector("#revenueForm");
const revenueName = document.querySelector("#revenueName");
const revenueAmount = document.querySelector("#revenueAmount");
const revenueList = document.querySelector("#revenueList");

const spendingForm = document.querySelector("#spendingForm");
const spendingName = document.querySelector("#spendingName");
const spendingAmount = document.querySelector("#spendingAmount");
const spendingList = document.querySelector("#spendingList");

const balance = document.getElementById("balance");

let revenueArray = [];

let spendingArray = [];

revenueForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = revenueName.value;
  const amountValue = revenueAmount.value;

  revenueName.value = "";
  revenueAmount.value = "";

  const li = appendList(nameValue, amountValue, revenueList, "REVENUE");

  revenueArray.push({ id: li.id, name: nameValue, amount: amountValue });

  document.getElementById("revenueSum").textContent = calcSum(revenueArray);
  setBalance();
});

spendingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = spendingName.value;
  const amountValue = spendingAmount.value;

  spendingName.value = "";
  spendingAmount.value = "";

  const li = appendList(nameValue, amountValue, spendingList, "SPENDING");

  spendingArray.push({ id: li.id, name: nameValue, amount: amountValue });

  document.getElementById("spendingSum").textContent = calcSum(spendingArray);
  setBalance();
});

function editElement(id, mode) {
  let currentElement;

  if (mode === "SPENDING") {
    currentElement = spendingArray.find((element) => element.id === id);
  } else {
    currentElement = revenueArray.find((element) => element.id === id);
  }

  if (!currentElement) {
    return;
  }

  const name = window.prompt("Nowa nazwa", currentElement.name);
  const amount = window.prompt("Nowa wartosc", currentElement.amount);

  if (!name || Number(amount) <= 0 || isNaN(Number(amount))) {
    window.alert("Podaj poprawne dane");
    return;
  }

  document.getElementById(`${id}-name`).innerText = name;
  document.getElementById(`${id}-amount`).innerText = amount;

  if (mode === "SPENDING") {
    spendingArray = spendingArray.map((el) => {
      return el.id === id ? { ...el, name, amount } : el;
    });

    document.getElementById("spendingSum").innerText = calcSum(spendingArray);
  } else {
    revenueArray = revenueArray.map((el) => {
      return el.id === id ? { ...el, name, amount } : el;
    });

    document.getElementById("revenueSum").innerText = calcSum(revenueArray);
  }

  setBalance();
}

function appendList(name, amount, container, mode) {
  let li = document.createElement("li");
  li.id = uuidv4();
  li.classList.add("details-list-element");

  const spanName = document.createElement("span");
  spanName.textContent = name;
  spanName.id = `${li.id}-name`;
  spanName.classList.add("details-line");

  const spanAmount = document.createElement("span");
  spanAmount.textContent = amount;
  spanAmount.id = `${li.id}-amount`;

  const spacer = document.createElement("div");
  spacer.classList.add("spacer");

  const btnEdit = document.createElement("button");
  btnEdit.textContent = "edytuj";
  btnEdit.classList.add("btn-edit");

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "usuń";
  btnDelete.classList.add("btn-delete");

  li.appendChild(spanName);
  li.appendChild(spanAmount);
  li.appendChild(spacer);
  li.appendChild(btnEdit);
  li.appendChild(btnDelete);

  container.appendChild(li);

  btnEdit.addEventListener("click", () => {
    editElement(li.id, mode);
  });

  btnDelete.addEventListener("click", (event) => {
    document.getElementById(li.id).remove();
    if (mode === "SPENDING") {
      spendingArray = spendingArray.filter((el) => el.id !== li.id);
      document.getElementById("spendingSum").innerText = calcSum(spendingArray);
    } else {
      revenueArray = revenueArray.filter((el) => el.id !== li.id);
      document.getElementById("revenueSum").innerText = calcSum(revenueArray);
    }
    setBalance();
  });

  return li;
}

function calcSum(array) {
  return array.reduce((acc, prev) => {
    return acc + Number(prev.amount);
  }, 0);
}

function setBalance() {
  const revenueSum = Number(document.getElementById("revenueSum").innerText);
  const spendingSum = Number(document.getElementById("spendingSum").innerText);

  if (revenueSum > spendingSum) {
    balance.innerText = `Możesz jeszcze wydać ${revenueSum - spendingSum} zł`;
  } else if (spendingSum > revenueSum) {
    balance.innerText = `Bilans jest ujemny.Jesteś na minusie ${
      spendingSum - revenueSum
    } zł`;
  } else {
    balance.innerText = `Bilans wynosi zero.`;
  }
}
