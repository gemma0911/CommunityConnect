import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Car = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [carData, setCarData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/getAllCar');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCarData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCarData = carData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <div className='flex items-center justify-center min-h-min bg-gradient-to-bl p-[20px] '>
                <div className="flex w-[500px] lg:ml-[150px] lg:mr-[150px] mx-10 rounded border-blue-500 border-[2px] bg-white">
                    <input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search..."
                    />
                    <button type="submit" className="m-2 rounded bg-blue-600 px-4 py-2 text-white">
                        <svg
                            className="fill-current h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            id="Capa_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 56.966 56.966"
                            style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                            xmlSpace="preserve"
                            width="512px"
                            height="512px"
                        >
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="bg-gradient-to-bl from-blue-50 to-violet-50 flex items-center justify-center min-h-screen">
                <div class="container mx-auto p-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {filteredCarData.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg border p-4">
                                <img src={item.images} alt="Placeholder Image" className="w-full h-48 rounded-md object-cover" />
                                <div className="px-1 py-4">
                                    <div className="font-bold text-xl mb-2">{item.name}</div>
                                    <p className="text-gray-700 text-base">
                                        This is a simple blog card example using Tailwind CSS.
                                    </p>
                                </div>
                                <div className="px-1 py-1">
                                    <div className="text-red-400">Giá : {item.price ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'} / ngày</div>
                                </div>
                                <div className="px-1 py-4">
                                    <Link to={`/chi-tiet-xe/${item.id}`}><div className="text-blue-500 hover:underline">Xem thêm</div></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Car