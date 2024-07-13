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

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://org-bay.runasp.net/api/Categories");
      // eslint-disable-next-line eqeqeq
      let newData = response.data.filter((res) => res.name != "");
      setCategories(newData);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const EditRow = (id) => {
    navigate(`/AddCategory`, { state: { id } });
  };
  const DeleteRow = async (id) => {
    await axios.delete(`http://org-bay.runasp.net/api/Categories/${id}`);
    fetchCategories();
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
              align="center"
            >
              الاسم
            </TableCell>
            <TableCell
              style={{ color: "#fff", width: "40%" }}
              sx={{ fontSize: "18px" }}
              align="center"
            >
              الاجراءات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: "18px" }}
                  align="center"
                >
                  {category.name}
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }} align="center">
                  <button
                    className="btn btn-primary ml-2"
                    onClick={() => EditRow(category.id)}
                  >
                    تعديل
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => DeleteRow(category.id)}
                  >
                    حذف
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={1} align="center">
                لا توجد بيانات
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
