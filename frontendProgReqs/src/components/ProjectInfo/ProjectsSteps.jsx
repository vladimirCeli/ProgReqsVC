/* eslint-disable react/prop-types */

import { ArrowRightIcon } from "@heroicons/react/24/outline";

const ImageComparison = ({ beforeImage, afterImage }) => {
  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">
        Cuestionarios OWASP SAMM
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center text-gray-600">
        Descubre el aliado definitivo para fortalecer la seguridad de tu
        software: OWASP SAMM. Evalúa y mejora tu proyecto en áreas clave como
        Gobernanza, Diseño, Implementación, Verificación y Operaciones. Da el
        siguiente paso en seguridad informática con nuestra evaluación y
        descubre cómo fortalecer tu postura de seguridad. Convierte la seguridad
        en una ventaja, no un obstáculo. Explora visualmente la evolución de la
        seguridad en tus proyectos con los cuestionarios de OWASP SAMM. Sumérgete en
        el cambio y potencia la madurez de tu proyecto.
      </p>

      <div className="flex justify-center items-center">
        <div className="w-full md:w-3/5 lg:w-2/5 p-4 md:p-8">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={beforeImage}
              alt="Antes"
              className="w-full h-auto transform transition-transform hover:scale-105 duration-300 ease-in-out rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <ArrowRightIcon className="h-12 w-12 text-gray-500 mx-4" />
        </div>
        <div className="w-full md:w-3/5 lg:w-2/5 p-4 md:p-8">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={afterImage}
              alt="Después"
              className="w-full h-auto transform transition-transform hover:scale-105 duration-300 ease-in-out rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;
