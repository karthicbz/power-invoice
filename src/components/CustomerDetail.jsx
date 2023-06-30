import PermanentDrawer from "./PermanentDrawer";
import { TextField } from "@mui/material";

const CustomerDetail = ()=>{
    return(
        <div>
            <PermanentDrawer/>
            <TextField id="outlined-basic" variant="outlined" placeholder="Create New Customer"/>
        </div>
    );
};

export default CustomerDetail;