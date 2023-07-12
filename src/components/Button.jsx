import { Button } from "@mui/material";

const MaterialButton = ({variant, text, isDisabled=false, handleFunction, dataSetName, dataSetId})=>{
    return (isDisabled)?
        <Button variant={variant} disabled>{text}</Button>:
        <Button variant={variant} onClick={handleFunction} data-listname={dataSetName} data-listid={dataSetId}>{text}</Button>
}

export default MaterialButton;