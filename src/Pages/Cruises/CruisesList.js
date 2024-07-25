/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import { baseURL, CRUISES } from "../../Components/Api";
import { Loading } from "../../Components/Loading";
import Swal from "sweetalert2";

export default function CruisesList() {
  const [cruises, setCruises] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // fetch cruises 
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/${CRUISES}`);
      setCruises(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // edit cruises
  const EditRow = (id) => {
    navigate(`/AddCruises`, { state: { id } });
  };

  // delete cruises function 
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
          await axios.delete(`${baseURL}/${CRUISES}/${id}`);
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

  // change status from English to arabic 
  const status = {
    "Active": "نشط",
    "InActive": "غير نشط",
  }

  return (
    <div>
      {loading && <Loading />}
      <TableContainer
        className="table-style table table-hover"
        sx={{ direction: "rtl" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head-style">
            <TableRow>
              <TableCell className="text-center"
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                الاسم
              </TableCell>
              <TableCell className="text-center"
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                الحالة
              </TableCell>

              <TableCell className="text-center"
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="center"
              >
                الاجراءات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(cruises) && cruises.length > 0 ? (
              cruises.map((cruise) => (
                <TableRow
                  key={cruise.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="text-center"
                    sx={{ fontSize: "18px" }}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    {cruise.name}
                  </TableCell>
                  <TableCell className="text-center" sx={{ fontSize: "18px" }} align="right">
                    {status[cruise.status]}

                  </TableCell>

                  <TableCell className="text-center" sx={{ fontSize: "18px" }} align="center">
                    <button
                      className="btn btn-primary mx-2 btn-sm"
                      onClick={() => EditRow(cruise.id)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => DeleteRow(cruise.id)}
                    >
                      حذف
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center" colSpan={4} align="center">
                  <h5>لا توجد بيانات</h5>

                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}
