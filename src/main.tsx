import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { FinanceProvider } from './contexts/FinanceContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FinanceProvider>
            <RouterProvider router={router} />
        </FinanceProvider>
    </React.StrictMode>,
)
