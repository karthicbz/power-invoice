import { Button } from "@mui/material";

const MaterialButton = ({variant, text})=>{
    return(
        <Button variant={variant}>{text}</Button>
    )
}

export default MaterialButton;