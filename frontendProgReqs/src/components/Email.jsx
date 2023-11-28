import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Container } from "@mui/material";

import { confirmEmailApi } from "../Services/Fetch";

export default function Email() {
  const confirmationToken = useParams();

  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    console.log("este es el confirmate token")
  console.log(confirmationToken.confirmationToken)
    fetch(confirmEmailApi + confirmationToken.confirmationToken, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setConfirmationMessage(data.message);
        } else {
          setConfirmationMessage("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
        setConfirmationMessage("Something went wrong");
      });
  }, [confirmationToken]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: 4,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Mensaje de Registro
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          <p>Estimado usuario,</p>
          <p>{confirmationMessage}</p>
          <p>Puedes cerrar esta ventana</p>
        </Typography>
      </Paper>
    </Container>
  );
}
