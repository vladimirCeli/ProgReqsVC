import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  
  const RequirementSTable = ({
    requirementsecurity,
    handleEditRequirementSecurity,
    handleDeleteRequirementSecurity,
  }) => {
    return (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numeración</TableCell>
              <TableCell>Nivel de requerimientos</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>CWE</TableCell>
              <TableCell>NIST</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(requirementsecurity) &&
            requirementsecurity.length > 0 ? (
              requirementsecurity.map((requirementsecurity) => (
                <TableRow key={requirementsecurity.id}>
                  <TableCell>{requirementsecurity.numeration}</TableCell>
                  <TableCell>
                    {requirementsecurity.level_requirements.join(", ")}{" "}
                  </TableCell>
                  <TableCell>{requirementsecurity.description}</TableCell>
                  <TableCell>{requirementsecurity.cwe}</TableCell>
                  <TableCell>{requirementsecurity.nist}</TableCell>
                  <TableCell>
                    <>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleEditRequirementSecurity(requirementsecurity.id)
                        }
                        sx={{ mr: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleDeleteRequirementSecurity(
                            requirementsecurity.id
                          )
                        }
                      >
                        Eliminar
                      </Button>
                    </>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  No hay requerimientos de seguridad
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default RequirementSTable;
  