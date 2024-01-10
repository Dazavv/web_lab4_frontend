import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import LoginPage from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContent from "./pages/AuthContent";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { AuthorizationStore } from './utils/authorizationStore';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
const router = createBrowserRouter(
    [{path: "/", element: <LoginPage />}, {path: "/main", element: <AuthContent />}
    ]
);

root.render(
    <React.StrictMode>
        <Provider store={AuthorizationStore}>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

