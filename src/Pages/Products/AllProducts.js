import React from 'react'
import Drawer from '../../Components/Drawer';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import ProductsList from './ProductsList';


export default function AllProducts() {
    return (
        <div>
            <Drawer />
            {/* <Box height={0} sx={{ direction: "rtl" }} /> */}
            <Box sx={{ width: "80%" }}>
                <div>
                    <h2 className='table-head' >المنتجات</h2>
                    <Link to='/AddProducts'>
                        <button className='btn btn-primary add-button'>اضافه منتج</button>
                    </Link>
                </div>

                <ProductsList/>
            </Box>
        </div>
    )
}
