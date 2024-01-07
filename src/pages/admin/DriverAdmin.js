import { useEffect, useState } from "react";
import { storage, ref, uploadBytes, getDownloadURL } from "../../firebase";
import { useNavigate } from "react-router-dom";

const DriverAdmin = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [driver, setdriver] = useState([]);
    const [brand, setBrand] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('role')!="ROLE_ADMIN") {
            navigate('/')
        }
    }, [localStorage.getItem('role')])


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSave = async () => {
        try {
            if (selectedFile) {
                const storageRef = ref(storage, selectedFile.name);
    
                const snapshot = await uploadBytes(storageRef, selectedFile);
                console.log("File uploaded successfully");
    
                const url = await getDownloadURL(snapshot.ref);
                console.log("Download URL:", url);
    
                setDownloadURL(url);
    
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
                    alert("Thêm thành công");
                    fetchData();
                    setShowForm(!showForm);
                } else {
                    console.error('Error adding car:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error in handleSave:', error);
        }
    };
    

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

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/getAllDriver');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setdriver(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteHandle = async (idDriver) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteDriver/${idDriver}`, {
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

    const filtereddriver = driver.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
                                <th class="text-left p-3 px-5">Tên tài xế</th>
                                <th class="text-left p-3 px-5">Địa chỉ</th>
                                <th class="text-left p-3 px-5">Số điện thoại</th>
                                <th></th>
                            </tr>
                            {
                                filtereddriver.map((item) => {
                                    return (
                                        <tr key={item.id} class="border-b hover:bg-orange-100 bg-gray-100">
                                            <td class="p-3 px-5"><input type="text" value={item.name || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.address || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.phone || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5 flex justify-end">
                                                <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                                                <button type="button" onClick={() => deleteHandle(item.id)} class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default DriverAdmin