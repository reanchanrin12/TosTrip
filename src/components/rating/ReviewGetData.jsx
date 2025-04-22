import { useEffect, useState } from "react";
import getData from "../../services/get/getData";
import { useParams } from "react-router";

import { FaStar } from "react-icons/fa";
export function ReviewGetData() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const param = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getData("reviews");
        console.log("All reviews fetched:", data);

        if (Array.isArray(data)) {
          const filtered = data.filter((review) => review.placeUuid === param.uuid);
          setReviews(filtered);
          console.log("Filtered reviews:", filtered);
        } else {
          setReviews([]);
          console.warn("API returned unexpected data:", data);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [param.uuid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (reviews.length === 0) return <p>No reviews for this place.</p>;

  return (
    <div className="space-y-4 px-6">
      <div className="max-h-96 overflow-y-auto space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border-b border-gray-200 ">
            <p className="text-sm sm:text-base text-gray-800 ">
              {review.review}
            </p>
            <div className="flex items-center mt-1 text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
              ))}
              <span className="ml-2 text-gray-500">{review.rating} / 5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
