import React, { useState } from "react";
import "./formInput.css";
import CreatableSelect from 'react-select/creatable';




const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, values, flag, id,types, ...inputProps } = props;

  const formatoMexico = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    let arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return arr[1] ? arr.join('.'): arr[0];
  }

  const formatCreateLabel = (inputValue) => `Calcular con el ${inputValue}%`;

  const options = [
    { value: 0.80, label: 'Tarjeta de Débito (0.80%)'},
    { value: 1.80, label: 'Tarjeta de Crédito (1.80%)'},
  ]

  const handleFocus = (e) => {
    setFocused(true);
  };

  switch (types) {
    case "common":
      return (
        <div className="formInput">
          <label>{label}</label>
          <input className="inputOne"
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            required= {true}
          />
          <span>{errorMessage}</span>
        </div>
      )
    case "result":
      return (
        <div className="formInputTwo">
          <label>{label}</label>
          
          <input className="inputTwo"
            {...inputProps}
            value={formatoMexico((Math.floor(values * 10000) / 10000).toFixed(4)) }
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            required= {true}
          />
          <span>{errorMessage}</span>
        </div>
      ) 
  

    case "porcentaje":
        return (
          <div className="formInput">
            <label>
              {label}
              <CreatableSelect  {...inputProps} formatCreateLabel={formatCreateLabel} onChange={onChange} isClearable options={options} />
            </label>
            <span>{errorMessage}</span>
          </div>
        )
    default:
      break;
  }
};

export default FormInput;
