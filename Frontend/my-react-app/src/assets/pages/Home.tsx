import { useEffect, useState } from 'react'
import { homePage } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [user, setUser] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await homePage()

                setUser(fetchedUser.user)
            } catch (error) {
                console.error('Failed to fetch user:', error)
            }
        }

        fetchUser()
    }, [])
    const navigate = useNavigate()
    return (
        <div className="w-full">
            <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
                <h1 className="text-xl font-semibold text-gray-800">
                    IntelliSQR
                </h1>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                    Logout
                </button>
            </header>

            <main className="p-6">
                {user ? (
                    <p>
                        <span className="font-bold text-2xl">Welcome </span>
                        {user}
                    </p>
                ) : (
                    <p>Loading...</p>
                )}
            </main>
        </div>
    )
}

export default Home
