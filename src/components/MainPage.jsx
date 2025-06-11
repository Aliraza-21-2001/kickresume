import React, { useContext } from "react";
import { Box, Container, Typography } from "@mui/material";
import FontSelector from "./FontSelector.jsx";
import PrintLayout from "./PrintLayout";
import MyContext from "./ContexExp";
import FlipCard from "./FlipCard.jsx";

const MainPage = () => {
  const { fontFamily,} = useContext(MyContext);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6f8fd 50%, #e8eef9 50%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: fontFamily,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          margin: "2rem",
          padding: "2rem",
          flex: 1,
          animation: "slideUp 0.8s ease-out forwards",
          "@keyframes slideUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(50px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: { xs: "center", md: "space-between" },
              marginBottom: "3rem",
              position: "relative",
              opacity: 0,
              animation: "fadeIn 0.8s ease-out 0.3s forwards",
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-1rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                height: "3px",
                backgroundColor: "#1a237e",
                borderRadius: "2px",
              },
            }}
          >
            <Box
              component="img"
              src="/koilawala.png"
              alt="Company Logo"
              sx={{
                width: "auto",
                height: { xs: "20px", md: "40px", lg: "100px" },
                objectFit: "contain",
                filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />
            <Box sx={{ ml: 2, flex: 1 }} />
            <FontSelector
              sampleText={null}
              sx={{
                background: "none",
                boxShadow: "none",
                border: "none",
                p: 0,
                m: 0,
                minWidth: "220px",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "flex-start" },
              gap: "3rem",
              mt: 2,
              opacity: 0,
              animation: "fadeIn 0.8s ease-out 0.6s forwards",
            }}
          >
            <Box
              sx={{
                flex: "1",
                width: "100%",
                maxWidth: { md: "40%" },
                position: "relative",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                background: "none",
                boxShadow: "none",
                border: "none",
              }}
            >
              <Box
                component="img"
                src="/fulllogo.png"
                alt="My Logo"
                sx={{
                  width: "auto",
                  height: { xs: "100px", md: "200px", lg: "360px" },
                  objectFit: "contain",
                  display: { xs: "none", md: "block" },
                  filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  background:
                    "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginTop: { xs: "1rem", sm: "2rem", md: "2.1rem" },
                  fontWeight: 700,
                  textAlign: { xs: "center", md: "center" },
                  letterSpacing: "0.5px",
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  textShadow: "none",
                  position: "relative",
                  fontFamily: fontFamily,
                  display: { xs: "none", md: "block" },
                }}
              >
                Enter your Details and Weight
              </Typography>

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  background:
                    "linear-gradient(135deg, #006838 0%, #008d4c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginTop: "1rem",
                  backgroundClip: "text",
                  fontWeight: 700,
                  textAlign: { xs: "center", md: "center" },
                  letterSpacing: "0.5px",
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  textShadow: "none",
                  position: "relative",
                  fontFamily: fontFamily,
                  display: { xs: "none", md: "block" },
                }}
              >
                Easy to Print...
              </Typography>
            </Box>
            <Box
              sx={{
                flex: "1",
                width: "100%",
                height: "100%",
                maxWidth: { md: "60%" },

                padding: { xs: "0rem", md: "2rem" },
                backgroundColor: "rgba(246, 248, 253, 0.5)",
                borderRadius: "12px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FlipCard />
            </Box>
          </Box>
        </Container>
      </Box>
      <PrintLayout />
    </Box>
  );
};

export default MainPage;
