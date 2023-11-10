import { Link } from "react-router-dom";

import { Logo } from "../Logo";

const Navbar = () => {
  return (
    <>
      <nav
        className=" p-2 fixed w-full top-0 z-50"
        style={{ backgroundColor: "#0c2342" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <a
                href="https://www.openstreetmap.org/?mlat=-4.03364&mlon=-79.20311#map=19/-4.03364/-79.20311"
                target="_blank"
                className="text-white text-base sm:text-xs font-sans font-bold"
                rel="noopener noreferrer"
              >
                Mapa
              </a>
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-2 text-white sm:text-xs font-sans font-bold">
                <li>
                  <a
                    href="https://unl.edu.ec/acceso-pcd"
                    target="_blank"
                    className="hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    Acceso P C D
                  </a>{" "}
                  |
                </li>
                <li>
                  <a
                    href="https://estudiantes.unl.edu.ec/"
                    target="_blank"
                    className="hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    SGA Estudiantes
                  </a>{" "}
                  |
                </li>
                <li>
                  <a
                    href="https://siaaf.unl.edu.ec/"
                    target="_blank"
                    className="hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    SIAAF
                  </a>{" "}
                  |
                </li>
                <li>
                  <a
                    href="https://docentes.unl.edu.ec/"
                    target="_blank"
                    className="hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    SGA Docentes
                  </a>{" "}
                  |
                </li>
                <li>
                  <a
                    href="https://eva.unl.edu.ec/"
                    target="_blank"
                    className="hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    EVA
                  </a>{" "}
                  |
                </li>
                <li>
                  <a
                    href="https://elsa.unl.edu.ec"
                    target="_blank"
                    className="hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    ELSA
                  </a>{" "}
                  |
                </li>
                <li>
                  <a
                    href="https://mail.google.com/a/unl.edu.ec"
                    target="_blank"
                    className="hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    Correo Institucional
                  </a>{" "}
                  |
                </li>
                <li>
                  <a
                    href="https://unl.edu.ec/gaceta"
                    target="_blank"
                    className="hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    Gaceta Oficial UNL
                  </a>{" "}
                  |
                </li>
              </ul>
            </div>
            <div>
              <a
                href="https://unl.edu.ec/contactenos"
                target="_blank"
                className="text-white sm:text-xs font-sans font-bold"
                rel="noopener noreferrer"
              >
                Contáctenos
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-transparent py-8 mt-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between">
      <div>
        <img
          src="../../../img/unl.png"
          alt="Logo Universidad Nacional de Loja"
          className="h-16 w-36 md:h-24 md:w-64"
          style={{ padding: "15px 0 0 0" }}
        />
      </div>
      <ul className="hidden md:flex space-x-4 text-gray-900 sm:text-sm font-sans font-bold text-center items-center">
        <Link to="/login">
        <li><a className="hover:text-gray-700">Iniciar sesión</a></li>
        </Link>
        <Link to="/register">
        <li><a className="hover:text-gray-700">Registrarse</a></li>
        </Link>
      </ul>
    </div>
  </div>
</div>

    </>
  );
};

export default Navbar;
