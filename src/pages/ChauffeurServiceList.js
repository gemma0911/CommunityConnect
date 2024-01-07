import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChauffeurServiceList = () => {

    const [carData, setCarData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('id')) {
            navigate('/')
        }
    }, [localStorage.getItem('id')])

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/findChauffeurService/${localStorage.getItem('id')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCarData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteHandle = async (idCar) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteChauffeurService/${idCar}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert("Delete successful");
            } else {
                const errorData = await response.json();
                console.error('Error deleting car:', errorData);
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    useEffect(() => {
        fetchData();
    })
    return (
        <>
                   <table class="border-collapse lg:w-[1400px] w-[500px] mx-auto m-[20px]">
                <thead>
                    <tr>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Tên xe</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Biển số</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Hãng</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">SDT</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Tên tài xế</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">EMAIL</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">NGÀY THUÊ</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">NGÀY TRẢ</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Tình trạng</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Tổng tiền</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carData.map((item) => {
                            return (
                                <tr key={item.id} class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Company name</span>
                                        {item.name}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                        {item.car.numberPlate}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                        {item.car.brand.name}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                        {item.phone}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                        {item.driver.name}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                        {item.email}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                        {item.start}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                        {item.finish}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">

                                        {
                                            (item.status == "YES") ? (
                                                <>
                                                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                                                    <span class="rounded bg-green-600 py-1 px-3 text-xs font-bold">Đã xử lý</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                                                    <span class="rounded bg-red-400 py-1 px-3 text-xs font-bold">Đang xử lý</span>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Country</span>
                                        {item.salary ? item.salary.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                                    </td>
                                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                        {
                                            (item.status == "YES") ? (
                                                <>
                                                   <button class="rounded bg-green-600 py-1 px-3 text-xs font-bold hover:bg-blue-800">Không thể xóa</button>
                                                </>
                                            ) : (
                                                <>
                                                   <button onClick={() => deleteHandle(item.id)} class="rounded bg-red-400 py-1 px-3 text-xs font-bold hover:bg-blue-800">Xóa</button>
                                                </>
                                            )
                                        }
            
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ChauffeurServiceList