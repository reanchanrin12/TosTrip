import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("តម្រូវឲ្យបំពេញឈ្មោះ"),
  description: Yup.string().required("តម្រូវឲ្យបំពេញការពិពណ៌នា"),
  openHours: Yup.string().required("តម្រូវឲ្យបំពេញម៉ោងបើក"),
  entryFee: Yup.number().required("តម្រូវឲ្យបំពេញថ្លៃចូល").min(0),
  latitude: Yup.number().required("តម្រូវឲ្យបំពេញរយៈទទឹង").min(-90).max(90),
  longitude: Yup.number().required("តម្រូវឲ្យបំពេញរយៈបណ្តោយ").min(-180).max(180),
  categoryName: Yup.string().required("សូមជ្រើសរើសប្រភេទ"),
});

const EditPlaceForm = () => {
  const { placeUuid } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`https://tostrip.eunglyzhia.social/api/v1/places/${placeUuid}`);
        const data = await res.json();
        const [lat, lng] = data.location.split(",");
        setInitialValues({
          name: data.name,
          description: data.description,
          openHours: data.openHours,
          entryFee: data.entryFee,
          latitude: lat,
          longitude: lng,
          categoryName: data.categoryName,
        });
        setPreviewUrls(data.imageUrls || []);
      } catch (err) {
        console.error("Failed to fetch place:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [placeUuid]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const uploadImages = async () => {
    if (images.length === 0) return previewUrls; 
    try {
      const form = new FormData();
      images.forEach((img) => form.append("files", img));
      const res = await fetch("https://tostrip.eunglyzhia.social/api/v1/upload/multiple", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      return data.map((e) => e.uri);
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed.");
      return [];
    }
  };

  const handleSubmit = async (values) => {
    try {
      const imageUrls = await uploadImages();
      const placeData = {
        ...values,
        location: `${values.latitude},${values.longitude}`,
        imageUrls,
      };

      const response = await fetch(`https://tostrip.eunglyzhia.social/api/v1/places/${placeUuid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(placeData),
      });

      if (!response.ok) throw new Error("Failed to update");

      alert("បានកែប្រែដោយជោគជ័យ!");
      navigate("/admin/place");
    } catch (err) {
      alert("បរាជ័យក្នុងការកែប្រែ");
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen ">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>;
  if (!initialValues) return <p className="text-center text-red-500">មិនអាចទាញយកទិន្នន័យបានទេ</p>;
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md font-[Suwannaphum] mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">កែប្រែទីកន្លែង</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="space-y-4">
            <Field name="name" placeholder="ឈ្មោះទីកន្លែង" className="w-full p-3 border rounded-md" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

            <Field as="textarea" name="description" placeholder="ពិពណ៌នាអំពីទីកន្លែង" rows="6" className="w-full p-3 border rounded-md" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <Field name="openHours" placeholder="ម៉ោងបើក" className="w-full p-3 border rounded-md" />
                <ErrorMessage name="openHours" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full sm:w-1/2">
                <Field name="entryFee" type="number" placeholder="ថ្លៃចូល" className="w-full p-3 border rounded-md" />
                <ErrorMessage name="entryFee" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <Field name="latitude" placeholder="Latitude" className="w-full p-3 border rounded-md" />
                <ErrorMessage name="latitude" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full sm:w-1/2">
                <Field name="longitude" placeholder="Longitude" className="w-full p-3 border rounded-md" />
                <ErrorMessage name="longitude" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <Field as="select" name="categoryName" className="w-full p-3 border rounded-md bg-white">
              <option value="">ជ្រើសរើសប្រភេទ</option>
              <option value="តំបន់ប្រាសាទ">តំបន់ប្រាសាទ</option>
              <option value="តំបន់កោះ">តំបន់កោះ</option>
              <option value="តំបន់ភ្នំ">តំបន់ភ្នំ</option>
              <option value="តំបន់វាលរាប">តំបន់វាលរាប</option>
              <option value="ទីក្រុង">ទីក្រុង</option>
            </Field>
            <ErrorMessage name="categoryName" component="div" className="text-red-500 text-sm" />

            <div>
              <label className="block text-sm font-medium mb-1">រូបភាព</label>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full" />
              <div className="flex gap-5 mt-3">
                {previewUrls.map((url, i) => (
                  <img key={i} src={url} alt={`Preview ${i}`} className="rounded-md h-12 object-cover" />
                ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-Primary text-white py-2 rounded mt-4">
              បញ្ចូន
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPlaceForm;
