import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Button, Checkbox, FormControlLabel, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { motion } from "framer-motion";

const RequirementSelection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [securityRequirements, setSecurityRequirements] = useState([]);
  const [selectedSecurityRequirements, setSelectedSecurityRequirements] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const params = useParams();

  // Cargar datos desde el servidor al cargar el componente
  useEffect(() => {
    // Cargar categorías desde la API (solo para presentación)
    fetch("http://localhost:4000/categoriesecurity")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error al cargar categorías:", error));

    // Cargar subcategorías desde la API
    fetch("http://localhost:4000/subcategories")
      .then((response) => response.json())
      .then((data) => setSubcategoriesData(data))
      .catch((error) => console.error("Error al cargar subcategorías:", error));

    // Cargar requisitos de seguridad desde la API
    fetch("http://localhost:4000/requirementsec")
      .then((response) => response.json())
      .then((data) => setSecurityRequirements(data))
      .catch((error) => console.error("Error al cargar requisitos de seguridad:", error));
  }, []);

  const handleSubcategoryChange = (subcategory) => {
    // Lógica para manejar el cambio de selección de subcategoría
    const subcategoryId = subcategory.id;

    if (selectedSubcategories.includes(subcategoryId)) {
      setSelectedSubcategories(selectedSubcategories.filter(id => id !== subcategoryId));
      // Deseleccionar automáticamente los requisitos de seguridad
      setSelectedSecurityRequirements(selectedSecurityRequirements.filter(
        (id) => !securityRequirements.some((req) => req.subcategories_requirements_id === subcategoryId && req.id === id)
      ));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
      // Seleccionar automáticamente los requisitos de seguridad
      const newSelectedRequirements = securityRequirements
        .filter((req) => req.subcategories_requirements_id === subcategoryId)
        .map((req) => req.id);
      setSelectedSecurityRequirements([...selectedSecurityRequirements, ...newSelectedRequirements]);
    }
  };

  const handleSecurityRequirementChange = (requirement) => {
    // Lógica para manejar el cambio de selección de requisito de seguridad
    const requirementId = requirement.id;

    if (selectedSecurityRequirements.includes(requirementId)) {
      setSelectedSecurityRequirements(selectedSecurityRequirements.filter(id => id !== requirementId));
    } else {
      setSelectedSecurityRequirements([...selectedSecurityRequirements, requirementId]);
    }
  };

  const categoryAccordion = () => {
    if (categories.length === 0) {
      return null;
    }

    return (
      <Container>
        {categories.map((category) => (
          <Accordion key={category.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {subcategoryDropdown(category)}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    );
  };

  const subcategoryDropdown = (category) => {
    const subcategories = subcategoriesData.filter(
      (subcategory) => subcategory.categories_requirements_id === category.id
    );

    if (subcategories.length === 0) {
      return null;
    }

    return (
      <Container>
        {subcategories.map((subcategory) => (
          <motion.div
            key={subcategory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSubcategories.includes(subcategory.id)}
                  onChange={() => handleSubcategoryChange(subcategory)}
                />
              }
              label={subcategory.name}
            />
            {securityRequirementDropdown(subcategory)}
          </motion.div>
        ))}
      </Container>
    );
  };

  const securityRequirementDropdown = (subcategory) => {
    const requirements = securityRequirements.filter(
      (requirement) => requirement.subcategories_requirements_id === subcategory.id
    );

    if (requirements.length === 0) {
      return null;
    }

    return (
      <Container>
        {requirements.map((requirement) => (
          <motion.div
            key={requirement.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSecurityRequirements.includes(requirement.id)}
                  onChange={() => handleSecurityRequirementChange(requirement)}
                />
              }
              label={`${requirement.numeration} - ${requirement.description}`}
            />
          </motion.div>
        ))}
      </Container>
    );
  };

  const saveSelections = () => {
    // Crear un objeto que contenga los IDs de los requisitos de seguridad seleccionados
    console.log('este es el id del requisitos' + params.id)
    console.log('Estas son las respuestas seleccionadas')
    console.log(selectedSecurityRequirements);
    const selections = {
      requirements_id: params.id, // Supongo que params.id contiene el ID de los requisitos normales
      requirements_security_id: selectedSecurityRequirements,
    };

    // Enviar la solicitud POST al servidor para guardar las selecciones
    fetch("http://localhost:4000/intereq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selections),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Selecciones guardadas exitosamente en la base de datos.");
          // Puedes redirigir al usuario o mostrar un mensaje de éxito aquí
        } else {
          console.error("Error al guardar selecciones en la base de datos.");
        }
      })
      .catch((error) => console.error("Error al realizar la solicitud:", error));
  };

  return (
    <Container>
      <Typography variant="h4">ASVS</Typography>
      <Typography variant="h5">Seleccione Subcategorías y Requisitos de Seguridad</Typography>
      {categoryAccordion()}
      <Button variant="contained" onClick={saveSelections}>Guardar Selecciones</Button>
    </Container>
  );
};

export default RequirementSelection;
