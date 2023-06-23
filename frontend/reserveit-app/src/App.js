import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./managementApp/landingPage/LandingPage";
import RestaurantClientMainPage from "./clientApp/mainPage/RestaurantClientMainPage";
import RestaurantManagementMainPage from "./managementApp/mainPage/RestaurantManagementMainPage";
import {useState} from "react";

function App() {
    const [maxTableNumber, setMaxTableNumber] = useState(20);
    const [userToken, setUserToken] = useState('');

    const updateMaxTableNumber = (number) => {
        setMaxTableNumber(number);
    }
    const initialiseUserToken = (token) => {
        setUserToken(token);
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage initialiseUserToken={initialiseUserToken}/>}/>
                <Route path="/:restaurantId/tables/:tableId" element={<RestaurantClientMainPage maxTableNumber={maxTableNumber} userToken={userToken}/>}/>
                <Route path="/restaurant/:restaurantId" element={<RestaurantManagementMainPage updateMaxTableNumber={updateMaxTableNumber} userToken={userToken}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
