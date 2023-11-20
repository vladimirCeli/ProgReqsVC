/* eslint-disable react/prop-types */

const CategoriesSecurityTable = ({
  categoriesecurity,
  handleEditcategoriesecurity,
  handleDeletecategoriesecurity,
  navigate,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#2c3e50]">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categoriesecurity) && categoriesecurity.length > 0 ? (
            categoriesecurity.map((l, index) => (
              <tr
                key={l.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100"
                    : "bg-gray-300 transition-all duration-300"
                }
              >
                <td className="py-2 px-4 text-black items-center justify-center text-center">
                  {index + 1}
                </td>
                <td className="py-2 px-4 text-black">{l.name}</td>
                <td className="py-2 px-4 flex items-center text-center justify-center justify-items-center space-x-2">
                  <>
                    <button
                      className="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      onClick={() => handleEditcategoriesecurity(l.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      onClick={() => handleDeletecategoriesecurity(l.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      style={{ backgroundColor: "#2c3e50" }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#465669")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#2c3e50")
                      }
                      onClick={() => navigate(`/subcategories/${l.id}`)}
                    >
                      Subcategorias
                    </button>
                  </>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4" colSpan={3}>
                No hay categorias para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesSecurityTable;
