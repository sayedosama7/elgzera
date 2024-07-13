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
export default function TourGuidesList() {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();
  const fetchGuides = async () => {
    try {
      const response = await axios.get("http://org-bay.runasp.net/api/TourGuides");
      setGuides(response.data);
    } catch (error) {
      console.error("Error fetching tour guides", error);
    }
  };
  useEffect(() => {
    fetchGuides();
  }, []);
  const EditRow = (id) => {
    navigate(`/AddTourGuides`, { state: { id } });
  };
  const DeleteRow = async (id) => {
    try {
      await axios.delete(`http://org-bay.runasp.net/api/TourGuides/${id}`);
      fetchGuides();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <TableContainer
      className="table-style table table-hover"
      sx={{ direction: "rtl" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="table-head-style">
          <TableRow>
            <TableCell
              style={{ color: "#fff" }}
              sx={{ fontSize: "18px" }}
              align="right"
            >
              الاسم
            </TableCell>
            <TableCell
              style={{ color: "#fff" }}
              sx={{ fontSize: "18px" }}
              align="right"
            >
              الحالة
            </TableCell>
            <TableCell
              style={{ color: "#fff" }}
              sx={{ fontSize: "18px" }}
              align="right"
            >
              البريد الإلكتروني
            </TableCell>
            <TableCell
              style={{ color: "#fff" }}
              sx={{ fontSize: "18px" }}
              align="right"
            >
              رقم الهاتف
            </TableCell>
            <TableCell
              style={{ color: "#fff" }}
              sx={{ fontSize: "18px" }}
              align="right"
            >
              نسبة الربح
            </TableCell>
            <TableCell
              style={{ color: "#fff" }}
              sx={{ fontSize: "18px" }}
              align="center"
            >
              الاجراءات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(guides) && guides.length > 0 ? (
            guides.map((guide) => (
              <TableRow
                key={guide.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ fontSize: "18px" }}
                  align="right"
                  component="th"
                  scope="row"
                >
                  {guide.name}
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">
                  {guide.statusId === 1 ? "نشط" : "غير نشط"}
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">
                  {guide.email}
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">
                  {guide.phone}
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="right">
                  %{guide.profitRatio}
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="center">
                  <button
                    className="btn btn-primary ml-2"
                    onClick={() => EditRow(guide.id)}
                  >
                    تعديل
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => DeleteRow(guide.id)}
                  >
                    حذف
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                لا توجد بيانات
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
