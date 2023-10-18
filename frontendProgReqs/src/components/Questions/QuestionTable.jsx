import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const QuestionTable = ({ questions, handleEditQuestion, handleDeleteQuestion }) => {
  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Pregunta</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((q, index) => (
            <TableRow key={q._id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{q.question}</TableCell>
              <TableCell>
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditQuestion(q._id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteQuestion(q._id)}
                  >
                    Eliminar
                  </Button>
                </>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No hay preguntas registradas</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default QuestionTable;
