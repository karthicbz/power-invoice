import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MaterialButton from "./Button";

const CustomerDetailInput = ({refreshCustomerList})=>{
    const [companyname, setCompanyname] = useState('');
    const [companyemail, setCompanyemail] = useState('');
    const [companyphone, setCompanyphone] = useState('');
    const [companygst, setCompanygst] = useState('');
    const [companyaddress, setCompanyaddress] = useState('');
    const [allFieldsValid, setAllFieldsValid] = useState(false);
    
    function hideInputFields(){
        setCompanyname('');
        setCompanyphone('');
        setCompanyemail('');
        setCompanygst('');
        setCompanyaddress('');
        const inputFields = document.querySelector('.customer-detail-input');
        const newCustomerField = document.querySelector('.newCustomer');
        newCustomerField.childNodes[0].style.display = 'block';
        inputFields.style.display='none';
    }

    async function saveCompanyDetails(){
        const response = await toast.promise(
            fetch("http://localhost:3001/powerinvoice/customers",{
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
        }),
        {
            pending:'Saving customer details',
        }, 
        {
            position:'bottom-center',
        })

        const data = await response.json();
        if(data.status === 'error'){
            toast.error(data.data.message,{
                position:'bottom-center',
                autoClose: 5000,
                closeOnClick: true,
            })
        }else{
            setCompanyname('');
            setCompanyphone('');
            setCompanyemail('');
            setCompanygst('');
            setCompanyaddress('');
            hideInputFields();
            toast.success(data.data,{
                position:'bottom-center',
                autoClose: 5000,
                closeOnClick: true,
            })
            refreshCustomerList();
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

    useEffect(()=>{
        if(companyname.length >= 3 && companyphone.length >= 10 && companygst.length >= 15 && companyaddress.length >= 3){
            // console.log(addCompany.getAttributeNames());
            setAllFieldsValid(true);
        }else{
            setAllFieldsValid(false);
        }

    }, [companyname, companyphone, companygst, companyaddress])

    return(
        <Box sx={{
            display:"none", 
            flexDirection:"column", 
            gap:"1rem"}}
            className="customer-detail-input"
            component="form">

            <TextField 
            name="companyname" 
            id="companyname" 
            label="Company Name" 
            variant="outlined" 
            value={companyname} 
            onChange={handleCompanyname}
            required
            />

            <TextField name="companyemail" id="companyemail" label="Email Id" variant="outlined" value={companyemail} onChange={handleCompanyemail}/>

            <TextField name="companyphone" id="companyphone" label="Phone Number" variant="outlined" value={companyphone} onChange={handleCompanyphone} required/>

            <TextField name="companygst" id="companygst" label="GST Number" variant="outlined" value={companygst} onChange={handleCompanygst} required/>

            <TextField
                id="companyaddress"
                label="Address"
                multiline
                rows={4}
                value={companyaddress}
                onChange={handleCompanyaddress} required/>
            {allFieldsValid?
                <MaterialButton variant="contained" handleFunction={saveCompanyDetails} id="addCompany" text="Add Company" isDisabled={false}/>:
                <MaterialButton variant="contained" id="addCompany" text="Add Company" isDisabled={true} />
            }
            <MaterialButton variant="outlined" handleFunction={hideInputFields} id="addCompanyCancel" text="Cancel"/>
        </Box>
    );
}

export default CustomerDetailInput;