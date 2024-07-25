/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { baseURL, IMG_URL, SALES_CENTERS } from "../../Components/Api";
import { useNavigate } from "react-router";
import { Loading } from "../../Components/Loading";
import Swal from "sweetalert2";

export default function PlacesList() {
  const [salesCenters, setSalesCenters] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // fetch SALES_CENTERS 
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/${SALES_CENTERS}`);
      setSalesCenters(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // edit SALES_CENTERS 
  const EditRow = (id) => {
    navigate(`/AddPlaces`, { state: { id } });
  };

  // delete SALES_CENTERS function 
  const DeleteRow = async (id) => {
    Swal.fire({
      title: "هل انت متاكد من الحذف؟",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "إلغاء",
      confirmButtonText: "نعم متاكد",
      customClass: {
        popup: 'small-swal'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.delete(`${baseURL}/${SALES_CENTERS}/${id}`);
          fetchData();
          setLoading(false);
          Swal.fire({
            title: "تم الحذف",
            customClass: {
              popup: 'small-swal',
              confirmButton: 'custom-confirm-button'
            }
          });
        } catch (error) {
          setLoading(false);
          console.error("Error deleting data:", error);
        }
      }
    });
  };

  return (
    <div className="container">
      {loading && <Loading />}
      <div className="row">
        {salesCenters.length === 0 ? (
          <h4 className="text-center font-weight-bold bg-light px-5 py-3">لا توجد اماكن </h4>
        ) : (
          salesCenters.map((center) => (
            <div className="col-md-4" key={center.id}>
              <Card className="mb-3">
                <img
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                  src={`${IMG_URL}${center.imgUrl}`}
                  alt={center.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {center.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {center.productCount} منتج
                  </Typography>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-primary mx-2 btn-sm"
                      onClick={() => EditRow(center.id)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => DeleteRow(center.id)}
                    >
                      حذف
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
