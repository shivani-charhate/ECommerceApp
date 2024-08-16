import React from "react";

const CategoryForm = ({ value, handleInput, setValue }) => {
  return (
    <div className="w-75">
      <form onSubmit={handleInput}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
