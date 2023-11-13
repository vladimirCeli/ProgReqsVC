import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import AuthSeccion from "./AuthSeccion";

const Navbar = () => {
  return (
    <>
      <Disclosure
        as="nav"
        className="p-2 fixed w-full top-0 z-50"
        style={{ backgroundColor: "#0c2342" }}
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div>
                  <a
                    href="https://www.openstreetmap.org/?mlat=-4.03364&mlon=-79.20311#map=19/-4.03364/-79.20311"
                    target="_blank"
                    className="text-white text-base sm:text-xs font-sans font-bold hover:underline"
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
                    {/* Add your other menu items here */}
                  </ul>
                </div>
                <Disclosure.Button className="md:hidden text-white">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
                <div>
                  <a
                    href="https://unl.edu.ec/contactenos"
                    target="_blank"
                    className="text-white sm:text-xs font-sans font-bold hover:underline"
                    rel="noopener noreferrer"
                  >
                    Contáctenos
                  </a>
                </div>
              </div>
            </div>

            {/* Responsive Menu */}
            <Disclosure.Panel className="md:hidden">
              <div className="flex flex-col items-center p-2">
                <a
                  href="https://unl.edu.ec/acceso-pcd"
                  target="_blank"
                  className="block text-white sm:text-xs font-sans font-bold mb-2 hover:text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  Acceso P C D
                </a>
                <a
                  href="https://estudiantes.unl.edu.ec/"
                  target="_blank"
                  className="block text-white sm:text-xs font-sans font-bold mb-2 hover:text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  SGA Estudiantes
                </a>
                <a
                  href="https://siaaf.unl.edu.ec/"
                  target="_blank"
                  className="block text-white sm:text-xs font-sans font-bold mb-2 hover:text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  SIAAF
                </a>
                <a
                  href="https://docentes.unl.edu.ec/"
                  target="_blank"
                  className="block text-white sm:text-xs font-sans font-bold mb-2 hover:text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  SGA Docentes
                </a>
                <a
                  href="https://eva.unl.edu.ec/"
                  target="_blank"
                  className="block text-white sm:text-xs font-sans font-bold mb-2 hover:text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  EVA
                </a>
                <a
                  href="https://elsa.unl.edu.ec"
                  target="_blank"
                  className="block text-white sm:text-xs font-sans font-bold mb-2 hover:text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  ELSA
                </a>
                <a
                  href="https://mail.google.com/a/unl.edu.ec"
                  target="_blank"
                  className="block text-white sm:text-xs font-sans font-bold mb-2 hover:text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  Correo Institucional
                </a>
                <a
                  href="https://unl.edu.ec/gaceta"
                  target="_blank"
                  className="block text-white sm:text-xs font-sans font-bold hover:text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  Gaceta Oficial UNL
                </a>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <AuthSeccion />
    </>
  );
};

export default Navbar;
