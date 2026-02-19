import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

// Temporary components for routing setup
const Dashboard = () => <div className="p-8"><h1>Dashboard</h1></div>
const Goals = () => <div className="p-8"><h1>Objetivos</h1></div>
const Cards = () => <div className="p-8"><h1>Cartões</h1></div>
const Transactions = () => <div className="p-8"><h1>Transações</h1></div>
const Profile = () => <div className="p-8"><h1>Perfil</h1></div>

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'goals', element: <Goals /> },
            { path: 'cards', element: <Cards /> },
            { path: 'transactions', element: <Transactions /> },
            { path: 'profile', element: <Profile /> },
        ],
    },
])
