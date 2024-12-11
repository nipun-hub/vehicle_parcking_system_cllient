import { CategoryRounded, DepartureBoardRounded, DiscountRounded, HomeRounded } from "@mui/icons-material";

export const SideBarList = [
    {
        name: 'Dashboard',
        icon: <HomeRounded />,
        path: '/admin/',
        identity: '',
    },
    {
        name: 'Category',
        icon: <CategoryRounded />,
        path: '/admin/category',
        identity: '',
    },
    {
        name: 'Discount',
        icon: <DiscountRounded />,
        path: '/admin/discount',
        identity: '',
    },
    {
        name: 'Parking Request',
        icon: <DepartureBoardRounded />,
        path: '/admin/parking-request',
        identity: '',
    },
];