import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AuthSection = () => {
  return (
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
          {/* Utilizando Disclosure para hacer la sección de autenticación responsiva */}
          <Disclosure as="div" className="md:hidden flex items-center">
            <Disclosure.Button className="text-gray-900 sm:text-sm font-sans font-bold flex items-center">
              {({ open }) => (
                <>
                  {!open ? (
                    <>
                      <span>Autenticación</span>
                    </>
                  ) : (
                    <>
                      <span className="sr-only">Cerrar Autenticación</span>
                      <XMarkIcon className="h-6 w-6 ml-1" />
                    </>
                  )}
                </>
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-900 sm:text-sm font-sans font-bold">
              <ul className="flex flex-col space-y-4 text-center items-center">
                <li>
                  <Link to="/login">
                    <a className="hover:text-gray-700">Iniciar sesión</a>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <a className="hover:text-gray-700">Registrarse</a>
                  </Link>
                </li>
              </ul>
            </Disclosure.Panel>
          </Disclosure>

          {/* Sección visible en pantallas medianas y grandes */}
          <ul className="hidden md:flex space-x-4 text-gray-900 sm:text-sm font-sans font-bold text-center items-center">
            <li>
              <Link to="/login">
                <a className="hover:text-gray-700">Iniciar sesión</a>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <a className="hover:text-gray-700">Registrarse</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;
