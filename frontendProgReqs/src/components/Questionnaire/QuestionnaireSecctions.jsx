import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import QuizIcon from "@mui/icons-material/Quiz";

const sections = [
  {
    id: 1,
    title: "Preguntas",
    route: "/questions",
    color: "#ff9800",
    icon: <QuestionAnswerIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "Practicas",
    route: "/subsections",
    color: "#2196f3",
    icon: <ContactSupportIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "Categorías",
    route: "/categories",
    color: "#f44336",
    icon: <CategoryIcon fontSize="large" />,
  },
  {
    id: 4,
    title: "Cuestionarios",
    route: "/questionnaire/new",
    color: "#9c27b0",
    icon: <QuizIcon fontSize="large" />,
  },
];

const variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

export const QuestionnairesSection = () => {
  return (
    <div>
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial="hidden"
          animate="visible"
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ textDecoration: "none", marginBottom: "20px" }}
        >
          <Link to={section.route}>
            <div
              style={{
                backgroundColor: section.color,
                display: "flex",
                alignItems: "center",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  color: "white",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: section.color,
                    color: "primary",
                  }}
                >
                  {section.icon}
                  {section.title}
                </Button>
              </Typography>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
