import { useState } from "react"

const FeedBack = () => {
    const [feedBack,setFeedBack] = useState({
        name : '',
        email : '',
        title : '',
        content : ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedBack((prevData) => ({ ...prevData, [name]: value }));
    };

    const saveHandle = async () => {
        try {

            if(!feedBack.content || !feedBack.email || !feedBack.name || !feedBack.title) {
                alert("Vui lòng nhập đầy đủ thông tin")
            }

            const response = await fetch(`http://localhost:8080/addFeedBack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedBack),
            });

            if (response.ok) {
                alert("Đánh giá thành công");
                setFeedBack({
                    name : '',
                    email : '',
                    title : '',
                    content : ''
                })
            } else {
                const errorData = await response.json();
                console.error('Error deleting car:', errorData);
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };


    return (
        <>
            <div class="isolate bg-white px-6 py-2 mt-[20px] lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <p class="text-lg leading-8 font-extralight text-gray-600">Ghi lại những trải nghiệm của bạn hoặc góp ý cho chúng tôi.</p>
                </div>
                <div class="mx-auto max-w-xl mt-[20px]">
                    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label for="first-name" class="block text-sm font-semibold leading-6 text-black">Tên</label>
                            <div class="mt-2.5">
                                <input onChange={handleChange} value={feedBack.name} type="text" name="name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div>
                            <label for="last-name" class="block text-sm font-semibold leading-6 text-black">Email</label>
                            <div class="mt-2.5">
                                <input onChange={handleChange} value={feedBack.email} type="email" name="email" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="text" class="block text-sm font-semibold leading-6 text-red-600">Tiêu đề</label>
                            <div class="mt-2.5">
                                <input onChange={handleChange} value={feedBack.title} type="email" name="title" id="title" autocomplete="email" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message" class="block text-sm font-semibold leading-6 text-green-600">Nội dung</label>
                            <div class="mt-2.5">
                                <textarea onChange={handleChange} value={feedBack.content} name="content" id="content" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="mt-10">
                        <button onClick={saveHandle} type="button" class="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đánh giá</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedBack