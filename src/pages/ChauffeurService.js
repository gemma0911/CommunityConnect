const ChauffeurService = () => {
    return (
        <>
            <div className="isolate bg-white px-6 lg:px-8">
                <form action="#" method="POST" className="mx-auto mt-10 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label for="first-name" className="block text-sm font-semibold leading-6 text-black">Họ và tên</label>
                            <div className="mt-2.5">
                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="last-name" className="block text-sm font-semibold leading-6 text-black">Số điện thoại</label>
                            <div className="mt-2.5">
                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label for="company" className="block text-sm font-semibold leading-6 text-black">Email</label>
                            <div className="mt-2.5">
                                <input type="text" name="company" id="company" autocomplete="organization" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label for="first-name" className="block text-sm font-semibold leading-6 text-black">Ngày thuê</label>
                            <div className="mt-2.5">
                                <input type="date" name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="last-name" className="block text-sm font-semibold leading-6 text-black">Ngày trả</label>
                            <div className="mt-2.5">
                                <input type="date" name="last-name" id="last-name" autocomplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="last-name" className="block text-sm font-semibold leading-6 text-black">Chọn tài xế</label>
                            <div className="mt-2.5">
                                <div className="relative mt-2.5">
                                    <select id="country" name="country" autocomplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option>US</option>
                                        <option>CA</option>
                                        <option>EU</option>
                                        <option>UK</option>
                                        <option>YE</option>
                                        <option>MA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="last-name" className="block text-sm font-semibold leading-6 text-black">Tổng tiền</label>
                            <div className="mt-2.5">
                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng ký</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChauffeurService