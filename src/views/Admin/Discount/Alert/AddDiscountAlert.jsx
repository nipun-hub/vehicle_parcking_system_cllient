import React, { useEffect } from 'react'
import { Dialog, Input, Option, Select, Textarea } from '@material-tailwind/react';
import { useState } from 'react';
import { Hub } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { addDiscount, updateDiscount } from '../../../../services/admin/AdminService';
// import { createItem } from '../../../../../services/admin/AdminService';

const notify = (message, type) => {
    type == 'success' && toast.success(message);
    type == 'error' && toast.error(message);
};

const errorHandle = (error) => {
    error.code == 'ERR_BAD_REQUEST' ? notify(error.response.data.message, 'error') : toast.error('Something wrong!\n Please try again later');
}


const AddDiscountAlert = ({ open, close, data }) => {

    const [formData, setAddFormData] = useState({
        id: data ? data.id : '',
        description: data ? data.description : '',
        percentage: data ? data.percentage : '',
        startDate: data ? data.startDate : '',
        endDate: data ? data.endDate : '',
    })

    const updateSetAddFormData = (name, value) => {
        setAddFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (data) {
            try {
                await updateDiscount(formData)
                    .then(response => {
                        console.log(response)
                        notify('Successfully update discount', 'success')
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log("error")
                errorHandle(error)
            }
            close()
        } else {

            try {
                await addDiscount(formData)
                    .then(response => {
                        console.log(response)
                        notify('Successfully add discount', 'success')
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                        errorHandle(error)
                    })
            } catch (error) {
                console.log(error)
                errorHandle(error)
            }
            close()
        }
    }

    return (
        <Dialog size="sm" open={open} handler={close} className="p-4">
            <div className=" w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">{data ? 'Update Discount' : 'Add Discount'}</h2>
                </div>
                <form className="mt-8 space-y-3" onSubmit={(e) => handelSubmit(e)}>
                    <div className="w-full">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Discount Name</label>
                        <Input value={formData.description} name='description' label='Discount Name' color='blue-gray' className='before::outline-gray-300 text-s' onChange={(e) => updateSetAddFormData(e.target.name, e.target.value)} required />
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Percentage</label>
                        <Input type='number' max={100} value={formData.percentage} name='percentage' label='Percentage' color='blue-gray' className='before::outline-gray-300 text-s' onChange={(e) => updateSetAddFormData(e.target.name, e.target.value)} required />
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Start Date</label>
                        <Input type='datetime-local' value={formData.startDate} name='startDate' label='Start Date' color='blue-gray' className='before::outline-gray-300 text-s' onChange={(e) => updateSetAddFormData(e.target.name, e.target.value)} required />
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">End Date</label>
                        <Input type='datetime-local' value={formData.endDate} name='endDate' label='End Date' color='blue-gray' className='before::outline-gray-300 text-s' onChange={(e) => updateSetAddFormData(e.target.name, e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                        >
                            {data ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

export default AddDiscountAlert
