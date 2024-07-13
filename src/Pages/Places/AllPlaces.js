import React from 'react'
import Drawer from '../../Components/Drawer';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PlacesList from './PlacesList';


export default function AllPlaces() {
    return (
        <div>
            <Drawer />
            {/* <Box height={0} sx={{ direction: "rtl" }} /> */}
            <Box sx={{ width: "80%" }}>
                <div>
                    <h2 className='table-head' >الاماكن</h2>
                    <Link to='/AddPlaces'>
                        <button className='btn btn-primary add-button'>اضافه مكان</button>
                    </Link>
                </div>

                <PlacesList/>
            </Box>
        </div>
    )
}
