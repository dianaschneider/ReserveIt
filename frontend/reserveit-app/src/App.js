import {BrowserRouter, Route, Routes} from "react-router-dom";
import RestaurantClientMainPage from "./clientApp/mainPage/RestaurantClientMainPage";
import RestaurantManagementMainPage from "./managementApp/mainPage/RestaurantManagementMainPage";
import {useState} from "react";
import LoginForm from "./managementApp/landingPage/LoginForm";
import RegisterForm from "./managementApp/landingPage/RegisterForm";

function App() {
    const [maxTableNumber, setMaxTableNumber] = useState(20);
    const [userId, setUserId] = useState(0);
    const [admin, setAdmin] = useState(false);

    const updateMaxTableNumber = (number) => {
        setMaxTableNumber(number);
    }
    const initialiseUser = (user, admin) => {
        setUserId(user);
        setAdmin(admin)
        localStorage.setItem('userId', user);
        localStorage.setItem('admin', admin);
    }

    const refreshMainApp = (userId, admin) => {
        setUserId(userId)
        setAdmin(admin)
        localStorage.setItem('userId', userId);
        localStorage.setItem('admin', admin);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm initialiseUser={initialiseUser}/>}/>
                <Route path="/register" element={<RegisterForm />}/>
                <Route path="/client-app/:restaurantId/tables/:tableIndex"
                       element={<RestaurantClientMainPage maxTableNumber={maxTableNumber} userToken={userId}/>}/>
                <Route path="/restaurant/:restaurantId"
                       element={<RestaurantManagementMainPage updateMaxTableNumber={updateMaxTableNumber}
                                                              userId={userId}
                                                              admin={admin}
                                                              refreshApp={refreshMainApp}
                       />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

/*
Login [NO FUTURE IMPROVEMENTS]
* works fine - no bugs - atat de staff cat si admin

Register [NO FUTURE IMPROVEMENTS]
* Register restaurant - works fine - bug daca se da refresh - logica secventiala cu adminul
* Register admin - works fine - no bugs

RestaurantManagementMainPage
* Create Table Configuration - works fine - no bugs
* Configure Menu - works fine - no bugs
* Configure Staff - works fine - no bugs
* Table Plan -  works fine - no bugs
* Active Orders -  works fine - no bugs
* Table Info -  works fine - bug waiter not showing right+ same as above

RestaurantClientMainPage [ONLY 1 FUTURE IMPROVEMENT!!!]
* Menu Component - works fine - no bugs + make titles of categories look better
* Cart component  -  works fine - no bugs
* Notifications - works fine - no bugs
* */