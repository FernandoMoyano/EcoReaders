interface Props {
  onClose: () => void
}
const PublicationForm: React.FC<Props> = () => {
  return (
    <form className="mt-10 space-y-4">
      <div>
        {/* Titulo */}
        <input
          name="title"
          type="text"
          autoComplete="title"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
          placeholder="Titulo"
        />
      </div>
      <div>
        {/* description */}
        <textarea
          name="description"
          autoComplete="description"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
          placeholder="Descripcion"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        {/* Autor */}
        <input
          name="author"
          type="text"
          autoComplete="author"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
          placeholder="Autor"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        {/* Precio */}
        <input
          name="price"
          type="number"
          autoComplete="price"
          min={0}
          step={0.01}
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
          placeholder="0.00"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        {/* -Imagenes */}
        <input
          name="images"
          type="file"
          autoComplete="images"
          accept="image/*"
          required
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-emerald-500"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        {/* condition */}
        <select name="condition" id="condition">
          <option value="value1">New</option>
          <option value="value2">Like New</option>
          <option value="value3">Lined</option>
        </select>
      </div>
      <div className="flex items-center justify-between gap-4">
        {/* Categoria */}
        <select name="category" id="category">
          <option value="value1">Fiction</option>
          <option value="value2">No Fiction</option>
          <option value="value3">Mistery</option>
          <option value="value3">Adventure</option>
          <option value="value3">Romance</option>
          <option value="value3">Science Fiction</option>
          <option value="value3">Fancy</option>
          <option value="value3">Biography</option>
          <option value="value3">History</option>
          <option value="value3">Terror</option>
          <option value="value3">Sport</option>
          <option value="value3">Other</option>
        </select>
      </div>
      <div className="flex items-center justify-between gap-4">
        {/* Status */}
        <select name="status" id="status">
          <option value="value1">Available</option>
          <option value="value2">Sold</option>
          <option value="value3">Reserved</option>
        </select>
      </div>
      <div className="!mt-10">
        <button
          type="button"
          className="w-full py-2.5 px-4 text-sm rounded text-white bg-indigo-600 hover:bg-emerald-700 focus:outline-none"
        >
          Publicar
        </button>
      </div>
    </form>
  )
}

export default PublicationForm
