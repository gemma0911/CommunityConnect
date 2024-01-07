import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [error,setError] = useState('')
    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            if(!username || !password) {
                setError("Tài khoản hoặc mật khẩu không chính xác")
                return;
            }

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
                console.log('Login successful');
                data = await response.json();
                localStorage.setItem('name', data.name);
                localStorage.setItem('id', data.id);
                localStorage.setItem('role', data.role);
                navigate('/')
            } else {
                setError("Tài khoản hoặc mật khẩu không chính xác")
                console.error('Login failed');

            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <div class="bg-gray-100 flex justify-center items-center h-screen m-[50px]">
                <div class="w-1/2 h-screen hidden lg:block">
                    <img src="https://www.business-opportunities.biz/wp-content/uploads/2020/05/loaner-cars-2ab.jpg" alt="Placeholder Image" class="object-cover w-full h-full" />
                </div>
                <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 class="text-2xl font-semibold mb-4">ĐĂNG NHẬP</h1>
                    <div>

                        <div class="mb-4">
                            <label for="username" class="block text-gray-600">Tài khoản</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                        </div>

                        <div class="mb-4">
                            <label for="password" class="block text-gray-600">Mật khẩu</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                        </div>
                        {
                            error ? (
                                <h1 className="flex justify-center text-red-500 m-[20px]">{error}</h1>
                            ) : (
                                <></>
                            )
                        }
                        <button type="button" onClick={handleLogin} class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    </div>

                    <div class="mt-6 text-blue-500 text-center">
                        <div onClick={()=>navigate('/dang-ky')} class="hover:underline">Đăng kí</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login