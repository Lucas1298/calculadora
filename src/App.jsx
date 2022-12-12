import React, { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import { inputs } from "./seccion/Inputs"
import { result } from "./seccion/Result"


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

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

  const classes = useStyles();

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
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  </>
  );
};

export default App;
