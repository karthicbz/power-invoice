import { Button, Modal, Typography, Box, Paper, ListItemButton, TextField } from "@mui/material";
import { modalStyle } from "./modal";
import MaterialTextField from "./TextField";
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InvoiceTable from "./InvoiceTable";

const invoiceModalStyle = modalStyle;
invoiceModalStyle['display'] = 'flex';
invoiceModalStyle['flexDirection'] = 'column';
invoiceModalStyle['width'] = 1200;
invoiceModalStyle['gap'] = "8px";

const invoiceDetailsGrid = {
    display: 'grid',
    'grid-template-columns': 'repeat(2, 1fr)',
    'grid-template-rows': 'repeat(3, calc(100% / 3))',
    gap: '8px',
}

const InvoiceModal = ({open, handleClose})=>{
    const [customerDetails, setCustomerDetails] = useState([]);
    const [choosenCustomer, setChoosenCustomer] = useState('');
    const [input, setInput] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [itemDetails, setItemDetails] = useState([]);
    const [itemSearchInput, setItemSearchInput] = useState('');
    const [itemSearchActive, setItemSearchActive] = useState(false);
    const [rows, setRows] = useState([]);
    let [total, setTotal] = useState(0);

    async function searchCustomer(){
        const response = await fetch(`http://localhost:3001/powerinvoice/customers/search?text=${input}`, {mode:'cors'});
        const data = await response.json();
        setCustomerDetails(data);
    }

    function handleInput(e){
        setInput(e.target.value);
    }

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
        }
    },[input, open])

    useEffect(()=>{
        setTotal(0);
        console.log(total);
        rows.forEach(item=>{
            // console.log(item);
            console.log(item.amount);
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
    function createData(id, product, hsn, rate, qty, cgstPer, cgstAmt, sgstPer, sgstAmt, igstPer, igstAmt, amount) {
        cgstAmt = rate * (cgstPer/100);
        sgstAmt = rate * (sgstPer/100);
        igstAmt = rate * (igstPer/100);
        amount = ((rate * qty)+(cgstAmt + sgstAmt + igstAmt));
        cgstPer = parseInt(cgstPer);
        sgstPer = parseInt(sgstPer);
        igstPer = parseInt(igstPer);
        // console.log(`rate:${rate}, qty:${qty}, c:${cgstAmt}, s:${sgstAmt}, i:${igstAmt}`);
        return { id, product, hsn, rate, qty, cgstPer, cgstAmt, sgstPer, sgstAmt, igstPer, igstAmt, amount };
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
            const newData = createData(matchedItem._id, matchedItem.name, matchedItem.hsn, matchedItem.price, 1, 9, 0, 9, 0, 9, 0, 0);
            setRows([...rows, newData]);
        }
        setItemDetails([]);
    }

    function getRows(id, prop, value){
        // console.log(`id:${id}, prop:${prop}, value:${value}`);
        value = parseInt(value);
        setRows(prevRows=>prevRows.map(item=>item.id === id?{...item, [prop]:value}:item));
    }

    useEffect(()=>{
        if(itemSearchInput === ''){
            setItemDetails([]);
        }
        if(itemSearchInput !== '' && itemSearchActive){
            searchItem();
        }
    }, [itemSearchInput]);

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
                    <TextField type="text" value="0" id="invoiceNumber" label="Invoice No" focused/>
                    <TextField type="date" label="Invoice Date" id="invoiceDate" focused/>
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
                <InvoiceTable rows={rows} getRows = {getRows} total={total}/>
                <Button onClick={handleClose} variant="outlined">Close</Button>
            </Box>
        </Modal>
    );
}

export default InvoiceModal;