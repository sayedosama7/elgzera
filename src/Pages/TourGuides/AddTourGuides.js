import React, { useState, useEffect } from "react";
import axios from "axios";
import Drawer from "../../Components/Drawer";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AddTourGuides() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    statusId: "",
    phone: "",
    profitRatio: "",
  });
  const location = useLocation();

  useEffect(() => {
    const { id } = location.state || {};
    if (id) {
      fetchTourGuideDetails(id);
    }
  }, [location.state]);
  const fetchTourGuideDetails = async (id) => {
    try {
      const response = await axios.get(`http://org-bay.runasp.net/api/TourGuides`);
      const tour = response.data.find((tour) => tour.id === id);
      setFormData(tour);
    } catch {
      console.log("error");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";
    if (!formData.email) newErrors.email = " من فضلك ادخل البريد الالكتروني";
    if (!formData.statusId) newErrors.statusId = "من فضلك اختر الحالة ";
    if (!formData.phone) newErrors.phone = "من فضلك ادخل رقم الهاتف  ";
    if (!formData.profitRatio)
      newErrors.profitRatio = "من فضلك ادخل نسبة الربح ";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      if (location.state && location.state.id) {
        // Editing existing Category
        const response = await axios.put(
          `http://org-bay.runasp.net/api/TourGuides/${location.state.id}`,
          formData
        );
        localStorage.setItem("alertMessage", "تم تعديل المرشد بنجاح");
      } else {
        const response = await axios.post("http://org-bay.runasp.net/api/TourGuides", formData);

        if (response.data) {
          localStorage.setItem("alertMessage", "تم إضافة المرشد بنجاح");
        }
      }
      navigate("/AllTourGuides");
    } catch (error) {
      console.error("There was an error adding the tour guide!", error);
    }
  };

  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">المرشدين</h2>
          <Link to="/AllTourGuides">
            <button className="btn btn-primary add-button">رجوع </button>
          </Link>
        </div>
        <div className="card table-style" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            <h3>اضف البيانات</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="d-flex">
                        الاسم
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.name && (
                      <h6 className="error-log">{errors.name}</h6>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email" className="d-flex">
                        البريد الالكتروني
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.email && (
                      <h6 className="error-log">{errors.email}</h6>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="statusId" className="d-flex">
                      الحاله
                    </label>
                    <select
                      className="form-control"
                      id="statusId"
                      name="statusId"
                      value={formData.statusId}
                      onChange={handleInputChange}
                    >
                      <option value="">اختر الحالة</option>
                      <option value="1">نشط</option>
                      <option value="2">غير نشط</option>
                    </select>
                    {errors.statusId && (
                      <h6 className="error-log">{errors.statusId}</h6>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phone" className="d-flex">
                      رقم الهاتف
                    </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    {errors.phone && (
                      <h6 className="error-log">{errors.phone}</h6>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="profitRatio" className="d-flex">
                      نسبة الربح
                    </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="profitRatio"
                        name="profitRatio"
                        value={formData.profitRatio}
                        onChange={handleInputChange}
                        startAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </FormControl>
                    {errors.profitRatio && (
                      <h6 className="error-log">{errors.profitRatio}</h6>
                    )}
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
