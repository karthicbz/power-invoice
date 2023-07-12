import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../App.css';
import { useState, useEffect } from 'react';
import TableRowComponent from './TableRow';
import { TextField } from '@mui/material';

const InvoiceTable = ({rows, getRows, total, deleteRowItem})=>{
  
    return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">HSN</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">CGST%</TableCell>
            <TableCell align="right">CGST Amt</TableCell>
            <TableCell align="right">SGST%</TableCell>
            <TableCell align="right">SGST Amt</TableCell>
            <TableCell align="right">IGST%</TableCell>
            <TableCell align="right">IGST Amt</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRowComponent row={row} getRows={getRows} deleteRowItem={deleteRowItem}/>
          ))}
          <TableRow>
            <TableCell 
            colSpan={10} 
            align='right'
            sx={{padding:'4px 8px'}}
            >Total</TableCell>
            <TableCell sx={{padding:'4px 8px'}}>
              <TextField 
              className='table-field'
              data-fieldid = "totalAmount"
              value={total}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default InvoiceTable;