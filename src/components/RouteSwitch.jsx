import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import CustomerDetail from "./CustomerDetail";
import Mainpage from "./Mainpage";
import Invoice from "./Invoice";

const RouteSwitch = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginComponent/>}/>
                <Route path="/mainpage" element={<Mainpage/>}/>
                <Route path="/customerdetail" element={<CustomerDetail/>}/>
                <Route path="/invoice" element={<Invoice/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteSwitch;