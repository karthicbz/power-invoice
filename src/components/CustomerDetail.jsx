import PermanentDrawer from "./PermanentDrawer";
import { TextField } from "@mui/material";
import { drawerWidth } from "./PermanentDrawer";
import { styled } from "styled-components";
import CustomerDetailInput from "./CustomerDetailInput";
import CustomerDetailsList from "./CustomerDetailsList";
import { useEffect, useState } from "react";
import BoxModal from "./modal";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditCustomerDetailsModal from "./EditCustomerDetailsModal";


export const ParentGrid = styled.div`
    display: grid;
    grid-template-columns: ${drawerWidth}px 1fr;
    grid-template-rows: 1fr;
    height: 100%;
    align-items: start;
    padding-top: 1rem;

    &>.permanent-drawer{
        grid-column: 1/2;
        grid-row: 1/2;
    }

    &>.customer-info{
        grid-column: 2/3;
        grid-row: 1/2;
    }
`;

export const ChildGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
`;

const StyledInputSection = styled(ChildGrid)`
    grid-column: 1/2;
    grid-row: 1/2;
    padding: 0 1rem;
    display: grid;
    gap: 1rem;
`;

const StyledCustomerList = styled(ChildGrid)`
    grid-column: 1/2;
    grid-row: 2/3;
`;


const CustomerDetail = ()=>{
    const [customerDetails, setCustomerDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customerToUpdate, setCustomerToUpdate] = useState({});

    function showInputFields(e){
        const inputFields = document.querySelector('.customer-detail-input');
        e.target.parentNode.style.display = 'none';
        inputFields.style.display = 'flex';
    }

    async function getCustomerDetails(){
        const response = await fetch('http://localhost:3001/powerinvoice/customers', {mode:'cors'});
        const data = await response.json();
        // console.log(data);
        setCustomerDetails(data);
    }

    async function deleteCustomerDetail(){
        setOpen(false);
        const response = await toast.promise(
            fetch(`http://localhost:3001/powerinvoice/customers/${customerId}/delete`, {mode:'cors'}),
            {pending:'Deleting customer'},
            {position:'bottom-center'}
        );
        const data = await response.json();
        if(data.status === 'success'){
            await getCustomerDetails();
            toast.success(data.data,{
                position:'bottom-center',
                autoClose: 5000,
                closeOnClick: true,
            })
        }else{
            toast.error(data.data,{
                position:'bottom-center',
                autoClose: 5000,
                closeOnClick: true,
            })
        }
    }

    function handleOpen(e){
        setCustomerName(e.target.dataset.listname);
        setCustomerId(e.target.dataset.listid);
        setOpen(true);
    }

    function handleClose(){
        setOpen(false);
    }

    function editModalOpen(e){
        customerDetails.filter(cd=>{
            if(cd._id === e.target.dataset.listid){
                return setCustomerToUpdate(cd);
            }
            return null;
        })
        setOpenEditModal(true);
    }

    function editModalClose(){
        setCustomerToUpdate({});
        setOpenEditModal(false);
    }

    useEffect(()=>{
        getCustomerDetails();
    }, [])

    return(
        <ParentGrid>
            <PermanentDrawer/>
            <ChildGrid className="customer-info">
                <StyledInputSection className="customer-input-section">
                    <TextField id="outlined-basic" variant="outlined" placeholder="Create New Customer" className="newCustomer" onClick={showInputFields}/>
                    <CustomerDetailInput refreshCustomerList={getCustomerDetails}/>
                </StyledInputSection>
                <StyledCustomerList className="customers-list">
                    {/* <p>Customer details</p> */}
                    <CustomerDetailsList data={customerDetails} handleOpenFunc={handleOpen} handleEditOpenFunc={editModalOpen}/>
                </StyledCustomerList>
                <BoxModal open={open} handleClose={handleClose} customerName={customerName} handleDelete={deleteCustomerDetail}/>
                <EditCustomerDetailsModal open={openEditModal} handleClose={editModalClose} customerDetails={customerToUpdate} refreshCustomerList={getCustomerDetails}/>
            </ChildGrid>
            <ToastContainer/>
        </ParentGrid>
    );
};

export default CustomerDetail;