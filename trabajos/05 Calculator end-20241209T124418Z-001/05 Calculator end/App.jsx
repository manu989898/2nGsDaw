import {useState, useRef} from "react";
import {evaluate} from "mathjs";
import "./App.css";
import Alert from "./components/Alert.jsx";
import Button from "./components/Button.jsx";
import Input from "./components/Input.jsx";

export default function App(){
  const [text, setText] = useState("");
  const [result, setResult] = useState("0");
  const [alert, setAlert] = useState({show:false});  
  const lastCharRef = useRef("");

  function addToText(val){
    lastCharRef.current = val;
    setText((text) => [...text, val]);
  }

  function addToText_ActionKey(val){
    const actionKeys = ["+","-","*","/","."];

    if(!actionKeys.includes(lastCharRef.current)) {
      lastCharRef.current = val;

      // Si es un "." no li afegim espais
      if(val==".") setText((text) => [...text, val]);
      else setText((text) => [...text, " " + val + " "]); 
    }
    else handleAlert({type:"danger", text:"Can't add 2 action keys"});    
  }
  

  function clearAll(){
    setText("");
    setResult("0");
  }

  function calculateResult(){
    try{
      const input = text.join("").split(" ").join("");
      console.log(input);
      let rawResult = evaluate(input);
  
      let formattedResult = Number.isInteger(rawResult)?
          rawResult:parseFloat(rawResult.toFixed(4));
  
      setResult(formattedResult);
    } catch (error){
      handleAlert({type:"danger", text:"Invalid input"});  
      clearAll();
    }
  }

  function handleAlert({type, text}){
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show:false});
    }, 3000)
  }

  return(
    <div className="App">      
      <div className="calc-wrapper">
        {alert.show && <Alert type={alert.type} text={alert.text}/>}
        <Input text={text} result={result}/>          
        <div className="row">     
          <Button symbol="7" handleClick={addToText}/>
          <Button symbol="8" handleClick={addToText}/>
          <Button symbol="9" handleClick={addToText}/>
          <Button symbol="/" color="orange" handleClick={addToText_ActionKey}/>
        </div>              
        <div className="row">     
          <Button symbol="4" handleClick={addToText}/>
          <Button symbol="5" handleClick={addToText}/>
          <Button symbol="6" handleClick={addToText}/>
          <Button symbol="*" color="orange" handleClick={addToText_ActionKey}/>
        </div>             
        <div className="row">     
          <Button symbol="1" handleClick={addToText}/>
          <Button symbol="2" handleClick={addToText}/>
          <Button symbol="3" handleClick={addToText}/>
          <Button symbol="+" color="orange" handleClick={addToText_ActionKey}/>
        </div>               
        <div className="row">     
          <Button symbol="0" handleClick={addToText}/>
          <Button symbol="." handleClick={addToText_ActionKey}/>
          <Button symbol="=" color="blue" handleClick={calculateResult}/>
          <Button symbol="-" color="orange" handleClick={addToText_ActionKey}/>
        </div>    
        <Button symbol="Clear" color="red" handleClick={clearAll}/>   
      </div>
    </div>
  )  
}