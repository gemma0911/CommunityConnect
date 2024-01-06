import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const Header = () => {

    const navigate = useNavigate()
    const [click, setClick] = useState(false);

    const logoutHandle = () => {
        localStorage.clear()
        setClick(false)
    }

    return (
        <>
            <div class="flex flex-wrap">
                <section class="relative mx-auto">
                    <nav class="flex justify-between bg-gray-900 text-white w-screen">
                        <div class="px-5 xl:px-12 py-6 flex w-full items-center">
                            <a class="text-3xl font-bold font-heading" href="#">
                                <img class="h-9" src="logo.png" alt="logo" />
                            </a>
                            <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                                <li onClick={()=>navigate('/')}><div class="hover:text-gray-200" href="/">Trang chủ</div></li>
                                <li onClick={()=>navigate('/thue-xe-tu-lai')}><div class="hover:text-gray-200" href="#">Thuê Xe tự lái</div></li>
                                <li><a class="hover:text-gray-200" href="#">Xe có tài xế</a></li>
                                <li><a class="hover:text-gray-200" href="#">Liên hệ</a></li>
                            </ul>
                            <div class="hidden xl:flex items-center space-x-5">
                                <a class="flex items-center hover:text-gray-200" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span class="flex absolute -mt-5 ml-4">
                                        <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                                        </span>
                                    </span>
                                </a>
                                <a class="flex items-center hover:text-gray-200" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </a>
                                <div class="relative inline-block text-left">
                                    <div>
                                        <button onClick={() => setClick(!click)} type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            {
                                                localStorage.getItem('name') ? (
                                                    <>{localStorage.getItem('name')}</>
                                                ) : (
                                                    <>
                                                        <div onClick={() => navigate('/dang-nhap')}>
                                                            <a>Đăng nhập</a>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    {
                                        click && localStorage.getItem('name') ? (
                                            <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                                <div class="py-1" role="none">
                                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                                                    <div>
                                                        <button type="button" onClick={logoutHandle} class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>


                            </div>
                        </div>
                        <a class="xl:hidden flex mr-6 items-center" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="flex absolute -mt-5 ml-4">
                                <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                                </span>
                            </span>
                        </a>
                        <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </a>
                    </nav>

                </section>
            </div>
        </>
    )
}

export default Header