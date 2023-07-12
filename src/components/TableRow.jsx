import TableCell from '@mui/material/TableCell';
import { TextField } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

const TableRowComponent = ({row, getRows})=>{
    const [productName, setProductName] = useState(row.product);
    const [hsn, sethsn] = useState(row.hsn);
    const [rate, setRate] = useState(row.rate);
    const [qty, setQty] = useState(row.qty);
    const [cgstPer,  setCgstPer] = useState(row.cgstPer);
    const [cgstAmt, setCgstAmt] = useState(row.cgstAmt);
    const [sgstPer, setSgstPer] = useState(row.sgstPer);
    const [sgstAmt, setSgstAmt] = useState(row.sgstAmt);
    const [igstPer, setIgstPer] = useState(row.igstPer);
    const [igstAmt, setIgstAmt] = useState(row.igstAmt);
    const [amount, setAmount] = useState(row.amount);

    useEffect(()=>{
        // console.log(`from effect: r:${rate}, q:${qty}, c:${cgstAmt}, s:${sgstAmt}, i:${igstAmt}, a:${amount}`);
        let calculateTotal = ((rate*qty)+((cgstAmt*1)+(sgstAmt*1)+(igstAmt*1)));
        setAmount(calculateTotal.toFixed(2));
    }, [rate, qty, cgstPer, sgstPer, igstPer]);

    return(
        <TableRow
            key={row.product}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            id={row.id}
            >
            <TableCell component="th" scope="row">
            <TextField
            data-fieldId = {row.id} 
            value={productName} 
            className='table-field'
            onChange={(e)=>setProductName(e.target.value)}/>
            </TableCell>
            <TableCell align="right">
            <TextField
            data-fieldId = {row.id} 
            value={hsn} 
            className='table-field'
            onChange={(e)=>sethsn(e.target.value)}/></TableCell>
            <TableCell align="right">
            <TextField
            data-fieldId = {row.id}
            value={rate} 
            className='table-field'
            onChange={(e)=>setRate(e.target.value)}/></TableCell>
            <TableCell align="right">
            <TextField
            data-fieldId = {row.id}
            value={qty} 
            className='table-field'
            onChange={(e)=>setQty(e.target.value)}/></TableCell>
            <TableCell align="right">
            <TextField
            data-fieldId = {row.id}
            value={cgstPer} 
            className='table-field'
            onChange={(e)=>{
                setCgstPer(e.target.value);
                setCgstAmt(((rate*qty)*(e.target.value/100)).toFixed(2));
                // console.log(e.target.parentNode.parentNode.dataset.fieldid);
                getRows(e.target.parentNode.parentNode.dataset.fieldid, 'cgstPer', e.target.value);
                }}/></TableCell>
            <TableCell align="right">
            <TextField 
            value={cgstAmt} 
            className='table-field'
            /></TableCell>
            <TableCell align="right">
            <TextField
            data-fieldId = {row.id}
            value={sgstPer} 
            className='table-field'
            onChange={(e)=>{
                setSgstPer(e.target.value);
                setSgstAmt(((rate*qty)*(e.target.value/100)).toFixed(2));
                }}/></TableCell>
            <TableCell align="right">
            <TextField 
            value={sgstAmt} 
            className='table-field'/></TableCell>
            <TableCell align="right">
            <TextField
            data-fieldId = {row.id}
            value={igstPer} 
            className='table-field'
            onChange={(e)=>{
                setIgstPer(e.target.value);
                setIgstAmt(((rate*qty)*(e.target.value/100)).toFixed(2));
                }}/></TableCell>
            <TableCell align="right">
            <TextField 
            value={igstAmt} 
            className='table-field'/></TableCell>
            <TableCell align="right">
            <TextField 
            value={amount} 
            className='table-field'/></TableCell>
        </TableRow>
    );
}

export default TableRowComponent;