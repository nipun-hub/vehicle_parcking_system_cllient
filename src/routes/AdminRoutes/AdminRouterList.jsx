import { Component } from "react";

import Home from "../../views/Admin/home/home";
import Category from "../../views/Admin/Category/Category";
import Discount from "../../views/Admin/Discount/Discount";
import ParkingRequest from "../../views/Admin/ParkingRequest/ParkingRequest";

export const adminRouterList = [
    { path: '', Component: Home },
    { path: 'category', Component: Category },
    { path: 'discount', Component: Discount },
    { path: 'parking-request', Component: ParkingRequest },
];