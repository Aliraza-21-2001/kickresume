import React, { useContext, useState } from "react";
import { Box, Typography, Paper, Switch, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Inputs from "./Inputs";
import Inputs2 from "./Inputs2";




const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 48,
  padding: 7,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 10.2,
   
   
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.shortest,
      
    }),
    "&.Mui-checked": {
      transform: "translateX(31px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#008d4c",
        opacity: 1,
      },
    },
    "&:not(.Mui-checked)": {
      transform: "translateX(0px)",
      color: "#fff",
      
      "& + .MuiSwitch-track": {
        backgroundColor: "#1e3c72",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 28,
    height: 28,
    boxShadow: "none",
    backgroundColor: "#fff",
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.shortest,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    opacity: 1,
    backgroundColor: "#008d4c",
    boxSizing: "border-box",
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const FlipCard = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <Container
     
      sx={{
      
        overflow: "clip",
        width: "100%",
        height:{ xs: "120vh", sm: "110vh", md: "90vh", lg: "75vh" },
        background: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CustomSwitch
            checked={isOn}
            onChange={() => setIsOn((prev) => !prev)}
          />
          <Typography
            sx={{
              color: "#888",
              fontWeight: 600,
              fontSize: "1.1rem",
              minWidth: 40,
            }}
          >
            {isOn ? "Switch Doubble Weight" : "Switch Single Weight"}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
   
         
          p: 1,
         
          position: "relative",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            minHeight: 400,
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: isOn ? 180 : 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              padding: 0,
              boxSizing: "border-box",
              backfaceVisibility: "hidden",
            }}
          >
            <Inputs />
          </div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              padding: 0,
              boxSizing: "border-box",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Inputs2 />
          </div>
        </motion.div>
      </Box>
    </Container>
  );
};

export default FlipCard;
