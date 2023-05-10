import SideBar from "./components/SideBar";
import ItemView from "./components/ItemView";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App()
{
    return (
        <>
            <SideBar/>
            <div className="main-page">
                <Routes>
                    <Route path="item/:itemName">
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;