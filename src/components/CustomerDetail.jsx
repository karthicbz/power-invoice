import PermanentDrawer from "./PermanentDrawer";
import { Box, TextField } from "@mui/material";
import { drawerWidth } from "./PermanentDrawer";
import { styled } from "styled-components";
import CustomerDetailInput from "./CustomerDetailInput";
import CustomerDetailsList from "./CustomerDetailsList";
import { useEffect, useState } from "react";

const ParentGrid = styled.div`
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

const ChildGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;

    &>.customer-input-section{
        grid-column: 1/2;
        grid-row: 1/2;
        padding: 0 1rem;
        display: grid;
        gap: 1rem;
    }

    &>.customers-list{
        grid-column: 1/2;
        grid-row: 2/3;
    }
`;


const CustomerDetail = ()=>{
    const [customerDetails, setCustomerDetails] = useState([]);

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

    useEffect(()=>{
        getCustomerDetails();
    }, [])

    return(
        <ParentGrid>
            <PermanentDrawer/>
            <ChildGrid className="customer-info">
                <Box className="customer-input-section">
                    <TextField id="outlined-basic" variant="outlined" placeholder="Create New Customer" className="newCustomer" onClick={showInputFields}/>
                    <CustomerDetailInput/>
                </Box>
                <Box className="customers-list">
                    {/* <p>Customer details</p> */}
                    <CustomerDetailsList data={customerDetails}/>
                </Box>
            </ChildGrid>
        </ParentGrid>
    );
};

export default CustomerDetail;