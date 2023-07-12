import { TextField } from "@mui/material";

const MaterialTextField = ({id=undefined, label, variant, className, type, placeholder, handleChangeFunc, value, handleFocusFunc})=>{
    return(
        <TextField 
        id={id} 
        className={className} 
        label={label} 
        variant={variant} 
        type={type} 
        placeholder={placeholder} 
        onChange={handleChangeFunc}
        onFocus={handleFocusFunc} 
        value={value}/>
    );
}

export default MaterialTextField;