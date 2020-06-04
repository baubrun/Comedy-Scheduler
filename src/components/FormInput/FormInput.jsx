import React from "react";

const FormInput = ({ name, onChange, placeholder, type, value }) => {
  return (
    <input
      className="form-control"
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default FormInput;
