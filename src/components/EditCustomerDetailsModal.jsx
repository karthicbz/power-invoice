import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MaterialButton from './Button';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export default function EditCustomerDetailsModal({open, handleClose, customerDetails, refreshCustomerList}) {
    const [companyname, setCompanyname] = useState('');
    const [companyemail, setCompanyemail] = useState('');
    const [companyphone, setCompanyphone] = useState('');
    const [companygst, setCompanygst] = useState('');
    const [companyaddress, setCompanyaddress] = useState('');
    const [companyId, setCompanyId] = useState('');

    useEffect(()=>{
        setCompanyname(customerDetails.name);
        setCompanyemail(customerDetails.email);
        setCompanyphone(customerDetails.phNumber);
        setCompanygst(customerDetails.gstNumber);
        setCompanyaddress(customerDetails.address);
        setCompanyId(customerDetails._id);
    },[customerDetails])

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

    async function handleUpdate(){
        const response = await toast.promise(
            fetch(`http://localhost:3001/powerinvoice/customers/${companyId}/update`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            mode:'cors',
            body:JSON.stringify({
                companyname:`${companyname}`, 
                companyemail:`${companyemail}`, 
                companyphone:`${companyphone}`, 
                companygst:`${companygst}`, 
                companyaddress:`${companyaddress}`,
            })
        }),
        {
            pending:'Updating customer details',
        },{
            position:'bottom-center',
        });
        const data = await response.json();
        if(data.status !== 'success'){
            // console.log(data.data);
            let errMsg = '';
            data.data.errors.map(e=>{
                errMsg = '';
                return errMsg += `${e.msg}\n`;
            })
            toast.error(errMsg, {
                position:'bottom-center',
                autoClose:2000,
                closeOnClick:true,
            })
        }else{
            handleClose();
            refreshCustomerList();
            toast.success(data.data,{
                position:'bottom-center',
                autoClose:2000,
                closeOnClick:true,
            })
        }
    }

    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
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

                <TextField name="companyphone" id="companyphone" label="Phone Number" variant="outlined" value={companyphone} onChange={handleCompanyphone}/>

                <TextField name="companygst" id="companygst" label="GST Number" variant="outlined" value={companygst} onChange={handleCompanygst}/>

                <TextField
                    id="companyaddress"
                    label="Address"
                    multiline
                    rows={4}
                    value={companyaddress}
                    onChange={handleCompanyaddress}/>

                <MaterialButton variant="outlined" text="Update" handleFunction={handleUpdate}/>
                <MaterialButton variant="outlined" text="Cancel" handleFunction={handleClose}/>
            </Box>
        </Modal>
        </div>
    );
}