/* eslint-disable react/prop-types */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

const RequirementSModal = ({
  isFormVisible,
  handleCancel,
  newRequirementSecurity,
  setnewRequirementSecurity,
  isEditing,
  createOrUpdateRequirementSecurity,
}) => {
  const cancelButtonRef = useRef(null);
  const nivelOptions = [
    { label: "Nivel 1", value: 1 },
    { label: "Nivel 2", value: 2 },
    { label: "Nivel 3", value: 3 },
  ];
  return (
    <Transition.Root show={isFormVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleCancel}
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

        <div className="fixed inset-0 z-10 flex items-center justify-center">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-6 pb-6 pt-8 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start sm:mx-4">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ClipboardDocumentCheckIcon
                        className="h-6 w-6 text-indigo-950"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Requisito
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {isEditing
                            ? "Editar requerimiento"
                            : "Crear requerimiento"}
                        </p>
                        <label className="">
                        <p className="font-semibold">
                          Numeración
                          </p>
                          <input
                            type="text"
                            className="w-full cursor-pointer border rounded p-2 border-gray-300"
                            placeholder="Ejemplo: 1.1.2"
                            label="Numeración"
                            value={newRequirementSecurity.numeration}
                            onChange={(e) =>
                              setnewRequirementSecurity({
                                ...newRequirementSecurity,
                                numeration: e.target.value,
                              })
                            }
                          />
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          <p className="font-semibold">
                          Nivel de seguridad de requisito
                          </p>
                          {nivelOptions.map((option) => (
                            <label
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                value={option.value}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const selectedOptions = isChecked
                                    ? [
                                        ...newRequirementSecurity.level_requirements,
                                        option.value,
                                      ]
                                    : newRequirementSecurity.level_requirements.filter(
                                        (value) => value !== option.value
                                      );

                                  setnewRequirementSecurity({
                                    ...newRequirementSecurity,
                                    level_requirements: selectedOptions,
                                  });
                                }}
                                checked={newRequirementSecurity.level_requirements.includes(
                                  option.value
                                )}
                                className="mr-2"
                              />
                              {option.label}
                            </label>
                          ))}
                        </div>
                        <label className="">
                        <p className="font-medium">
                          Descripción
                          </p>
                          <input
                            type="text"
                            className="w-full cursor-pointer border rounded p-2 border-gray-300"
                            placeholder="Descripción"
                            label="Descripción"
                            value={newRequirementSecurity.description}
                            onChange={(e) =>
                              setnewRequirementSecurity({
                                ...newRequirementSecurity,
                                description: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label className="">
                        <p className="font-medium">
                          CWE
                          </p>
                          <input
                            type="text"
                            className="w-full cursor-pointer border rounded p-2 border-gray-300"
                            label="CWE"
                            placeholder="Ejemplo: 124"
                            value={newRequirementSecurity.cwe}
                            onChange={(e) =>
                              setnewRequirementSecurity({
                                ...newRequirementSecurity,
                                cwe: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label className="">
                        <p className="font-medium">
                          NIST
                          </p>
                          <input
                            type="text"
                            className="w-full cursor-pointer border rounded p-2 border-gray-300"
                            label="NIST"
                            placeholder="Ejemplo: 5.1.1.2"
                            value={newRequirementSecurity.nist}
                            onChange={(e) =>
                              setnewRequirementSecurity({
                                ...newRequirementSecurity,
                                nist: e.target.value,
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={createOrUpdateRequirementSecurity}
                    style={{ backgroundColor: "#2c3e50" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#465669")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2c3e50")
                    }
                  >
                    {isEditing ? "Guardar cambios" : "Crear"}
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCancel}
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

export default RequirementSModal;
