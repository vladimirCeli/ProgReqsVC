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

const CategoriesSecurityTable = ({
  categoriesecurity,
  handleEditcategoriesecurity,
  handleDeletecategoriesecurity,
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
          {Array.isArray(categoriesecurity) && categoriesecurity.length > 0 ? (
            categoriesecurity.map((l) => (
              <TableRow key={l.id}>
                <TableCell>{l.name}</TableCell>
                <TableCell>
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditcategoriesecurity(l.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeletecategoriesecurity(l.id)}
                    >
                      Borrar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/subcategories/${l.id}`)}
                    >
                      Ingresar subcategorias
                    </Button>
                  </>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No hay categorias para mostrar</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesSecurityTable;
