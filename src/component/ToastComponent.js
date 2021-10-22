import React from "react";
import { Toast } from "react-bootstrap";

function ToastComponent({ children }) {
  return (
    <div style={{ position: "fixed", zIndex: 1, top: "7px", right: "10px" }}>
      <Toast
        className={`border text-black ${
          children.type === "success"
            ? "border-success bg-success"
            : "border-danger bg-danger"
        }`}
        show={children.show}
      >
        <Toast.Header
          className={`text-black ${
            children.type === "success" ? "border-success" : "border-danger"
          }`}
          closeButton={false}
        >
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{children.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastComponent;
