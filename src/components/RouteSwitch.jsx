import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import Mainpage from "./Mainpage";

const RouteSwitch = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginComponent/>}/>
                <Route path="/mainpage" element={<Mainpage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteSwitch;