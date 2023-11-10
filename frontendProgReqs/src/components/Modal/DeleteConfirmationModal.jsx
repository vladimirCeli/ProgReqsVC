import { TrashIcon } from '@heroicons/react/24/outline';

const DeleteConfirmationModal = ({ open, onClose, onDelete }) => {
  const overlayClasses = open
    ? 'fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300'
    : 'fixed z-50 hidden';

  const modalClasses = open
    ? 'fixed z-50 w-full max-w-md p-6 bg-gray-300 rounded shadow-lg transform transition duration-300 ease-out scale-100 opacity-100'
    : 'fixed z-50 hidden';

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className="fixed w-full h-full flex items-center justify-center">
        <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col items-center">
            <TrashIcon className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Confirmar eliminación</h2>
            <p className="text-lg mb-6 text-center">
              ¿Estás seguro de que deseas eliminar este elemento?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 rounded bg-gray-400 text-gray-700 hover:bg-gray-500 transition-colors duration-300 transform hover:scale-105"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 transform hover:scale-105"
                onClick={onDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
