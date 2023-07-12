import PermanentDrawer from "./PermanentDrawer";
import { ParentGrid } from "./CustomerDetail";
import { ChildGrid } from "./CustomerDetail";
import MaterialTextField from "./TextField";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import { drawerWidth } from "./PermanentDrawer";
import InvoiceModal from "./InvoiceModal";
import { useState, useEffect } from "react";


const Invoice = ()=>{
    const [open, setOpen] = useState(false);

    function closeModal(){
        setOpen(false);
    }

    function openModal(){
        setOpen(true);
    }
    return(
        <ParentGrid>
            <PermanentDrawer/>
            <ChildGrid>
                <MaterialTextField id="InvoiceSearchField" variant="outlined" label="Search Invoice" placeholder="Invoice no"/>
                <Fab 
                color="primary" 
                aria-label="add" 
                sx={{position:'absolute', bottom:'30px', left:`${drawerWidth+30}px`}}
                onClick={openModal}>
                    <AddIcon/>
                </Fab>
            </ChildGrid>
            <InvoiceModal open={open} handleClose={closeModal}/>
        </ParentGrid>
    )
}

export default Invoice;