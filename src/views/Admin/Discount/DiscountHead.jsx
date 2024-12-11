import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import { AddRounded, ArrowRightAltRounded } from '@mui/icons-material'
import React from 'react'

const ItemHead = ({ setOpen }) => {
    return (
        <div className="flex gap-5 justify-center">
            <Card className="mt-6">
                <CardFooter className="">
                    <a href="#" className="inline-block">
                        <Button size="sm" variant="text" className="flex items-center gap-2 bg-gray-400 w-full" onClick={() => setOpen(true)}>
                            Add Discount
                            <AddRounded />
                        </Button>
                    </a>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ItemHead
