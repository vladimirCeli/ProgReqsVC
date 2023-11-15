import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ModalSub = ({
  subcategories,
  open,
  setOpen,
  loadRequirementsSecurity,
  requirements,
  securityRequirements,
  saveSelections,
  idparam,
}) => {
  const cancelButtonRef = useRef(null);
  const [expanded, setExpanded] = useState(null);
  const [selectedSecurityRequirements, setSelectedSecurityRequirements] =
    useState([]);

  useEffect(() => {
    setExpanded(null); // Colapsar todos los acordeones inicialmente
    setSelectedSecurityRequirements([]);
  }, [subcategories]);

  const handleAccordionToggle = (index, id) => {
    setExpanded((prev) => (prev === index ? null : index));
    loadRequirementsSecurity(id);
  };

  const handleCheckboxChange = (securityId) => {
    if (selectedSecurityRequirements.includes(securityId)) {
      setSelectedSecurityRequirements(
        selectedSecurityRequirements.filter((id) => id !== securityId)
      );
    } else {
      setSelectedSecurityRequirements([
        ...selectedSecurityRequirements,
        securityId,
      ]);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Subcategorias
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Selecione las subcategorias que desea adicionar.
                        </p>
                        <div className="mt-4">
                          {subcategories.map((subcategory, index) => (
                            <div key={index} className="mb-2">
                              <div
                                className="cursor-pointer border rounded p-2 bg-gray-100"
                                onClick={() =>
                                  handleAccordionToggle(index, subcategory.id)
                                }
                              >
                                <div className="flex justify-between items-center">
                                  <div className="font-medium text-gray-700">
                                    {subcategory.name}
                                  </div>
                                  <div>
                                    {expanded === index ? (
                                      <span>-</span>
                                    ) : (
                                      <span>+</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {expanded === index && (
                                <div className="border border-t-0 rounded-b p-2 bg-white">
                                  <ul>
                                    {securityRequirements.map(
                                      (securityRequirement) => (
                                        <li key={securityRequirement.id}>
                                          <label className="inline-flex items-center">
                                            <input
                                              type="checkbox"
                                              checked={selectedSecurityRequirements.includes(
                                                securityRequirement.id
                                              )}
                                              onChange={() =>
                                                handleCheckboxChange(
                                                  securityRequirement.id
                                                )
                                              }
                                              className="form-checkbox h-5 w-5 text-indigo-600"
                                            />
                                            <span className="ml-2">
                                              {securityRequirement.description}
                                            </span>
                                          </label>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      saveSelections(idparam, selectedSecurityRequirements);
                      setOpen(false);
                    }}
                  >
                    Aceptar
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalSub;
