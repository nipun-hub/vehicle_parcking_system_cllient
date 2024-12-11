import { Input, Option, Select } from "@material-tailwind/react";
import React, { useContext, useEffect, useRef, useState } from 'react'
import BookCarBg from '../../../assets/web/images/book-car/book-bg.png'
import { getCategory } from '../../../services/Common/CommonService.jsx'
import { Category } from "@mui/icons-material";
import { StoreContext } from "../../../context/StoreContext.jsx";

const BookParking = () => {

    const { categoryList, addToPark, park } = useContext(StoreContext)

    const [formData, setFormData] = useState({
        vehicleCategoryId: "",
        parkingDate: "",
        exitDate: "",
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handelSubmit = () => {
        if (formData.exitDate && formData.parkingDate && formData.vehicleCategoryId) {

            addToPark(formData)
            console.log('added')
            console.log(park)
        }
    }

    return (
        <div className='flex justify-center' id="book-parking">
            <div className='flex flex-col gap-4 w-4/5 bg-white rounded-md p-10 shadow-xl' style={{ backgroundImage: `url(${BookCarBg})` }}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-5">
                    <Select label="Select vehicle category" onChange={(e) => handleChange('vehicleCategoryId', e)}>
                        {
                            Object(categoryList)?.map((category) => (
                                <Option value={category.id} selected>{category.categoryName}</Option>
                            ))
                        }
                    </Select>
                    <Input type="datetime-local" label="Parking time " onChange={(e) => handleChange('parkingDate', e.target.value)} value={formData.parkingDate} />
                    <Input type="datetime-local" label="Exit time" onChange={(e) => handleChange('exitDate', e.target.value)} />
                    <button onClick={() => handelSubmit()} className='px-8 py-1 text-lg font-semibold rounded bg-blue-400 w-full text-white xl:col-span-3' value={formData.exitDate}>Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default BookParking
