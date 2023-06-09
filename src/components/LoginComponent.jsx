import MaterialTextField from "./TextField";
import MaterialButton from "./Button";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

const LoginComponent = ()=>{
    return(
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            }}>
                <AppBar><Toolbar><Typography variant="h4" component="div">Power-Invoice</Typography></Toolbar></AppBar>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                }}>
                <MaterialTextField className="login-textfield" label="Login Id" variant="outlined" type="input"/>
                <MaterialTextField className="login-textfield" label="Password" variant="outlined" type="password"/>
                <Link to={'/mainpage'}><MaterialButton variant="contained" text="Login"/></Link>
                </Box>
        </Box>
    )
}

export default LoginComponent;