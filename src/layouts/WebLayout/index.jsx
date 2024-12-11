import React, { useEffect } from 'react'
import { useContext } from 'react';
import NavBar from './navbar/NavBar';
import Footer2 from './Footer2/Footer';
import { StoreContext } from '../../context/StoreContext';
import { Toaster } from 'react-hot-toast';
import LoginPopup from '../../components/Web/LoginPopup/LoginPopup';
import Checkout from '../../components/Web/Checkout/Checkout';

const WebLayout = ({ children }) => {
    const { reviewsOpen, token } = useContext(StoreContext);

    const [showLogin, setShowLogin] = React.useState(false);
    const [loginType, setLoginType] = React.useState('login')
    const [cartIsOpen, setCartIsOpen] = React.useState(false);
    const [checkoutOpen, setCheckoutOpen] = React.useState(false);
    const [placeOrderOpen, setPlaceOrderOpen] = React.useState(false);
    const [couponOpen, setCouponOpen] = React.useState(false);
    const [isMyAccountOpen, setMyAccountOpen] = React.useState(false);

    const handleLoginOpen = () => {
        setLoginType('Sign In')
        setShowLogin(true);
    }
    const handleRegisterOpen = () => {
        setLoginType('Sign Up');
        setShowLogin(true);
    }
    const handleLoginClose = () => setShowLogin(false);

    const handleCheckoutOpen = () => setCheckoutOpen(true);
    const handleCheckoutClose = () => setCheckoutOpen(false);

    const handlePlaceOrderOpen = () => setPlaceOrderOpen(true);
    const handlePlaceOrderClose = () => setPlaceOrderOpen(false);

    const handleCouponOpen = () => setCouponOpen(true);
    const handleCouponClose = () => setCouponOpen(false);

    useEffect(() => {
        setMyAccountOpen(false)
    }, [token])

    return (
        <>
            {showLogin && <LoginPopup open={showLogin} close={() => setShowLogin(false)} type={loginType} />}
            <div className='app'>
                <NavBar
                    loginOpen={handleLoginOpen}
                    registerOpen={handleRegisterOpen}

                    // setCartIsOpen={setCartIsOpen}
                    setCheckoutOpen={handleCheckoutOpen}
                // setMyAccountOpen={setMyAccountOpen}
                />
                {children}
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        className: '',
                        style: {
                            zIndex: 99999,
                        },
                    }}
                    containerStyle={{
                        zIndex: 99999,
                    }}

                />
                <Checkout checkoutOpen={checkoutOpen} setCheckoutClose={handleCheckoutClose} />
                <Footer2 />
            </div>
        </>
    )
}

export default WebLayout