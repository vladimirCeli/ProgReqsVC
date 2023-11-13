const RequirementModal = ({
  open,
  handleClose,
  newRequirement,
  changeRequirements,
  submitRequirements,
  loading,
  editingId,
}) => {
  const overlayClasses = open
    ? "fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300"
    : "fixed z-50 hidden";

  const modalClasses = open
    ? "fixed z-50 w-full max-w-md p-6 bg-gray-100 rounded shadow-lg transform transition duration-300 ease-out scale-100 opacity-100"
    : "fixed z-50 hidden";

  return (
    <div className={overlayClasses}>
      <div className={modalClasses}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold mx-auto">
            {editingId ? "Editar Requisito" : "Agregar Requisito"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            X
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Especificación de Requisitos de Software IEEE 830:
        </p>
        <p>
          La especificación de requisitos de software sigue la plantilla IEEE
          830 e incluye los requisitos funcionales y no funcionales del sistema.
          Detalla las necesidades de los usuarios, las interfaces del sistema,
          restricciones, dependencias y otros requisitos adicionales.
        </p>

        <form onSubmit={submitRequirements} className="space-y-2">
          <input
            id="ident_requirement_id"
            type="text"
            placeholder="Identificación del requerimiento"
            name="ident_requirement_id"
            value={newRequirement.ident_requirement_id}
            onChange={changeRequirements}
            required
            className="w-full border border-gray-300 rounded p-3 mt-2"
          />
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            name="name"
            value={newRequirement.name}
            onChange={changeRequirements}
            required
            className="w-full border border-gray-300 rounded p-3 mt-2"
          />
          <input
            id="description"
            type="text"
            placeholder="Descripción"
            name="description"
            value={newRequirement.description}
            onChange={changeRequirements}
            required
            className="w-full border border-gray-300 rounded p-3 mt-2"
          />
          <select
            id="priority_req"
            name="priority_req"
            value={newRequirement.priority_req}
            onChange={changeRequirements}
            required
            className="w-full border border-gray-300 rounded p-3 mt-2"
          >
            <option value="">Seleccionar Prioridad</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-3 rounded transition duration-300 ease-in-out flex items-center text-center justify-center mt-4 bg-blue-500 hover:bg-blue-700"
            style={{ backgroundColor: "#2c3e50" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#465669")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2c3e50")}
          >
            {editingId ? "Editar" : "Agregar"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full border py-3 mt-2 rounded bg-gray-400 text-gray-700 hover:bg-gray-500 transition-colors duration-300"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequirementModal;
