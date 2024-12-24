import React from "react";

const ErrorPage = () => {
  const styles = {
    page: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      color: "#343a40",
      fontFamily: "Arial, sans-serif",
      position: "relative",
      overflow: "hidden",
    },
    content: {
      textAlign: "center",
      zIndex: 2,
    },
    title: {
      fontSize: "10rem",
      fontWeight: "bold",
      color: "#ff6b6b",
    },
    message: {
      fontSize: "2rem",
      margin: "0.5rem 0",
    },
    description: {
      fontSize: "1.2rem",
      margin: "1rem 0",
      color: "#6c757d",
    },
    button: {
      padding: "0.8rem 2rem",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#ff6b6b",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#fa5252",
    },
    background: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "120%",
      height: "120%",
      backgroundImage: "url('path-to-your-background-image')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      opacity: 0.1,
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>Page Not Found</p>
        <p style={styles.description}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>    
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={() => (window.location.href = "/")}
        >
          Go Back Home
        </button>
      </div>
      <div style={styles.background}></div>
    </div>
  );
};

export default ErrorPage;
