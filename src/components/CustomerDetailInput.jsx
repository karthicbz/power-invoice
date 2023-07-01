import { TextField, Button, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

const CustomerDetailInput = ()=>{
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [companyname, setCompanyname] = useState('');
    const [companyemail, setCompanyemail] = useState('');
    const [companyphone, setCompanyphone] = useState('');
    const [companygst, setCompanygst] = useState('');
    const [companyaddress, setCompanyaddress] = useState('');
    
    function hideInputFields(e){
        const inputFields = document.querySelector('.customer-detail-input');
        const newCustomerField = document.querySelector('.newCustomer');
        newCustomerField.childNodes[0].style.display = 'block';
        inputFields.style.display='none';
    }

    async function saveCompanyDetails(){
        const response = await fetch("http://localhost:3002/powerinvoice/customers",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            mode:"cors",
            body:JSON.stringify({
                companyname:`${companyname}`, 
                companyemail:`${companyemail}`, 
                companyphone:`${companyphone}`, 
                companygst:`${companygst}`,
                companyaddress:`${companyaddress}`
            }),
        });
        const data = await response.json();
        if(data.status !== 'success'){
            setOpen(true);
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="error" sx={{width:"100%"}}>{data.data}</Alert>
            </Snackbar>
        }else{
            setOpen(true);
            <Snackbar open={open} autoHideDuration={5000}>
                <Alert severity="success" sx={{width:"100%"}}>{data.data}</Alert>
            </Snackbar>
        }
    }

    const handleCompanyname = (e)=>{
        setCompanyname(e.target.value);
    }

    const handleCompanyemail = (e)=>{
        setCompanyemail(e.target.value);
    }

    const handleCompanyphone = (e)=>{
        setCompanyphone(e.target.value);
    }

    const handleCompanygst = (e)=>{
        setCompanygst(e.target.value);
    }

    const handleCompanyaddress = (e)=>{
        setCompanyaddress(e.target.value);
    }

    return(
        <Box sx={{
            display:"none", 
            flexDirection:"column", 
            gap:"1rem"}}
            className="customer-detail-input">
            <TextField 
            name="companyname" 
            id="companyname" 
            label="Company Name" 
            variant="outlined" 
            value={companyname} 
            onChange={handleCompanyname}/>

            <TextField name="companyemail" id="companyemail" label="Email Id" variant="outlined" value={companyemail} onChange={handleCompanyemail}/>

            <TextField name="companyphone" id="companyphone" label="Phone Number" variant="outlined" value={companyphone} onChange={handleCompanyphone}/>

            <TextField name="companygst" id="companygst" label="GST Number" variant="outlined" value={companygst} onChange={handleCompanygst}/>

            <TextField
                id="companyaddress"
                label="Address"
                multiline
                rows={4}
                value={companyaddress}
                onChange={handleCompanyaddress}/>
            <Button variant="contained" onClick={saveCompanyDetails}>Add Company</Button>
            <Button variant="outlined" onClick={hideInputFields}>Cancel</Button>
        </Box>
    );
}

export default CustomerDetailInput;