import React from 'react';
import { useHistory } from 'react-router-dom';

const Custom404 = () => {
  const history = useHistory();

  setTimeout(() => {
    history.push('/');
  }, 5000);

  return (
    <div style={styles.container}>
      <div style={styles.errorContent}>
        <h1 style={styles.errorHeader}>404</h1>
        <p style={styles.errorMessage}>Oops! The page you're looking for is not here.</p>
        <a href="/" style={styles.homeLink}>Go Back to Home</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    background: "linear-gradient(135deg, #f5f7fa 0, #c3cfe2 100%)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    overflow: "hidden",
  },
  errorContent: {
    borderRadius: "40px",
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    width: "650px",
    minHeight: "450px",
    position: "relative",
    overflow: "hidden",
  },
  errorHeader: {
    fontSize: "100px",
    color: "#000",
    marginTop: "40px",
    textShadow: "0 0 200px #fff, 0 0 60px #fff, 0 0 3px #fff",
  },
  errorMessage: {
    fontSize: "18px",
    color: "#000",
    marginTop: "-10px",
  },
  homeLink: {
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#000",
    textDecoration: "none",
    padding: "9px 16px",
    borderRadius: "20px",
    marginTop: "20px",
    marginBottom: "40px",
    transition: "all 0.3s ease",
  }
};

export default Custom404;
