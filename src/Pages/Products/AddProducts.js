import React from 'react';
import Drawer from '../../Components/Drawer';
import { Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const currencies = [

  {

    label: 'Ice Cream Shop',

  },
  {

    label: 'Snacks bar ',

  }
];

export default function AddProducts() {
  return (
    <div>
      <Drawer />
      <Box height={65} sx={{ direction: "rtl" }} />
      <div>
        <Link to='/AllProducts'>
          <button className='btn btn-primary add-button'>رجوع </button>
        </Link>
      </div>
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div className='card table-style' style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            اضف البيانات
          </div>
          <div className="card-body">
            <form>
              <div className='container'>
                <div className='row'>

                  <div className='col-md-6'>
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex"> الاسم</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex">السعر</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label for="exampleInputEmail1" className="d-flex">اختيار المكان</label>
                    <TextField
                      id="outlined-select-currency-native"
                      select
                      label="Native select"
                      defaultValue=""
                      size='small'
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {currencies.map((option) => (
                        // <option>Default select</option>
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>

                      ))}
                    </TextField>
                  </div>



                  <div className='col-md-6'>
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="d-flex">اضافه صوره</label>
                      <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                  </div>



                </div>

              </div>


              <button type="submit" className="btn btn-primary mt-4">حفظ</button>
            </form>
          </div>
        </div>

      </Box>
    </div>
  )
}
