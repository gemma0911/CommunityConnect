import { useEffect, useState } from "react"

const Driver = () => {
    const [driver, setDriver] = useState([])
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/getAllDriver');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDriver(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div class="relative flex lg:mt-[50px] flex-col justify-center overflow-hidden bg-gray- py-6 sm:py-6">
                <div class="mx-auto max-w-screen-xl px-4 w-full">
                    <div class="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {
                            driver.map((item) => {
                                return (

                                    <div class="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm">
                                        <a href="" class="hover:text-orange-600 absolute z-30 top-2 right-0 mt-2 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </a>
                                        <a href="" class="z-20 absolute h-full w-full top-0 left-0 ">&nbsp;</a>
                                        <div class="h-auto overflow-hidden">
                                            <div class="h-44 overflow-hidden relative">
                                                <img src="https://th.bing.com/th/id/OIP.NE0xQe-GwrtO2i35JeeKSgHaE9?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
                                            </div>
                                        </div>
                                        <div class="bg-white py-4 px-3">
                                            <h3 class="text-xs mb-2 font-medium">{item.name}</h3>
                                            <div class="flex justify-between items-center">
                                                <p class="text-xs font-medium text-black">
                                                    SDT : {item.phone}
                                                </p>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <p class="text-xs font-medium text-black mt-[5px]">
                                                    ĐỊA CHỈ : {item.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Driver