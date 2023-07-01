import { Button } from "@mui/material";

const MaterialButton = ({variant, text, isDisabled, handleFunction})=>{
    return (isDisabled)?
        <Button variant={variant} disabled>{text}</Button>:
        <Button variant={variant} onClick={handleFunction}>{text}</Button>
}

export default MaterialButton;