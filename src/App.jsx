import React, { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { inputs } from "./seccion/Inputs"
import { result } from "./seccion/Result"


const columns = [
  { id: 'code', label: 'Code', minWidth: 30 , align: "center"},
  { id: 'año', label: 'Año', minWidth: 50 , align: "left"},
  { id: 'mes',label: 'Mes', minWidth: 50, align: "left",},
  { id: 'precio', label: 'Precio', minWidth: 170, },
  
];

function createData(code, año, mes, precio) {
  return { code, año, mes, precio };
}

const rows = [
  createData(1, 2022, "DICIEMBRE" ,"$1324,171,354"),
  createData(2, 2023, "ENERO" ,"$1403,500,365"),
  createData(3, 2023, "FEBRERO" ,"$60,483,973"),
  createData(4, 2023, "MARZO" ,"$327,167,434"),
  createData(5, 2023, "ABRIL" ,"$37,602,103"),
  createData(6, 2023, "MAYO" ,"$25,475,400"),
  createData(7, 2023, "JUNIO" ,"$83,019,200"),
  createData(8, 2023, "JULIO" ,"$4,857,000"),
  createData(9, 2023, "AGOSTO" ,"$126,577,691"),

];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


export default function App() {
  const classes = useStyles();

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
    <>
    <div className="app">
      <div className="contenedor">
        <div className="logo"></div>
        <h1 className="titulo">Calculadora de Intereses<br></br>de Pago Expreso</h1>          
        <form className="formizquierda" onSubmit={handleSubmit}>
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
          <button>Calcular</button>
        </form>

        <form className="formderecha" onSubmit={handleSubmit}>
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
      
    </div>
    <div className="app">
      <div className="contenedor">
      <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
      </div>
    </div>
  </>
  );
};

