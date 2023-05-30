import { TextField } from "@mui/material";

const MaterialTextField = ({id=undefined, label, variant, className, type})=>{
    return(
        <TextField id={id} className={className} label={label} variant={variant} type={type}/>
    );
}

export default MaterialTextField;