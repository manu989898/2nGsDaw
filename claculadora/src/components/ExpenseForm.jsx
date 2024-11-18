import React from "react";
import { MdAdd } from "react-icons/md";
const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
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
