
import { createContext, useEffect, useState } from "react"
import { getCategory } from "../services/Common/CommonService";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [categoryList, setCategoryList] = useState([])

    // getting category data
    useEffect(() => {
        getCategory()
            .then(response => {
                console.log(response.data.content)
                setCategoryList(response.data.content.filter(item => item.status == "ACTIVE"))
            })
            .catch((error) => {
                console.log("error is : ".error)
            })
    }, [])

    const [park, setPark] = useState([]);

    const addToPark = (object) => {
        setPark((prevData) => [...prevData, object]);
    };

    const removeFromPark = (key) => {
        setPark((prev) => prev.filter((_, index) => index !== parseInt(key)))
    }

    const deleteFromPark = (itemId) => {
        setPark((prev) => ({ ...prev, [itemId]: 0 }))
    }

    const getTotalParkAmount = () => {
        let totalAmount = 0;
        park.map(({ vehicleCategoryId, parkingDate, exitDate }) => {
            const category = categoryList.filter(item => item.id === vehicleCategoryId);
            totalAmount += ((new Date(exitDate) - new Date(parkingDate)) / 3600000) * category[0].pricing.pricePerHour;
        })
        return totalAmount;
    }

    // set review session
    const [reviewsOpen, setReviewsOpen] = useState(false);
    const [id, setId] = useState();
    const handleReviewsOpen = (id) => {
        setId(id);
        setReviewsOpen(true);
    }
    const handleReviewsClose = () => setReviewsOpen(false);

    const contextValue = {
        categoryList,
        park,
        addToPark,
        deleteFromPark,
        removeFromPark,
        getTotalParkAmount,
        reviewsOpen,
        id,
        handleReviewsOpen,
        handleReviewsClose,
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )


}

export default StoreContextProvider;