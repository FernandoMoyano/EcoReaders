import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IPaginationProps } from './IPaginationProps'

const Pagination: React.FC<IPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-8 mb-5">
      <FontAwesomeIcon
        icon={faLessThan}
        className={`px-4 py-2 mx-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-white cursor-not-allowed' : 'bg-gray-900 text-white cursor-pointer'}`}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
        >
          {index + 1}
        </button>
      ))}

      <FontAwesomeIcon
        icon={faGreaterThan}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 mx-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-white cursor-not-allowed' : 'bg-gray-900 text-white cursor-pointer'}`}
      />
    </div>
  )
}

export default Pagination
