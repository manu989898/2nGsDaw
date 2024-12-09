import { useState, useEffect, useRef } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import Alert from "./components/Alert.jsx";
import { nanoid } from "nanoid";

const initialExpenses = localStorage.getItem("expenses-react-app")?
  JSON.parse(localStorage.getItem("expenses-react-app")):[];

export default function App(){
  const [expenses, setExpenses] = useState(initialExpenses);

  const [amount, setAmount] = useState("");
  const [charge, setCharge] = useState("");

  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({show:false});

  const idRef = useRef(0);

  useEffect(()=>{
    localStorage.setItem("expenses-react-app",JSON.stringify(expenses));
  },[expenses]);

  function handleCharge(e){
    setCharge(e.target.value);
  }
  
  function handleAmount(e){
    let amount = e.target.value;
    (amount)?setAmount(parseInt(amount)):setAmount(amount);
  }
  
  function handleAlert({type, text}){
    setAlert({show:true, type, text});
    setTimeout(()=>{
      setAlert({show:false});
    }, 3000);
  }
  
  function handleSubmit(e){
    e.preventDefault();
    if(charge!="" && amount>0){
      if(edit){
        setExpenses(expenses.map(expense => {
          return expense.id==idRef.current?{...expense,charge,amount}:expense;
        }));
        setEdit(false);
        idRef.current = 0;
      }
      else{
        const newExpense = {id:nanoid(), charge, amount };
        setExpenses([...expenses, newExpense]);
        handleAlert({type:"success", text:"Expense added"});
      }
      setCharge("");
      setAmount("");
    }    
    else {
      handleAlert({type:"danger", text:"Charge can't be empty and amount must be greater than 0"});
    }
  }

  
  function handleEdit(id){
    let expense = expenses.find(expense => expense.id == id);
    let {charge, amount} = expense;
    setEdit(true);
    setCharge(charge);
    setAmount(amount);
    idRef.current = id;
  }

  
  function handleDelete(id){
    setExpenses(expenses.filter(expense => expense.id != id));
    handleAlert({type:"danger", text:"Expense deleted"});
  }

  
  function clearItems(){
    setExpenses([]);
  }


  return(
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge = {charge}
          amount = {amount}
          handleCharge = {handleCharge}
          handleAmount = {handleAmount}
          handleSubmit = {handleSubmit}
          edit = {edit}
        />
        <ExpenseList
          expenses= {expenses}
          clearItems = {clearItems}
          handleDelete = {handleDelete}
          handleEdit = {handleEdit}
        />
      </main>      
      <h1>total spent:{" "}
        <span className="total">
        {expenses.reduce((acc, curr) => ( acc += curr.amount),0)} €
        </span>
      </h1>
    </>
  )


}