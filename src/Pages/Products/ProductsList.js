/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { baseURL, IMG_URL, PRODUCTS, SALES_CENTERS } from "../../Components/Api";
import { useNavigate } from "react-router";
import { Loading } from "../../Components/Loading";
import Swal from "sweetalert2";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [center, setCenter] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // fetch products 
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/${PRODUCTS}`);
      setProducts(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // edit products 
  const EditRow = (id) => {
    navigate(`/AddProducts`, { state: { id } });
  };

  // delete products function 
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
          await axios.delete(`${baseURL}/${PRODUCTS}/${id}`);
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
        {products.length === 0 ? (
          <h4 className="text-center font-weight-bold bg-light px-5 py-3">لا توجد منتجات</h4>
        ) : (
          products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <Card className="mb-3">
                <img
                  style={{ height: "250px", width: '100%', objectFit: "cover" }}
                  src={`${IMG_URL}${product.imgUrl}`}
                  alt={product.name}
                />
                <CardContent>

                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {`$ ${product.price}`}
                  </Typography>

                  <Typography color="text.secondary">
                    {product.SalesCenterId}
                  </Typography>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-primary mx-2 btn-sm"
                      onClick={() => EditRow(product.id)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => DeleteRow(product.id)}
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
