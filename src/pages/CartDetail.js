import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CartDetail = () => {
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false);

    // Lây dữ liệu id xe
    const { carId } = useParams();
    const [carData, setCarData] = useState(null);
    const [dataFrom, setDataForm] = useState({
        user: {
            user_id: ''
        },
        name: '',
        cccd: '',
        email: '',
        phone: '',
        start: '',
        finish: '',
        car: {
            car_id: ''
        },
        driver : ''
    });

    const closeHandle = () => {
        setShowForm(!showForm);
        setDataForm({
            user: {
                user_id: ''
            },
            name: '',
            cccd: '',
            email: '',
            phone: '',
            start: '',
            finish: '',
            car: {
                car_id: ''
            },
        });
    };

    // Thuê xe tự lái
    const handleSave = async () => {
        try {
            if (!localStorage.getItem("id")) {
                alert("Vui lòng đăng nhập");
                return;
            }

            if (!dataFrom.name || !dataFrom.cccd || !dataFrom.email || !dataFrom.start || !dataFrom.finish) {
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

            const response = await fetch(`http://localhost:8080/addCarRental`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        id: localStorage.getItem('id')
                    },
                    name: dataFrom.name,
                    cccd: dataFrom.cccd,
                    email: dataFrom.email,
                    phone: dataFrom.phone,
                    start: dataFrom.start,
                    finish: dataFrom.finish,
                    car: {
                        id: carId
                    },
                    salary: totalSalary
                }),
            });

            if (response.ok) {
                alert("Thuê thành công");
                setShowForm(!showForm);
                setDataForm({
                    user: {
                        user_id: ''
                    },
                    name: '',
                    cccd: '',
                    email: '',
                    phone: '',
                    start: '',
                    finish: '',
                    car: {
                        car_id: ''
                    },
                });
            } else {
                alert("Lỗi khi thực hiện thuê xe");
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };

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

    return (
        <>
            {
                carData && (
                    <div class="min-w-screen min-h-screen bg-yellow-300 flex items-center lg:p-10 overflow-hidden relative">
                        <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                            <div class="md:flex items-center -mx-10">
                                <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                                    <div class="relative">
                                        <img src={carData.images} class="w-full relative z-10" alt="" />
                                        <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                                    </div>
                                </div>
                                <div class="w-full md:w-1/2 px-10">
                                    <ul class="list-disc">
                                        <li className="font-medium">Tên : {carData.name}</li>
                                        <li>Biển số : {carData.numberPlate}</li>
                                        <li>Hãng xe : {carData.brand.name}</li>
                                        <li>Thông tin : {carData.info}</li>
                                    </ul>
                                    <div>
                                        <div class="inline-block align-bottom mr-5 m-[10px]">
                                            <span class="text-2xl leading-none font-medium align-baseline">Giá : </span>
                                            <span class="font-bold text-2xl leading-none align-baseline">{carData.price ? carData.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'} / ngày</span>
                                            {/* <span class="text-2xl leading-none align-baseline">vnđ</span> */}
                                        </div>
                                        <div class="inline-block align-bottom">
                                            <button onClick={() => navigate(`/thue-xe-co-tai-xe/${carId}`)} class="m-[20px] bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i class="mdi mdi-cart -ml-2 mr-2"></i>THUÊ CÓ TÀI XẾ</button>
                                            <button onClick={() => setShowForm(!showForm)} class="m-[20px] bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i class="mdi mdi-cart -ml-2 mr-2"></i>THUÊ TỰ LÁI</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showForm ? (
                    <div class="absolute z-10 top-0 left-0 w-full h-full border-[2px] flex items-center justify-center">
                        <div class="bg-slate-100 p-6 rounded-md shadow-md border-black border-[2px]">
                            <div>
                                <div class="flex items-center mb-5 ">
                                    <label for="name" class="inline-block w-20 mr-6 text-right  font-bold text-gray-600">Họ và tên</label>
                                    <input type="text" id="name" name="name" placeholder="Họ và tên"
                                        value={dataFrom.name}
                                        onChange={handleChange}
                                        class="flex-1 py-2 px-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-gray-400  outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right    font-bold text-gray-600">CCCD/CMND</label>
                                    <input type="text" id="cccd" name="cccd" placeholder="Số CCCD/CMND"
                                        value={dataFrom.cccd}
                                        onChange={handleChange}
                                        class="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400         text-gray-600 placeholder-gray-400 outline-none" />
                                </div>
                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right  font-bold text-gray-600">Email</label>
                                    <input type="text" id="email" name="email" placeholder="Email"
                                        value={dataFrom.email}
                                        onChange={handleChange}
                                        class="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-gray-400  outline-none" />
                                </div>
                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right  font-bold text-gray-600">Điện thoại</label>
                                    <input type="text" id="phone" name="phone" placeholder="Số điện thoại"
                                        value={dataFrom.phone}
                                        onChange={handleChange}
                                        class="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-gray-400 outline-none" />
                                </div>
                                <div class="flex items-center mb-5">

                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600">Ngày thuê</label>
                                    <input type="date" id="start" name="start" placeholder="Ngày thuê"
                                        value={dataFrom.start}
                                        onChange={handleChange}
                                        class="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-gray-400 outline-none" />
                                </div>

                                <div class="flex items-center mb-5">

                                    <label for="number" class="inline-block w-20 mr-6 text-right font-bold text-gray-600">Ngày trả</label>
                                    <input value={dataFrom.finish}
                                        onChange={handleChange} type="date" id="finish" name="finish" placeholder="Ngày trả"
                                        class="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right  font-bold text-gray-600">Tổng tiền</label>
                                    <input type="text" id="salary" name="salary" placeholder="Tổng tiền"
                                        value={calculateDaysDifference(dataFrom.start,dataFrom.finish)*carData.price ? (calculateDaysDifference(dataFrom.start,dataFrom.finish)*carData.price).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                                        class="flex-1 px-2 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-gray-400 outline-none" />
                                </div>

                                <div class="text-right">
                                    <button onClick={handleSave} class="py-3 px-8 bg-green-400 text-white font-bold">Submit</button>
                                    <button onClick={closeHandle} class="py-3 px-8 bg-red-800 text-white font-bold ml-[20px]">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}
export default CartDetail