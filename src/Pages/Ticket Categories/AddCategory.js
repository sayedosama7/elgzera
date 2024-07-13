/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Drawer from "../../Components/Drawer";
import { Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { id } = location.state || {};
    if (id) {
      fetchCategoryDetails(id);
    }
  }, [location.state]);
  const fetchCategoryDetails = async (id) => {
    try {
      const response = await axios.get(`http://org-bay.runasp.net/api/Categories`);
      const category = response.data.find((cat) => cat.id === id);
      setCategoryName(category.name);
    } catch {
      console.log("error fetching data of category ");
    }
  };
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!categoryName) newErrors.categoryName = "من فضلك ادخل فئة التذكرة";

    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (location.state && location.state.id) {
        // Editing existing Category
        const response = await axios.put(
          `http://org-bay.runasp.net/api/Categories/${location.state.id}`,
          { name: categoryName }
        );
        localStorage.setItem("alertMessage", "تم تعديل الفئه بنجاح");
      } else {
        const response = await axios.post("http://org-bay.runasp.net/api/Categories", {
          name: categoryName,
        });

        // تحقق من الاستجابة
        if (response.data) {
          localStorage.setItem("alertMessage", "تم إضافة فئة التذكرة بنجاح");
        }
      }
      navigate("/AllCategories");
    } catch (error) {
      console.error("There was an error adding the category!", error);
    }
  };

  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">فئة التذكرة</h2>

          <Link to="/AllCategories">
            <button className="btn btn-primary add-button">رجوع </button>
          </Link>
        </div>

        <div className="card table-style" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            <h3>أضف فئة التذكرة</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="categoryName" className="d-flex">
                        الاسم
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={categoryName}
                        onChange={handleInputChange}
                      />
                      {errors.categoryName && (
                        <h6 className="error-log">{errors.categoryName}</h6>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                style={{ fontSize: "20px" }}
                type="submit"
                className="btn btn-primary mt-4"
              >
                حفظ
              </button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
