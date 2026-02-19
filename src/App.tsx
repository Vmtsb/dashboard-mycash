import { Outlet } from 'react-router-dom'

function App() {
    return (
        <div className="min-h-screen w-full bg-neutral-200">
            {/* Sidebar/Header components will be added here in following prompts */}
            <main className="transition-all duration-300">
                <Outlet />
            </main>
        </div>
    )
}

export default App
