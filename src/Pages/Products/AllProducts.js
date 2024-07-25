import React, { useEffect } from 'react'
import Drawer from '../../Components/Drawer';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import ProductsList from './ProductsList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllProducts() {
    useEffect(() => {
        const alertMessage = localStorage.getItem('alertMessage');
        if (alertMessage) {
            toast.info(alertMessage, {
                style: {
                    backgroundColor: '#ecf0f5',
                    color: '#000'
                },
                bodyStyle: {
                    fontSize: '16px'
                },
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#007bff"
                        width="24"
                        height="24"
                    >
                        <path d="M10 15.172l-3.364-3.364 1.414-1.414L10 12.344l7.95-7.95 1.414 1.414z" />
                    </svg>
                ),
            });
            setTimeout(() => {
                localStorage.removeItem('alertMessage');
            }, 2000);
        }
    }, []);
    return (
        <div>
            <Drawer />
            <ToastContainer />
            <div className='box-container'>
                <Box>
                    <div className='table-head'>
                        <h2>المنتجات</h2>
                        <Link to='/AddProducts'>
                            <button className='btn btn-primary add-button'>اضافة منتج</button>
                        </Link>
                    </div>
                    <ProductsList />
                </Box>
            </div>
        </div>
    )
}
