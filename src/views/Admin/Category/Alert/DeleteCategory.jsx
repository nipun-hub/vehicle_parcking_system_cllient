import { Button, Card, CardBody, CardFooter, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import React from 'react'
import { deleteCategory } from '../../../../services/admin/AdminService'

const DeleteCategory = ({ open, close, data }) => {

    const conformDelete = (id) => {
        deleteCategory(id)
            .then(response => {
                console.log(response)
                window.location.reload()
                close()
            })
            .catch((error) => {
                console.log(error)
                close()
            })
    }

    return (
        <Dialog size="sm" open={open} handler={close} className="p-4">
            <DialogHeader>Are you shure deleted {data.categoryName}</DialogHeader>
            <DialogBody>
                {
                    data.categoryName && (
                        <Card className="shadow-white">
                            <CardBody className='flex gap-3 border-dashed border-2 p-2 rounded-md'>
                                <Typography className='flex flex-col justify-between'>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">Name : {data.categoryName}</Typography>
                                    <Typography>Description : {data.description}</Typography>
                                    <Typography>Price : Rs : {data.pricing.pricePerHour}</Typography>
                                </Typography>
                            </CardBody>
                        </Card>
                    )
                }
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="gray"
                    onClick={close}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="blue"
                    onClick={() => conformDelete(data.id)}
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DeleteCategory
