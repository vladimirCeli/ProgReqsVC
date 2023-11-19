import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { Logo } from "../Logo";
import useAuth from "../../hooks/useAuth";
import SeccionUNL from "./SeccionUNL";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const [userRoles, setUserRoles] = useState(null);
  const [usern, setUsern] = useState(null);

  useEffect(() => {
    const fetchAuthInfo = async () => {
      if (auth) {
        await setUserRoles(auth.roles);
        await setUsern(auth.username);
      }
    };
    fetchAuthInfo();
  }, [auth]);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="p-2 fixed w-full top-0 z-50"
        style={{ backgroundColor: "#0c2342" }}
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px6 lg:px8">
              <div className="flex items-center justify-between">
                  <div>
                    <Link to="/" className="h-8 w-auto">
                      <Logo className="h-8 w-auto" />
                    </Link>
                  </div>
                  
                    <div className="hidden md:block">
                      <ul className="flex space-x-2 text-white sm:text-xs font-sans font-bold">
                      <li>
                      <Link to="/projects/new" className="px-3 py-2">
                        <a
                          target="_blank"
                          className="text-white hover:text-gray-300 hover:underline px-3 py-2 sm:text-sm font-sans font-semibold"
                          rel="noopener noreferrer"
                        >
                          Nuevo proyecto
                        </a>
                      </Link>
                      </li>
                      </ul>
                    </div>
                  
                    
                  <Disclosure.Button className="md:hidden text-white">
                    {open ? (
                      <XMarkIcon className="h-6 w-6"/>
                    ) : (
                      <Bars3Icon className="h-6 w-6"/>
                    )}
                  </Disclosure.Button>
                
                <div>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-transparent text-sm">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <p className="relative rounded-full bg-transparent p-1 text-gray-50 hover:text-gray-100">
                          {usern}
                        </p>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                        style={{ backgroundColor: "#0c2342" }}
                      >
                        <Menu.Item as="button">
                          {({ active }) =>
                            userRoles === 1 && (
                              <Link
                                to="/managequestionnaire"
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block px-4 py-2 text-sm text-gray-50 font-medium w-48"
                                )}
                              >
                                Gestionar Cuestionarios
                              </Link>
                            )
                          }
                        </Menu.Item>
                        <Menu.Item as="button">
                          {({ active }) =>
                            userRoles === 1 && (
                              <Link
                                to="/categoriesecurity"
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block px-4 py-2 text-sm text-gray-50 font-medium w-48"
                                )}
                              >
                                Gestionar requerimientos
                              </Link>
                            )
                          }
                        </Menu.Item>
                        <Menu.Item as="button">
                          {({ active }) => (
                            <Link
                              to="/listsprojects"
                              className={classNames(
                                active ? "bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-gray-50 font-medium w-48"
                              )}
                            >
                              Mis Proyectos
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item as="button">
                          {({ active }) => (
                            <button
                              onClick={signOut}
                              className={classNames(
                                active ? "bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-gray-50 font-medium w-48"
                              )}
                            >
                              Cerrar Sesión
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="lex flex-col items-center p-2">
                <Link to="/projects/new">
                  <a
                    target="_blank"
                    className="block text-white sm:text-xs font-sans font-bold mb-2 hover:text-gray-300 hover:underline"
                    rel="noopener noreferrer"
                  >
                    Nuevo proyecto
                  </a>
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <SeccionUNL />
    </>
  );
}
