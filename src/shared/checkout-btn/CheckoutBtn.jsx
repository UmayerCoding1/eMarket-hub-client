import { Button } from "@mui/material";
import React from "react";

const CheckoutBtn = ({ children }) => {
  return (
    <div>
      <Button
        sx={{
          backgroundColor: "darkorange",
          "&:hover": { backgroundColor: "darkorange" },
        }}
        variant="contained"
        color="success"
        className=" lg:w-full"
        
      >
        {children}
      </Button>
    </div>
  );
};

export default CheckoutBtn;
