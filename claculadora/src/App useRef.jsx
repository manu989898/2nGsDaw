import { useState, useEffect, useRef } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import Alert from "./components/Alert.jsx";
import { nanoid } from "nanoid";

const initialExpenses = localStorage.getItem("expenses")?
  JSON.parse(localStorage.getItem("expenses")):
  [];

export default function App() {
  // All expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // Single expense
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);

  // Use a ref for id
  const idRef = useRef(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // *********** functionality **************
  // Add charge
  function handleCharge(e) {
    setCharge(e.target.value);
  }

  // Add amount
  function handleAmount(e) {
    let amount = e.target.value;
    amount==""?setAmount(amount):setAmount(parseInt(amount));
  }

  // Handle alert
  function handleAlert({ type, text }) {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  }

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    // Check data
    if (charge !== "" && amount > 0) {
      if (edit) {
        // Edit Expense
        let tempExpenses = expenses.map((item) => {
          return item.id === idRef.current?{ ...item, charge, amount }:item;
        });
        setExpenses(tempExpenses); // New list
        setEdit(false);
      } else {
        // New expense
        const singleExpense = { id: nanoid(), charge, amount };
        // A new array is required
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "charge can't be empty value and amount value has to be bigger than zero",
      });
    }
  }

  // Handle delete
  function handleDelete(id) {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  }

  // Clear all items
  function handleClearItems() {
    setExpenses([]);
  }

  // Handle edit
  function handleEdit(id) {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    idRef.current = id; // Update the mutable ref instead of state
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          handleSubmit={handleSubmit}
          charge={charge}
          handleCharge={handleCharge}
          amount={amount}
          handleAmount={handleAmount}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={handleClearItems}
        />
      </main>
      <h1>
        total spending:
        <span className="total">
          {expenses.reduce((acc, curr) => (acc += curr.amount), 0)} €
        </span>
      </h1>
    </>
  );
}