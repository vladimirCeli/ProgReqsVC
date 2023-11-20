/* eslint-disable react/prop-types */
const RequirementSTable = ({
  requirementsecurity,
  handleEditRequirementSecurity,
  handleDeleteRequirementSecurity,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#2c3e50]">
          <tr>
            <th className="py-3 px-4">Numeración</th>
            <th className="py-3 px-4">Nivel de requerimientos</th>
            <th className="py-3 px-4">Descripción</th>
            <th className="py-3 px-4">CWE</th>
            <th className="py-3 px-4">NIST</th>
            <th className="py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(requirementsecurity) &&
          requirementsecurity.length > 0 ? (
            requirementsecurity.map((requirementsecurity, index) => (
              <tr key={requirementsecurity.id}className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300 transition-all duration-300'}>
                <td className="py-2 px-4 text-black items-center justify-center text-center">
                  {requirementsecurity.numeration}
                </td>
                <td className="py-2 px-4 text-black items-center justify-center text-center">
                  {requirementsecurity.level_requirements.join(", ")}{" "}
                </td>
                <td className="py-2 px-4 text-black">
                  {requirementsecurity.description}
                </td>
                <td className="py-2 px-4 text-black items-center justify-center text-center">
                  {requirementsecurity.cwe}
                </td>
                <td className="py-2 px-4 text-black items-center justify-center text-center">
                  {requirementsecurity.nist}
                </td>
                <td className="py-2 px-4 flex items-center text-center justify-center justify-items-center space-x-2">
                  <button
                    className="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() =>
                      handleEditRequirementSecurity(requirementsecurity.id)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() =>
                      handleDeleteRequirementSecurity(requirementsecurity.id)
                    }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4" colSpan={6}>
                No hay requerimientos de seguridad
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequirementSTable;
