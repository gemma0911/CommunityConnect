import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [toast, setToast] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            if (response.ok) {
                alert('oke')
                console.log('Login successful');
                data = await response.json();
                localStorage.setItem('name', data.name);
                localStorage.setItem('id', data.id);
                navigate('/')
            } else {
                alert('ko')
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            {
                toast && (
                    <div id="toast-success" class="fixed top-4 right-4 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            <span class="sr-only">Check icon</span>
                        </div>
                        <div class="ms-3 text-sm font-normal">Item moved successfully.</div>
                        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                )
            }
            <div class="bg-gray-100 flex justify-center items-center h-screen m-[50px]">
                <div class="w-1/2 h-screen hidden lg:block">
                    <img src="https://www.business-opportunities.biz/wp-content/uploads/2020/05/loaner-cars-2ab.jpg" alt="Placeholder Image" class="object-cover w-full h-full" />
                </div>
                <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 class="text-2xl font-semibold mb-4">Login</h1>
                    <div>

                        <div class="mb-4">
                            <label for="username" class="block text-gray-600">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                        </div>

                        <div class="mb-4">
                            <label for="password" class="block text-gray-600">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                        </div>

                        <div class="mb-4 flex items-center">
                            <input type="checkbox" id="remember" name="remember" class="text-blue-500" />
                            <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
                        </div>

                        <div class="mb-6 text-blue-500">
                            <a href="#" class="hover:underline">Forgot Password?</a>
                        </div>

                        <button type="button" onClick={handleLogin} class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    </div>

                    <div class="mt-6 text-blue-500 text-center">
                        <a href="#" class="hover:underline">Sign up Here</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login