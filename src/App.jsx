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
  { id: 'code', label: 'Cuota', minWidth: 30 , align: "center"},
  { id: 'año', label: 'Año', minWidth: 50 , align: "left"},
  { id: 'mes',label: 'Mes', minWidth: 50, align: "left",},
  { id: 'precio', label: 'Precio', minWidth: 170, },
  
];

function createData(code, año, mes, precio) {
  return { code, año, mes, precio };
}

const rows = [];

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
    cuotas: 0,
    fPres: Date.now(),
    fPago: Date.now(),
    arancel: 0.8,
    tna: 0.8,
    importe: 0,
  });

  const [montoArancel, setMontoArancel] = useState(0);

  const [valorCuota, setValorCuota] = useState(0);

  const [arancelCuota, setArancelCuota] = useState(0);

  const [totalVan, setTotalVan] = useState(0);

  const [cF, setCF] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();
    setMontoArancel(getMontoArancel())
    setValorCuota(getValorCuota())
    setArancelCuota(getArancelCuota())
    setTotalVan(getTotalVan())
    setCF(values.importe-getMontoArancel()-getTotalVan())
    addData()
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const formatoMexico = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    let arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return arr[1] ? arr.join('.'): arr[0];
  }
  
  function createListData(size) {
    const arr = []
    for (let index = 1; index <= size; index++) {
      arr.push((getValorCuota()- getArancelCuota())/((1+values.tna/100*(30-((( new Date(values.fPago).getTime()- new Date(values.fPres).getTime())/(1000*60*60*24))))/360)* Math.pow((1+values.tna/100*30/360), (index-1))) )
    }
    return arr
  }

  function addData() {
    createListData(values.cuotas).map((currentValue, index) =>{
      const date = new Date();
      date.setMonth(date.getMonth()+index+1)
      rows.push(createData(index+1, date.getFullYear(),date.toLocaleString('default', { month: 'long' }).toUpperCase(), formatoMexico((Math.floor(currentValue * 10000) / 10000).toFixed(4))))
    })
  }

  function getMontoArancel() {
    return values.importe*values.arancel/100
  }

  function getValorCuota() {
    return values.importe/values.cuotas
  }

  function getArancelCuota() {
    return (values.importe/values.cuotas)*values.arancel/100
  }

  function getTotalVan() {
    return createListData(values.cuotas).reduce((a, b) => a + b, 0)
  }
 
  return (
    <>
    <div className="app">
      <div className="contenedor">
        <div className="logo"></div>
        <h1 className="titulo">Calculadora de Costo Financiero<br></br>en Cuotas Acelerados</h1>          
        <form className="formizquierda" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              flag={true}
              types={input.name === "arancel" ? "porcentaje": "common"}
              key={input.id}
              {...input}
              onChange={onChange}
            />
          ))}
          <button type='submit'>Calcular</button>
        </form>

        <form className="formderecha" onSubmit={handleSubmit}>
          {result.map((input) => (
            <FormInput
              flag={false}
              types="result"
              values={input.name === "Monto Arancel" ? montoArancel: input.name === "Valor Cuota" ? valorCuota : input.name === "Arancel Cuota" ? arancelCuota :  input.name === "Total Van" ? totalVan: cF}
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

