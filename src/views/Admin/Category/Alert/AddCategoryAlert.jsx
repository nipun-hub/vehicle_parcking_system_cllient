import React, { useEffect } from 'react'
import { Dialog, Input, Option, Select, Textarea } from '@material-tailwind/react';
import { useState } from 'react';
import { Hub } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { addVehicleCategory, updateVehicleCategory } from '../../../../services/admin/AdminService';
// import { createItem } from '../../../../../services/admin/AdminService';

const notify = (message, type) => {
    type == 'success' && toast.success(message);
    type == 'error' && toast.error(message);
};

const errorHandle = (error) => {
    error.code == 'ERR_BAD_REQUEST' ? notify(error.response.data.message, 'error') : toast.error('Something wrong!\n Please try again later');
}


const AddCategoryAlert = ({ open, close, data }) => {

    const [formData, setAddFormData] = useState({
        id: data ? data.id : '',
        categoryName: data ? data.categoryName : '',
        description: data ? data.description : '',
        pricePerHour: data ? data.pricePerHour : '',
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
                await updateVehicleCategory(formData)
                    .then(response => {
                        console.log(response)
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log("error")
            }
            close()
        } else {

            try {
                await addVehicleCategory(formData)
                    .then(response => {
                        console.log(response)
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log("error")
            }
            close()
        }
    }

    return (
        // <DialogPop isOpen={open} close={close} >
        <Dialog size="sm" open={open} handler={close} className="p-4">
            {/* <div className="absolute bg-black opacity-60 inset-0 z-0"></div> */}
            <div className=" w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">{data ? 'Update Category' : 'Add Category'}</h2>
                    {/* <p className="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p> */}
                </div>
                <form className="mt-8 space-y-3" onSubmit={(e) => handelSubmit(e)}>
                    <div className="w-full">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Category Name</label>
                        <Input value={formData.categoryName} name='categoryName' label='Category Name' color='blue-gray' className='before::outline-gray-300 text-s' onChange={(e) => updateSetAddFormData(e.target.name, e.target.value)} required />
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Price</label>
                        <Input type='number' value={formData.pricePerHour} name='pricePerHour' label='Price Per Hour' color='blue-gray' className='before::outline-gray-300 text-s' onChange={(e) => updateSetAddFormData(e.target.name, e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Description</label>
                        <Textarea value={formData.description} name='description' label='Description' color='blue-gray' onChange={(e) => updateSetAddFormData(e.target.name, e.target.value)} required></Textarea>
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

export default AddCategoryAlert
