import { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";

import { inputs } from "./seccion/Inputs"
import { result } from "./seccion/Result"

const App = () => {
  const [values, setValues] = useState({
    tasa: 0,
    diasAdelantado: 0,
    impuestoBruto: 0,
    impuestoPrisma: 0,
    porcentaje: 0.8,
    cf: 0,
    promo: 0,
  });

  const [neto, setNeto] = useState(0);

  const [total, setTotal] = useState(0);

  const [impuestoPrisma, setmpuestoPrisma] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();
    setmpuestoPrisma(values.impuestoBruto*values.porcentaje/100)
    setNeto(values.impuestoBruto-(values.impuestoBruto*values.porcentaje/100)-values.cf-values.promo) 
    setTotal(((((values.tasa/365)*values.diasAdelantado)*(values.impuestoBruto-(values.impuestoBruto*values.porcentaje/100)-values.cf-values.promo))/100))

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

 
  return (
    <div className="app">
      <form  onSubmit={handleSubmit}>
        <h1>Calculadora Adelantos</h1>          
        {inputs.map((input) => (
          <FormInput
            flag={true}
            impPrisma={values.impuestoPrisma}
            types={input.name === "porcentaje" ? "porcentaje": input.name === "impuestoPrisma" ? "impuestoPrisma" : "common"}
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>

      <form onSubmit={handleSubmit}>
        <h1>Resultado</h1>
        {result.map((input) => (
          <FormInput
            flag={false}
            types="result"
            values={input.name === "Neto" ? neto: input.name === "Total" ? total : impuestoPrisma}
            readOnly="readonly"
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}
      </form>
    </div>
  );
};

export default App;