/* eslint-disable react/prop-types */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TagIcon } from "@heroicons/react/24/outline";

import SelectItems from "../SelectOpt";

const CategoryModal = ({
  open,
  handleClose,
  category,
  setCategory,
  loading,
  submitCategory,
  categories,
  editingId,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
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
                      <TagIcon
                        className="h-6 w-6 text-indigo-950"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Categorías
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {editingId ? "Editar Categoria" : "Agregar Categoria"}
                        </p>
                        <label className="">
                          <input
                            type="text"
                            className="w-full cursor-pointer border rounded p-2 border-gray-300"
                            placeholder="Nombre de la categoría"
                            id="name"
                            label="Nombre"
                            name="name"
                            value={category.name}
                            onChange={(e) =>
                              setCategory({ ...category, name: e.target.value })
                            }
                          />
                        </label>
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold mb-2">
                            Prácticas
                          </h3>

                          <SelectItems
                            className="w-full cursor-pointer border rounded p-2 border-gray-300"
                            items={categories}
                            values={category.practices.map((p) => p._id)}
                            endpoint="subsection"
                            onChange={(newSelectedPractices) =>
                              setCategory({
                                ...category,
                                practices: newSelectedPractices.map(
                                  (practiceId) => ({
                                    _id: practiceId,
                                  })
                                ),
                              })
                            }
                            label="Prácticas"
                            campo="name"
                            selectedQuestions={categories
                              .filter((c) => c._id !== editingId)
                              .flatMap((c) => c.practices.map((p) => p._id))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    disabled={loading}
                    onClick={submitCategory}
                    style={{ backgroundColor: "#2c3e50" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#465669")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2c3e50")
                    }
                  >
                    {editingId ? "Guardar" : "Agregar"}
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleClose}
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

export default CategoryModal;
