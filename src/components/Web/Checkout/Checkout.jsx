import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AddCircleOutline, DeleteForever, RemoveCircleOutline } from '@mui/icons-material';
import { StoreContext } from '../../../context/StoreContext';
import { addPark, getDiscount } from '../../../services/Common/CommonService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '0.375rem',
  width: '80%',
  bgcolor: 'background.paper',
};


const Checkout = ({ checkoutOpen, setCheckoutClose, setPlaceOrderOpen = null }) => {
  const { park, categoryList, addToPark, deleteFromPark, removeFromPark, getTotalParkAmount } = useContext(StoreContext);

  const getActiveDiscount = () => {
    let total = 1;
    getDiscount()
      .then(response => {
        total = response.data ? response.data[0].percentage : 1
      })
      .catch((error) => {
        total = 1
      })
    return total
  }

  const handelSubmit = () => {

    const convertToVehicleCategoryFormat = (inputArray) => {
      return Object.entries(inputArray).map(([key, value]) => ({
        parkingTime: value.parkingDate,
        exitTime: value.exitDate,
        vehicleCategory: {
          id: value.vehicleCategoryId
        }
      }));
    };


    const data = {
      "totalAmount": getTotalParkAmount() / 100 * (100 - getActiveDiscount()),
      "user": {
        "id": JSON.parse(localStorage.getItem('user')).token
      },
      "parkingDetails": convertToVehicleCategoryFormat(park)
    }

    addPark(data)
      .then(response => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

  }


  const renderPark = () => {
    const nonEmptyPark = park;
    const time = 3600000;

    if (nonEmptyPark.length === 0) {
      return (
        <div className='flex flex-col h-full w-full gap-3 text-gray-400'>
          <p>No items in your Park.</p>
          <span className='text-sm'>Your Park looks a little empty. Why not check out some of our unbeatable deals?</span>
        </div>
      );
    }

    return Object.entries(park).map(([key, value]) => {
      const { vehicleCategoryId, parkingDate, exitDate } = value;
      const category = categoryList.find(item => item.id === vehicleCategoryId);

      if (!category) return null;

      return (
        <div key={vehicleCategoryId} className='flex gap-3 justify-between border-dashed border-4 p-2'>
          {/* <img src={item.image} width={100} alt={item.name} className='rounded' /> */}
          <div>
            <p>{category.categoryName}</p>
            <p>Rs: {((new Date(exitDate) - new Date(parkingDate)) / time * category.pricing.pricePerHour)}.00</p>
          </div>
          <div>
            <p>In : {parkingDate} </p>
            <p>Exit : {exitDate}</p>
          </div>
          <div className='flex items-center'>
            <button className='text-red-500' onClick={() => removeFromPark(key)}><DeleteForever /></button>
          </div>
        </div>
      );
    });
  };

  return (
    <Modal
      open={checkoutOpen}
      onClose={setCheckoutClose}
      aria-labelledby="checkout-modal"
      aria-describedby="checkout-description"
    >
      <Box sx={modalStyle}>
        <div className='p-10'>
          <div className='w-full min-h-[60vh] max-h-[100vh] grid xl:grid-cols-4 grid-cols-3 gap-4 overflow-y-auto'>
            <div className='h-10 justify-between flex flex-col col-span-3'>
              <div className='flex gap-1 text-2xl'>
                <img src="https://www.kfc.lk/images/icons/trolley.png" alt="Park" />
                <p onClick={getActiveDiscount}>Your Park</p>
              </div>
              <hr />
              <div className='mt-5'>
                <div className='grid grid-cols-2 gap-5'>
                  {renderPark()}
                </div>
              </div>
            </div>
            <div className='h-10 justify-between flex flex-col xl:col-span-1 col-span-3'>
              <div className='flex gap-1 text-2xl'>
                <img src="https://www.kfc.lk/images/icons/file.png" width={40} alt="Order Summary" />
                <p>Order Summary</p>
              </div>
              <hr />
              <div className='flex flex-col gap-4 pt-5 justify-between'>
                <div>
                  <div className='flex justify-between border-t-2 p-3 bg-gray-50'>
                    <p>Total</p><p>Rs: {getTotalParkAmount()}.00</p>
                  </div>
                  <div className='flex justify-between border-t-2 p-3 bg-gray-50'>
                    <p>Discount amount</p><p>Rs: {getActiveDiscount()}.00</p>
                  </div>
                  <div className='flex justify-between border-t-2 p-3 bg-gray-50 text-red-400 text-2xl items-center'>
                    <p className='flex gap-3 items-center'>
                      <img src="https://www.kfc.lk/images/icons/stamp.png" alt="Total" width={20} />
                    </p>
                    <p>Rs: {getTotalParkAmount() / 100 * (100 - getActiveDiscount())}.00</p>
                  </div>
                  <div className='flex justify-between border-t-2 border-b-2 p-3 bg-gray-50'>
                    <p>Review your order before checkout.</p>
                  </div>
                </div>
                <Button
                  variant="contained"
                  // color="error"
                  fullWidth
                  onClick={() => {
                    handelSubmit();
                    // setPlaceOrderOpen();
                  }}
                >
                  Request Park
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>

  );
};

export default Checkout;