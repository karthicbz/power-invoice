import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import CustomerDetail from "./CustomerDetail";
import Mainpage from "./Mainpage";

const RouteSwitch = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginComponent/>}/>
                <Route path="/mainpage" element={<Mainpage/>}/>
                <Route path="/customerdetail" element={<CustomerDetail/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteSwitch;