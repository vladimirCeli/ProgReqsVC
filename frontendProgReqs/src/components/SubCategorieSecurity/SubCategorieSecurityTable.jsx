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
  
  const SubCategoriesSecurityTable = ({
    Subcategories,
    handleEditSubcategories,
    handleDeleteSubcategories,
    navigate,
  }) => {
    return (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(Subcategories) && Subcategories.length > 0 ? (
              Subcategories.map((Subcategories) => (
                <TableRow key={Subcategories.id}>
                  <TableCell>{Subcategories.name}</TableCell>
                    <TableCell>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleEditSubcategories(Subcategories.id)
                      }
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleDeleteSubcategories(
                          Subcategories.id
                        )
                      }
                    >
                      Eliminar
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/requirementssecurity/${Subcategories.id}`)}
                      >
                        Ingresar los requistos de seguridad
                      </Button>

                    
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No hay subcategorias de seguridad</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default SubCategoriesSecurityTable;
  