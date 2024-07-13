import React from 'react'
import Drawer from '../../Components/Drawer';
import { Box} from '@mui/material';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import { Grid } from '@mui/material';
import Row1 from './Row1';


export default function home() {
  return (
    <div>
      <Drawer />
     
      <Box sx={{ width: "78%", ml:"50px",mr:"auto", marginTop: "-20px",marginBottom:"3%" }}>

      <Row1 />


        <Grid container spacing={1} mt={2} display={"flex"} justifyContent={"space-between"}>
          <Grid className='graid-chart' item md={6} xs={12} sx={{ backgroundColor: "#fff",marginLeft:"-10px" }}>
            <Chart1 />
          </Grid>
          <Grid item md={6} xs={12} sx={{ backgroundColor: "#fff",marginRight:"-10px" }}>
            <Chart2 />
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={3} display={"flex"} justifyContent={"space-between"}>
          <Grid item md={6} xs={12} sx={{ backgroundColor: "#fff" , display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"-10px"}}>
            <Chart4 />
          </Grid>
          <Grid item md={6} xs={12} sx={{ backgroundColor: "#fff",marginRight:"-10px" }}>
            <Chart3 />
          </Grid>
        </Grid>


      </Box>

    </div>
  )
}
