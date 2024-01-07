import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const FeedBackAdmin = () => {
    const navigate = useNavigate()
    const [feedBack, setFeedBack] = useState([])
    useEffect(() => {
        if (localStorage.getItem('role') != "ROLE_ADMIN") {
            navigate('/')
        }
    }, [localStorage.getItem('role')])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/findAllFeedBack`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFeedBack(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert("Có lỗi xảy ra khi lấy dữ liệu xe. Vui lòng thử lại sau.");
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div class="flex justify-center items-center">
                <div class="md:w-3/5 w-3/4 px-10 flex flex-col gap-2 p-5  text-white">
                    <div class="flex flex-col gap-3 mt-14">
                        {
                            feedBack.map((item) => {
                                return (
                                    <div class="flex flex-col gap-4 bg-gray-700 p-4">
                                        <div class="flex justify justify-between">
                                            <div class="flex gap-2">
                                                <div class="w-7 h-7 text-center rounded-full bg-red-500">{item.id}</div>
                                                <span>{item.name}</span>
                                            </div>
                                            <div class="flex p-1 gap-1 text-orange-300">
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star-half"></ion-icon>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <span>{item.date}</span>
                                        </div>
                                        <div>
                                            {item.content}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
        </>
    )
}

export default FeedBackAdmin