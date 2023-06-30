import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";

const CustomerDetailInput = ()=>{
<<<<<<< HEAD

=======
>>>>>>> 7f91325b69c41117d2f4aaad93ace3c30462f4be
    function hideInputFields(e){
        const inputFields = document.querySelector('.customer-detail-input');
        const newCustomerField = document.querySelector('.newCustomer');
        newCustomerField.childNodes[0].style.display = 'block';
        inputFields.style.display='none';
    }
<<<<<<< HEAD

    function saveCompanyDetails(){

    }
=======
>>>>>>> 7f91325b69c41117d2f4aaad93ace3c30462f4be
    return(
        <Box sx={{
            display:"none", 
            flexDirection:"column", 
            gap:"1rem"}}
            className="customer-detail-input">
            <TextField name="companyname" id="companyname" label="Company Name" variant="outlined"/>
            <TextField name="companyemail" id="companyemail" label="Email Id" variant="outlined"/>
            <TextField name="companyphone" id="companyphone" label="Phone Number" variant="outlined"/>
<<<<<<< HEAD
            <TextField name="companygst" id="companygst" label="GST Number" variant="outlined"/>
=======
>>>>>>> 7f91325b69c41117d2f4aaad93ace3c30462f4be
            <TextField
                id="companyaddress"
                label="Address"
                multiline
                rows={4}/>
<<<<<<< HEAD
            <Button variant="contained" onClick={saveCompanyDetails}>Add Company</Button>
=======
            <Button variant="contained">Add Company</Button>
>>>>>>> 7f91325b69c41117d2f4aaad93ace3c30462f4be
            <Button variant="outlined" onClick={hideInputFields}>Cancel</Button>
        </Box>
    );
}

export default CustomerDetailInput;