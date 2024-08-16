import React from "react";

const ProductForm = ({ handleInput, value, setValue }) => {
  return (
    <div className="w-75">
      <form onSubmit={handleInput}>
        <div className="row">
          <div className="col -6">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Product Name"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="col-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
