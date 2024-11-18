import React from "react";
import { MdAdd } from "react-icons/md";
const ExpenseForm = ({
  //Aquí se desestructuran las props que se pasan desde App.js
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
    //Aquí se crea el formulario que se renderiza en App.js
        //se le asigna la función handleSubmit al evento onSubmit
    <form onSubmit={handleSubmit}> 
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder=""
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder=""
            value={amount}
            //se le asigna la función handleAmount al evento onChange
            onChange={handleAmount}
          />
        </div>
        <div>
          <button type="submit" className="btn">
            {edit ? "Edit" : "Add"}
            <MdAdd className="btn-icon" />
          </button>
        </div>
      </div>

    </form>
  );
};

export default ExpenseForm;
