import React from "react";
import { Table, TableBody, TableCell,Typography, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const TableComponent = ({ practices, handleEdit, handleDelete }) => {
  return (
    <div>
      <Typography variant="h4">Prácticas</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {practices.length > 0 ? (
              practices.map((q) => (
                <TableRow key={q._id}>
                  <TableCell>{q._id}</TableCell>
                  <TableCell>{q.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(q._id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(q._id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No hay prácticas</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
