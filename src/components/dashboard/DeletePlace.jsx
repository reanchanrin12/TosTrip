import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeletePlace = ({ placeUuid }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `https://tostrip.eunglyzhia.social/api/v1/places/${placeUuid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccess(true);
        setOpenModal(false);
      } else {
        throw new Error("Failed to delete place");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isLoading && <p className="text-sm text-gray-600">Deleting...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success ? (
        <p className="text-sm text-green-600">Place successfully deleted!</p>
      ) : (
        <>
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-[#fa3e19] cursor-pointer hover:bg-[#800000] text-white text-xs rounded-md transition-colors"
          >
            លុប
          </button>

          {/* Modal */}
          {openModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                  <h3 className="mb-5 text-lg font-medium text-gray-700">
                    តើអ្នកពិតជាចង់លុបទីនេះមែនទេ?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
                    >
                      បាទ/ចាស ខ្ញុំប្រាកដ
                    </button>
                    <button
                      onClick={() => setOpenModal(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded"
                    >
                      បោះបង់
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeletePlace;
