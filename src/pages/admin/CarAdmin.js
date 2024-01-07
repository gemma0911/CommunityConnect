import { useEffect, useState } from "react";
import { storage, ref, uploadBytes, getDownloadURL } from "../../firebase";
import { useNavigate } from "react-router-dom";
const CarAdmin = () => {

    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [carData, setCarData] = useState([]);
    const [brand, setBrand] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');

    const [editFromData, setEditFormData] = useState({
        name: '',
        numberPlate: '',
        info: '',
        images: '',
        price: 0,
        brand: {
            id: ''
        }
    })
    const navigate = useNavigate()

    // Kiểm tra nếu không phải admin thì chuyển về trang chính
    useEffect(() => {
        if (localStorage.getItem('role')!="ROLE_ADMIN") {
            navigate('/')
        }
    }, [localStorage.getItem('role')])

    // Lấy file khi chọn
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    // Thực hiện gửi dữ liệu mới của xe về server để cập nhập
    const edit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/addCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFromData),
            });
            if (response.ok) {
                setEditFormData(null);
                setEditForm(!editForm)
                fetchData()
            } else {
                
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Thực hiện thêm mới xe
    const handleSave = async () => {
        try {
            if (selectedFile) {
                const storageRef = ref(storage, selectedFile.name);

                const snapshot = await uploadBytes(storageRef, selectedFile);
                console.log("File uploaded successfully");

                const url = await getDownloadURL(snapshot.ref);
                console.log("Download URL:", url);
                setDownloadURL(url);
                try {
                    const response = await fetch(`http://localhost:8080/addCart`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: dataFrom.name,
                            numberPlate: dataFrom.numberPlate,
                            info: dataFrom.info,
                            images: url,
                            price: dataFrom.price,
                            brand: {
                                id: dataFrom.brand.id
                            }
                        }),
                    });

                    if (response.ok) {
                        alert("Thêm thành công")
                        fetchData()
                        setShowForm(!showForm)
                    } else {
                    }
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            }
        } catch (error) {
            console.error('Error uploading or getting download URL:', error);
        }
    };

    // Để lưu dữ liệu trong form thêm xe mới
    const [dataFrom, setDataForm] = useState({
        name: '',
        numberPlate: '',
        info: '',
        images: '',
        price: 0,
        brand: {
            id: ''
        }
    });

    // Đóng form và gán dữ liệu bằng null khi đóng form thêm xe
    const closeHandle = () => {
        setShowForm(!showForm)
        setDataForm({
            name: '',
            numberPlate: '',
            info: '',
            images: '',
            price: 0,
            brand: {
                id: ''
            }
        })
    }

    // thực hiện thay đổi giá trị trong dataForm khi ta thay đổi giá trị trong ô input của form thêm mới xe
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prevData) => ({ ...prevData, [name]: value }));
    };
    
    // thực hiện thay đổi giá trị trong editFormData khi ta thay đổi giá trị trong ô input trong form edit
    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    // Lấy tất cả dữ liệu của xe
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

    // Thực hiện hàm lấy dữ liệu xe
    useEffect(() => {
        fetchData();
    }, []);

    // Thực hiện xóa xe theo id
    const deleteHandle = async (idCar) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteCar/${idCar}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert("Delete successful");
                fetchData();
            } else {
                const errorData = await response.json();
                console.error('Error deleting car:', errorData);
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    // Thực hiện lấy thương hiệu xe
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/getALlBrand');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBrand(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Đóng form edit và setEditFormData bằng dữ liệu mình cần cập nhập
    const editHandle = (e) => {
        setEditForm(!editForm)
        setEditFormData(e)
    }

    // Tìm kiếm theo tên xe
    const filteredCarData = carData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <>
            <div class="text-gray-900 bg-gray-200">
                <div class="p-4 flex">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        class="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                    >
                        Thêm
                    </button>
                    <div class="flex h-min w-min items-center justify-center">
                        <div class="lg:w-[550px] w-full rounded-lg bg-gray-200">
                            <div class="flex">
                                <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                                    <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none absolute w-5 fill-gray-500 transition">
                                        <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                    </svg>
                                </div>
                                <input type="text" onChange={(e) => setSearchTerm(e.target.value)} class="w-full bg-white pl-2 text-base font-semibold outline-0" placeholder="" id="" />
                                <input type="button" value="Tìm kiếm" class="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-3 py-4 flex justify-center">
                    <table class="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr class="border-b">
                                <th class="text-left p-3 px-5">Tên xe</th>
                                <th class="text-left p-3 px-5">Giá tiền</th>
                                <th class="text-left p-3 px-5">Biển số xe</th>
                                <th class="text-left p-3 px-5">Thông tin</th>
                                <th class="text-left p-3 px-5">Thương hiệu</th>
                                <th class="text-left p-3 px-5">Ngày thêm</th>
                                <th></th>
                            </tr>
                            {
                                filteredCarData.map((item) => {
                                    return (
                                        <tr key={item.id} class="border-b hover:bg-orange-100 bg-gray-100">
                                            <td class="p-3 px-5"><input type="text" value={item.name || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.price || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.numberPlate || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.brand?.name || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.brand?.name || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.dateCreate || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5 flex justify-end">
                                                <button type="button" onClick={() => editHandle(item)} class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                                                <button type="button" onClick={() => deleteHandle(item.id)} class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                                        </tr>

                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {
                showForm ? (
                    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div class="bg-white p-6 rounded-md shadow-md">
                            <div>
                                <div class="flex items-center mb-5 ">
                                    <label for="name" class="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600">Tên xe</label>
                                    <input type="text" id="name" name="name" placeholder="Tên xe"
                                        value={dataFrom.name}
                                        onChange={handleChange}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none"/>
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                    font-bold text-gray-600">Biển số xe</label>
                                    <input type="text" id="number" name="numberPlate" placeholder="Biển số xe"
                                        value={dataFrom.numberPlate}
                                        onChange={handleChange}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                    font-bold text-gray-600">Giá</label>
                                    <input type="number" id="number" name="price" placeholder="Giá"
                                        value={dataFrom.price}
                                        onChange={handleChange}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                    font-bold text-gray-600">Thông tin</label>
                                    <input type="text" id="number" name="info" placeholder="Thông tin"
                                        value={dataFrom.info}
                                        onChange={handleChange}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600">Loại</label>
                                    <select
                                        value={dataFrom.brand.id}
                                        onChange={(e) => setDataForm((prevData) => ({ ...prevData, brand: { id: e.target.value } }))}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
                                    >
                                        <option value="" disabled>Chọn Loại</option>
                                        {brand.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600">Chọn ảnh</label>
                                    <input type="file" id="file" name="file" placeholder="file"
                                        onChange={handleFileChange} class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none"/>
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
            {
                editForm ? (
                    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div class="bg-white p-6 rounded-md shadow-md">
                            <div>
                                <div class="flex items-center mb-5 ">
                                    <label for="name" class="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600">Tên xe</label>
                                    <input type="text" id="name" name="name" placeholder="Tên xe"
                                        value={editFromData.name}
                                        onChange={handleChange1}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none"/>
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                    font-bold text-gray-600">Biển số xe</label>
                                    <input type="text" id="number" name="numberPlate" placeholder="Biển số xe"
                                        value={editFromData.numberPlate}
                                        onChange={handleChange1}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                    font-bold text-gray-600">Giá</label>
                                    <input type="number" id="number" name="price" placeholder="Giá"
                                        value={editFromData.price}
                                        onChange={handleChange1}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                    font-bold text-gray-600">Thông tin</label>
                                    <input type="text" id="number" name="info" placeholder="Thông tin"
                                        value={editFromData.info}
                                        onChange={handleChange1}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600">Loại</label>
                                    <select
                                        value={editFromData.brand.id}
                                        onChange={(e) => setEditFormData((prevData) => ({ ...prevData, brand: { id: e.target.value } }))}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
                                    >
                                        <option value="" disabled>Chọn Loại</option>
                                        {brand.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div class="text-right">
                                    <button onClick={edit} class="py-3 px-8 bg-green-400 text-white font-bold">Submit</button>
                                    <button onClick={() => setEditForm(!editForm)} class="py-3 px-8 bg-red-800 text-white font-bold ml-[20px]">Đóng</button>
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
export default CarAdmin