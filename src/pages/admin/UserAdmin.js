import { useEffect, useState } from "react";
import { storage, ref, uploadBytes, getDownloadURL } from "../../firebase";
import { useNavigate } from "react-router-dom";
const UserAdmin = () => {
    const [showForm, setShowForm] = useState(false);
    const [editShowForm, seteEditShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState([]);
    const [brand, setBrand] = useState([]);    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);
    const [editData,setEditData] = useState({

    })

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('role')!="ROLE_ADMIN") {
            navigate('/')
        }
    }, [localStorage.getItem('role')])

    const handleUpload = () => {
        if (selectedFile) {
            const storageRef = ref(storage, selectedFile.name);

            uploadBytes(storageRef, selectedFile).then((snapshot) => {
                console.log("File uploaded successfully");
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log("Download URL:", url);
                    setDownloadURL(url);
                });
            });
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/getAllUSer');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteHandle = async (idUser) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteUser/${idUser}`, {
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

    const edit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/updateUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            });
            if (response.ok) {
                setEditData(null);
                seteEditShowForm(!editShowForm)
                fetchData()
            } else {
                
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

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

    const editHandle = (e) => {
        seteEditShowForm(!editShowForm)
        setEditData(e)
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const filtereduser = user.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <>
            <div class="text-gray-900 bg-gray-200">
                <div class="p-4 flex">
                    {/* <button
                        onClick={() => setShowForm(!showForm)}
                        class="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                    >
                        Thêm
                    </button> */}
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
                                <th class="text-left p-3 px-5">Tên tài khoản</th>
                                <th class="text-left p-3 px-5">Tên người dùng</th>
                                <th class="text-left p-3 px-5">Ngày tạo</th>
                                <th class="text-left p-3 px-5">Chức vụ</th>
                                <th></th>
                            </tr>
                            {
                                filtereduser.map((item) => {
                                    return (
                                        <tr key={item.id} class="border-b hover:bg-orange-100 bg-gray-100">
                                            <td class="p-3 px-5"><input type="text" value={item.username || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.name || ''} class="bg-transparent" /></td>
                                            <td class="p-3 px-5"><input type="text" value={item.creation_date || ''} class="bg-transparent" /></td>
                                            {
                                                item.role == "ROLE_USER" ? (
                                                    <td class="p-3 px-5"><input type="text" value="Người dùng" class="bg-transparent" /></td>
                                                ) : (
                                                    <td class="p-3 px-5"><input type="text" value="Admin" class="bg-transparent" /></td>
                                                )
                                            }
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
                editShowForm ? (
                    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div class="bg-white p-6 rounded-md shadow-md">
                            <div>
                                <div class="flex items-center mb-5 ">
                                    <label for="name" class="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600">Tài khoản</label>
                                    <input type="text" id="name" name="username" placeholder="Tên tài khoản"
                                        value={editData.username}
                                        onChange={handleChange}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none"/>
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                    font-bold text-gray-600">Tên</label>
                                    <input type="text" id="number" name="name" placeholder="Tên người dùng"
                                        value={editData.name}
                                        onChange={handleChange}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none" />
                                </div>

                                <div class="flex items-center mb-5">
                                    <label for="number" class="inline-block w-20 mr-6 text-right 
                    font-bold text-gray-600">Mật khẩu</label>
                                    <input type="password" id="number" name="password" placeholder="Mật khẩu"
                                        value={editData.password}
                                        onChange={handleChange}
                                        class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none" />
                                </div>

                                <div class="text-right">
                                    <button onClick={edit} class="py-3 px-8 bg-green-400 text-white font-bold">Sửa</button>
                                    <button onClick={() => seteEditShowForm(!editShowForm)}  class="py-3 px-8 bg-red-800 text-white font-bold ml-[20px]">Đóng</button>
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

export default UserAdmin