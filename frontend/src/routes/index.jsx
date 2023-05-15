import { Routes, Route } from "react-router-dom";
//Components
import Home from "../pages/Home.jsx";
export default function AppRoute() {
    const routes = [
        {
            path: "/",
            Component: Home
        }
    ];
    return (
        <>
            <Routes>
                {routes.map(({ path, Component }, i) => {
                    return (
                        <Route key={i} path={path} element={<Component />} />
                    )
                })}
            </Routes>

        </>
    )
}