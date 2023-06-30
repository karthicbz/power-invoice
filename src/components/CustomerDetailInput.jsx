import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";

const CustomerDetailInput = ()=>{

    function hideInputFields(e){
        const inputFields = document.querySelector('.customer-detail-input');
        const newCustomerField = document.querySelector('.newCustomer');
        newCustomerField.childNodes[0].style.display = 'block';
        inputFields.style.display='none';
    }

    function saveCompanyDetails(){

    }
    return(
        <Box sx={{
            display:"none", 
            flexDirection:"column", 
            gap:"1rem"}}
            className="customer-detail-input">
            <TextField name="companyname" id="companyname" label="Company Name" variant="outlined"/>
            <TextField name="companyemail" id="companyemail" label="Email Id" variant="outlined"/>
            <TextField name="companyphone" id="companyphone" label="Phone Number" variant="outlined"/>
            <TextField name="companygst" id="companygst" label="GST Number" variant="outlined"/>
            <TextField
                id="companyaddress"
                label="Address"
                multiline
                rows={4}/>
            <Button variant="contained" onClick={saveCompanyDetails}>Add Company</Button>
            <Button variant="outlined" onClick={hideInputFields}>Cancel</Button>
        </Box>
    );
}

export default CustomerDetailInput;