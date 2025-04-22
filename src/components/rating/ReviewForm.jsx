import React, { useState } from "react";
import postData from "../../services/post/postData";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa"; 

const ReviewForm = () => {
  const param = useParams();
  const [formData, setFormData] = useState({
    placeUuid: param.uuid,
    userUuid: "123345f@Rin",
    rating: 0,
    review: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleRatingClick = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await postData("reviews", formData);
      console.log("Response:", response);
      setMessage(" ការវាយតម្លៃត្រូវបានដាក់ជូនដោយជោគជ័យ!");
      setFormData({
        placeUuid: "",
        userUuid: "",
        rating: 0,
        review: ""
      });
    } catch (err) {
      console.error("Submission failed:", err);
      setMessage(" បរាជ័យក្នុងការបញ្ជូនការវាយតម្លៃ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg py-10 px-10 my-10 space-y-4"
    >
      <h2 className="text-xl font-bold">មតិនិងកាវាយតម្លៃ</h2>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <FaStar
            key={value}
            size={30}
            className={`cursor-pointer transition-colors ${
              value <= formData.rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => handleRatingClick(value)}
          />
        ))}
      </div>
      <textarea
        name="review"
        placeholder="សរសេរការវាយតម្លៃរបស់អ្នក..."
        value={formData.review}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
        required
      ></textarea>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-Primary text-white py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "កំពុងបញ្ចូន..." : "បញ្ចូន"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};

export default ReviewForm;
