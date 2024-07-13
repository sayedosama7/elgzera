import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function PlacesList() {
  return (
    <div className="container">
      <div className="row product-edit">
        <div className="col-md-4" style={{ marginLeft: "90px" }}>
          <Card sx={{ maxWidth: 305 }} style={{ marginTop: "30px" }}>
            <img
              style={{ width: "100%", height: "330px" }}
              src="https://d1agduesefcsfi.cloudfront.net/wp-content/uploads/2015/06/img-ice-creamery.jpg"
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ice Cream Shop
              </Typography>
              <Typography variant="body2" color="text.secondary">
                8 Products
              </Typography>
              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-primary ml-2"
                  //onClick={() => EditRow(category.id)}
                >
                  تعديل
                </button>
                <button
                  className="btn btn-danger"
                  // onClick={() => DeleteRow(category.id)}
                >
                  حذف
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-md-4">
          <Card
            sx={{ maxWidth: 305 }}
            style={{ marginTop: "30px", marginBottom: "80px" }}
          >
            <img
              style={{ width: "100%", height: "330px" }}
              src="https://www.urban75.org/photos/wales/images/hayes-island-05.jpg"
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Snacks bar
              </Typography>
              <Typography variant="body2" color="text.secondary">
                20 Products
              </Typography>
              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-primary ml-2"
                  //onClick={() => EditRow(category.id)}
                >
                  تعديل
                </button>
                <button
                  className="btn btn-danger"
                  // onClick={() => DeleteRow(category.id)}
                >
                  حذف
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
