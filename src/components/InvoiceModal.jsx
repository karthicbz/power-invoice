import { Button, Modal, Typography, Box, Paper, ListItemButton, TextField } from "@mui/material";
import { modalStyle } from "./modal";
import MaterialTextField from "./TextField";
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InvoiceTable from "./InvoiceTable";
import {v4 as uuidv4} from 'uuid';
import { DateTime } from "luxon";
// import invoice from "../scripts/makeInvoice";
import easyinvoice from "easyinvoice";
import PaymentMethodSelect from "./PaymentMethodSelect";
// import invoiceTemplate from '../templates/invoice_template.html';

const invoiceModalStyle = modalStyle;
invoiceModalStyle['display'] = 'flex';
invoiceModalStyle['flexDirection'] = 'column';
invoiceModalStyle['width'] = 1200;
invoiceModalStyle['gap'] = "8px";

const invoiceDetailsGrid = {
    display: 'grid',
    'gridTemplateColumns': 'repeat(2, 1fr)',
    'gridTemplateRows': 'repeat(3, calc(100% / 3))',
    gap: '8px',
}

const InvoiceModal = ({open, handleClose})=>{
    const [customerDetails, setCustomerDetails] = useState([]);
    const [choosenCustomer, setChoosenCustomer] = useState('');
    const [input, setInput] = useState(''); //its the customer search field
    const [searchActive, setSearchActive] = useState(false);
    const [itemDetails, setItemDetails] = useState([]); //this is where the customers name get stored while searching
    const [itemSearchInput, setItemSearchInput] = useState(''); //it's the state for search field
    const [itemSearchActive, setItemSearchActive] = useState(false);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [invoiceNum, setInvoiceNum] = useState(0);
    const [invoiceDate, setInvoiceDate] = useState(DateTime.now().toFormat('yyyy-LL-dd'));
    const [invoiceData, setInvoiceData] = useState({});
    const [paymentId, setPaymentId] = useState('');
    const [paymentMode, setPaymentMode] = useState('credit');

    function handleInvoiceNum(e){
        setInvoiceNum(e.target.value);
    }

    async function getNextInvoiceNumber(){
        try{
            const response = await fetch('http://localhost:3001/powerinvoice/invoices/nextInvoiceNumber', {mode:'cors'});
            const invoiceNumber = await response.json();
            setInvoiceNum(invoiceNumber.data+1);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getNextInvoiceNumber();
    },[])

    function handleInvoiceDate(e){
        setInvoiceDate(e.target.value);
    }

    async function searchCustomer(){
        const response = await fetch(`http://localhost:3001/powerinvoice/customers/search?text=${input}`, {mode:'cors'});
        const data = await response.json();
        setCustomerDetails(data);
    }

    function handleInput(e){
        setInput(e.target.value);
    }

    //this one removes list item from customer search and set customer fields to empty
    useEffect(()=>{
        // console.log(input);
        if(input === ''){
            setCustomerDetails([]);
        }

        if(searchActive && input !== ''){
            searchCustomer();
        }

        //since there is no way to clear the modal inputs, 
        //I have used the prop(open) which is used to show and close modal to clear the input values
        if(!open){
            setCustomerDetails([]);
            setChoosenCustomer('');
            setInput('');
            setSearchActive(false);
            setItemDetails([]);
            setRows([]);
            setInvoiceNum(0);
            setPaymentMode('credit');
            setPaymentId('');
        }
    },[input, open])

    useEffect(()=>{
        setTotal(0);
        // console.log(total);
        rows.forEach(row=>{
            setTotal(prevTotal => prevTotal + row.amount);
        });
    }, [rows]);

    function handleClick(e){
        setChoosenCustomer(customerDetails.filter(customer=>{
            if(customer._id === e.target.parentNode.id){
                setInput(customer.name);
                return customer;
            }
            return '';
        }))
        setCustomerDetails([]);
    }

    //below code is for invoice table
    function createData(id, row_id, product, hsn, rate, qty, cgstPer, cgstAmt, sgstPer, sgstAmt, igstPer, igstAmt, amount) {
        cgstAmt = rate * (cgstPer/100);
        sgstAmt = rate * (sgstPer/100);
        igstAmt = rate * (igstPer/100);
        amount = ((rate * qty)+(cgstAmt + sgstAmt + igstAmt));
        cgstPer = parseInt(cgstPer);
        sgstPer = parseInt(sgstPer);
        igstPer = parseInt(igstPer);
        // console.log(`rate:${rate}, qty:${qty}, c:${cgstAmt}, s:${sgstAmt}, i:${igstAmt}`);
        return { id, row_id, product, hsn, rate, qty, cgstPer, cgstAmt, sgstPer, sgstAmt, igstPer, igstAmt, amount };
    }
      
    // let rows = [
    // ];

    function handleItemSearch(e){
        setItemSearchInput(e.target.value);
    }

    async function searchItem(){
        const response = await fetch(`http://localhost:3002/inventory/item/search?text=${itemSearchInput}`, {mode:'cors'});
        const data = await response.json();
        // console.log(data);
        setItemDetails(data);
    }

    function addItemsToRow(e){
        const matchedItem = itemDetails.find(item=>item._id === e.target.parentNode.id);
        if(matchedItem){
            setItemSearchInput('');
            const newData = createData(matchedItem._id, uuidv4(), matchedItem.name, matchedItem.hsn, matchedItem.price, 1, 9, 0, 9, 0, 9, 0, 0);
            setRows([...rows, newData]);
        }
        setItemDetails([]);
        setItemSearchActive(false);
    }

    function deleteRowItem(id){
        const updatedRows = [...rows];
        const index = rows.findIndex(row=>row.id === id);
        if(index !== -1){
            updatedRows.splice(index, 1);
        }
        // setRows([]);
        setRows(updatedRows);
    }

    function updateRowItem(id, prop, value){
        // console.log(`id:${id}, prop:${prop}, value:${value}`);
        if(prop !== 'product'){
            value = parseFloat(value);
        }
        // console.log(`p:${prop}, v:${value}`);
        setRows(prevRows=>prevRows.map(item=>item.id === id?{...item, [prop]:value}:item));
    }

    //this one removes list item from products search
    useEffect(()=>{
        if(itemSearchInput === ''){
            setItemDetails([]);
        }
        if(itemSearchInput !== '' && itemSearchActive){
            searchItem();
        }
    }, [itemSearchInput]);

    async function saveInvoice(){
        const payload = await fetch('http://localhost:3001/powerinvoice/invoices',{
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            mode:'cors',
            body:JSON.stringify({
                invoiceNumber:`${invoiceNum}`, 
                invoiceDate:`${invoiceDate}`,
                customer:`${choosenCustomer[0]._id}`,
                purchasedItems:`${JSON.stringify(rows)}`,
                total:`${total}`,
            }),
        });
        const response = await payload.json();
        // console.log(response);
        if(response.status === 'success'){
            getNextInvoiceNumber();
        }
    }

    async function handleInvoicePrint(){
        setInvoiceData(
            {
            "sender": {
                "company": "VK Metals Tools and Suppliers",
                "address": "3/15 Singaravellar street NH-2",
                "city": "Maraimalai Nagar",
                "zip": "603209",
                "country": "GSTIN: 33ABNPE1591Q1Z8",
            },
            "products": [
                {
                    "quantity": 2,
                    "description": "Product 1",
                    "tax-rate": 6,
                    "price": 33.87
                },
                {
                    "quantity": 4.1,
                    "description": "Product 2",
                    "tax-rate": 6,
                    "price": 12.34
                },
                {
                    "quantity": 4.5678,
                    "description": "Product 3",
                    "tax-rate": 21,
                    "price": 6324.453456
                }
            ],
        }
        )
        const result = await easyinvoice.createInvoice(invoiceData);
        easyinvoice.print(result.pdf);
    }

    function handlePaymentMode(e){
        const paymentId = document.getElementById('payment-id-field');
        if(e.target.value === 'cheque'){
            paymentId.placeholder = 'Cheque Number';
        }else if(e.target.value === 'online'){
            paymentId.placeholder = 'Transaction Id';
        }
        setPaymentMode(e.target.value);
    }

    function handlePaymentModeInput(e){
        setPaymentId(e.target.value);
    }

    return(
        <Modal open={open}>
            <Box sx={invoiceModalStyle}>
                <Typography variant="h5" textAlign="center">New Invoice</Typography>
                <Box sx={{position:'relative'}}>
                    <TextField
                    sx={{width:'100%'}}
                    onFocus={()=>setSearchActive(true)}
                    onBlur={()=>setSearchActive(false)} 
                    onChange={handleInput} 
                    value={input} 
                    placeholder="Search Customer"/>
                    <List sx={{bgcolor: 'background.paper', padding: '0', position:'absolute', left:0, right:0, zIndex:2}}>
                        {
                            (customerDetails.length>0)&&
                            customerDetails.map(customer=>{
                                return(
                                    <ListItem key={customer._id}>
                                        <ListItemButton>
                                            <ListItemText id={customer._id} primary={customer.name} onClick={handleClick}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Box>
                <Box sx={invoiceDetailsGrid}>
                    <TextField type="text" value={invoiceNum} id="invoiceNumber" label="Invoice No" onChange={handleInvoiceNum} focused/>
                    <TextField type="date" value={invoiceDate} label="Invoice Date" id="invoiceDate" onChange={handleInvoiceDate} focused/>
                    <TextField type="text" value={choosenCustomer&&choosenCustomer[0].name} id="customerNameField" label="Customer Name" focused/>
                    <TextField type="text" multiline id="customerAddress" rows={4} value={choosenCustomer&&choosenCustomer[0].address} label="Address" focused/>
                    <TextField type="text" id="customerGst" value={choosenCustomer&&choosenCustomer[0].gstNumber} label="GST no" focused/>
                </Box>
                <Box sx={{position:"relative"}}>
                    <TextField
                    sx={{width:'100%'}} 
                    placeholder="search items" 
                    value={itemSearchInput} 
                    onChange={handleItemSearch}
                    onFocus={()=>setItemSearchActive(true)}
                    onBlur={()=>{
                        setItemSearchActive(false);
                        }}/>
                    <List sx={{position:"absolute", zIndex:3, bgcolor:'background.paper', left:0, right:0}}>
                        {
                            (itemDetails.length>0)&&
                            itemDetails.map(item=>{
                                return(
                                    <ListItem key={item._id}>
                                        <ListItemButton>
                                            <ListItemText primary={item.name} id={item._id} onClick={addItemsToRow}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Box>
                <InvoiceTable rows={rows} updateRowItem = {updateRowItem} total={total} deleteRowItem={deleteRowItem}/>
                <Box sx={{display:'flex', gap: '10px', justifyContent:'end'}}>
                    <PaymentMethodSelect paymentMode={paymentMode} handlePaymentMode={handlePaymentMode}/>
                    <TextField placeholder="cheque Number" id="payment-id-field"
                    value={paymentId}
                    onChange={handlePaymentModeInput} 
                    style={paymentMode==='cheque'||paymentMode === 'online'?{display:'block'}:{display:'none'}}></TextField>
                    <Button variant="outlined" onClick={saveInvoice}>Save</Button>
                    <Button variant="outlined" onClick={handleInvoicePrint}>Print</Button>
                    <Button onClick={handleClose} variant="outlined">Close</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default InvoiceModal;