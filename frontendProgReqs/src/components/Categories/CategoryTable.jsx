/*eslint-disable react/prop-types */
const CategoryTable = ({ categories, handleEdit, handleDelete }) => {
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
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category._id}className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300 transition-all duration-300'}>
                 <td className="py-2 px-4 text-black items-center justify-center text-center">{index + 1}</td>
                 <td className="py-2 px-4 text-black">{category.name}</td>
                 <td className="py-2 px-4 flex items-center text-center justify-center justify-items-center space-x-2">
                  <button
                    className="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() => handleEdit(category._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() => handleDelete(category._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            <td className="py-2 px-4" colSpan={3}>No hay categorías registradas</td>
            </tr>
          )}
        </tbody>
    </table>
    </div>
  );
};

export default CategoryTable;
