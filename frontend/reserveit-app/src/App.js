import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./managementApp/landingPage/LandingPage";
import RestaurantClientMainPage from "./clientApp/RestaurantClientMainPage";
import RestaurantManagementMainPage from "./managementApp/mainPage/RestaurantManagementMainPage";
import {useState} from "react";

function App() {
    const [maxTableNumber, setMaxTableNumber] = useState(20);

    const updateMaxTableNumber = (number) => {
        setMaxTableNumber(number);
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/tables/:tableId" element={<RestaurantClientMainPage/>}/>
                <Route path="/restaurant"
                       element={<RestaurantManagementMainPage updateMaxTableNumber={updateMaxTableNumber}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
