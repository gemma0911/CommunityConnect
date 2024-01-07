import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ChauffeurService = () => {
    const navigate = useNavigate()
    const [driver, setDriver] = useState([])
    const { carId } = useParams();
    const [carData, setCarData] = useState({
        price: 0
    });
    const [dataFrom, setDataForm] = useState({
        user: {
            id: ''
        },
        name: '',
        email: '',
        phone: '',
        start: '',
        finish: '',
        car: {
            id: ''
        },
        driver: {
            id: ''
        }
    });

    const handleSave = async () => {
        try {
            if (!localStorage.getItem("id")) {
                alert("Vui lòng đăng nhập");
                navigate('/dang-nhap')
                return;
            }

            if (!dataFrom.name || !dataFrom.email || !dataFrom.start || !dataFrom.finish) {
                alert("Vui lòng điền đầy đủ thông tin");
                return;
            }

            if (dataFrom.start > dataFrom.finish) {
                alert("Ngày thuê không thể sau ngày trả");
                return;
            }

            if (!carData || !carData.price) {
                alert("Không có dữ liệu giá xe");
                return;
            }

            const daysDifference = calculateDaysDifference(dataFrom.start, dataFrom.finish);
            const totalSalary = daysDifference * carData.price;

            const response = await fetch(`http://localhost:8080/addChauffeurService`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        id: localStorage.getItem('id')
                    },
                    name: dataFrom.name,
                    email: dataFrom.email,
                    phone: dataFrom.phone,
                    start: dataFrom.start,
                    finish: dataFrom.finish,
                    car: {
                        id: carId
                    },
                    driver: {
                        id: dataFrom.driver.id
                    },
                    salary: totalSalary
                }),
            });

            if (response.ok) {
                alert("Thuê thành công");
                setDataForm({
                    user: {
                        id: ''
                    },
                    name: '',
                    email: '',
                    phone: '',
                    start: '',
                    finish: '',
                    car: {
                        id: ''
                    },
                    driver: {
                        id: ''
                    }
                });

            } else {
                alert("Lỗi khi thực hiện thuê xe");
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/getCarById/${carId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCarData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert("Có lỗi xảy ra khi lấy dữ liệu xe. Vui lòng thử lại sau.");
            }
        };
        fetchData();
    }, [carId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prevData) => ({ ...prevData, [name]: value }));
    };
    const calculateDaysDifference = (startDateStr, endDateStr) => {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    };
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
            <div className="isolate bg-white px-6 lg:px-8">
                <div className="mx-auto mt-10 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label for="first-name" className="block text-sm font-semibold leading-6 text-black">Họ và tên</label>
                            <div className="mt-2.5">
                                <input
                                    value={dataFrom.name}
                                    onChange={handleChange} type="text" name="name" id="name" autocomplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="last-name" className="block text-sm font-semibold leading-6 text-black">Số điện thoại</label>
                            <div className="mt-2.5">
                                <input
                                    value={dataFrom.phone}
                                    onChange={handleChange}
                                    type="text" name="phone" id="phone" autocomplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label for="company" className="block text-sm font-semibold leading-6 text-black">Email</label>
                            <div className="mt-2.5">
                                <input
                                    value={dataFrom.email}
                                    onChange={handleChange}
                                    type="text" name="email" id="email" autocomplete="organization" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label for="first-name" className="block text-sm font-semibold leading-6 text-black">Ngày thuê</label>
                            <div className="mt-2.5">
                                <input
                                    value={dataFrom.start}
                                    onChange={handleChange}
                                    type="date" name="start" id="start" autocomplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="last-name" className="block text-sm font-semibold leading-6 text-black">Ngày trả</label>
                            <div className="mt-2.5">
                                <input
                                    value={dataFrom.finish}
                                    onChange={handleChange}
                                    type="date" name="finish" id="finish" autocomplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="last-name" className="block text-sm font-semibold leading-6 text-black">Chọn tài xế</label>
                            <div className="mt-2.5">
                                <div className="relative mt-2.5">
                                    <select
                                        value={dataFrom.driver.id}
                                        onChange={(e) => setDataForm((prevData) => ({ ...prevData, driver: { id: e.target.value } }))}
                                        id="country" name="country" autocomplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option disabled >Chọn Tài Xế</option>
                                        {
                                            driver.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="last-name" className="block text-sm font-semibold leading-6 text-black">Tổng tiền</label>
                            <div className="mt-2.5">
                                <input disabled
                                    value={calculateDaysDifference(dataFrom.start, dataFrom.finish) * carData.price ? (calculateDaysDifference(dataFrom.start, dataFrom.finish) * carData.price).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                                    type="text" name="last-name" id="last-name" autocomplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button onClick={handleSave} type="submit" className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng ký</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChauffeurService