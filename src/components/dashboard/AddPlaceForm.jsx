import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alert } from "flowbite-react";  // Make sure to import Flowbite Alert

const validationSchema = Yup.object().shape({
  name: Yup.string().required("តម្រូវអោយបំពេញឈ្មោះ"),
  description: Yup.string().required("តម្រូវអោយបំពេញការពិពណ៌នា"),
  openHours: Yup.string().required("តម្រូវអោយបំពេញម៉ោងបើក"),
  entryFee: Yup.number()
    .required("តម្រូវអោយបញ្ចូលថ្លៃចូល")
    .min(0, "តម្លៃចូលត្រូវតែជាសូន្យ ឬជាលេខវិជ្ជមាន"),
  latitude: Yup.number()
    .required("តម្រូវអោយបញ្ចូលរយៈទទឹង")
    .min(-90)
    .max(90, "Latitude must be between -90 and 90"),
  longitude: Yup.number()
    .required("តម្រូវអោយបញ្ចូលរយៈបណ្តោយ")
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),
  categoryName: Yup.string().required("សូមជ្រើសរើសប្រភេទ "),
});

const AddPlaceForm = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");  // Success message state
  const [errorMessage, setErrorMessage] = useState("");  // Error message state
  const [uploadErrorMessage, setUploadErrorMessage] = useState(""); // Image upload error state

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const uploadImages = async () => {
    setUploading(true);
    try {
      const form = new FormData();
      images.forEach((img) => form.append("files", img));
      const res = await fetch("https://tostrip.eunglyzhia.social/api/v1/upload/multiple", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      var urls = [];
      data?.map((e) => urls.push(e.uri));
      return urls;
    } catch (err) {
      console.error("Image upload error:", err);
      setUploadErrorMessage("ការផ្ទុករូបភាពបរាជ័យ។ សូមព្យាយាមម្តងទៀត.");
      return [];
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const imageUrls = await uploadImages();

      const { latitude, longitude, ...rest } = values;

      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lng)) {
        setErrorMessage("ទីតាំងមិនត្រឹមត្រូវទេ");
        return;
      }

      const placeData = {
        name: rest.name,
        description: rest.description,
        openHours: rest.openHours,
        entryFee: rest.entryFee,
        latitude: lat,
        longitude: lng,
        location: `${lat},${lng}`,
        imageUrls,
        categoryName: rest.categoryName,
      };

      console.log(placeData);
      const response = await fetch("https://tostrip.eunglyzhia.social/api/v1/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(placeData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        setErrorMessage("បញ្ហាក្នុងការបញ្ចូនទិន្នន័យ: " + response.status);
        return;
      }

      const responseData = await response.json();
      setSuccessMessage("🏕️ ទីកន្លែងបានបញ្ចូនដោយជោគជ័យ!");
      resetForm();
      setImages([]);
      setPreviewUrls([]);
    } catch (err) {
      setErrorMessage("មានបញ្ហាពេលបញ្ចូនទិន្នន័យ");
      console.error("Error during submission:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border-gray-300 border-2 rounded-2xl shadow-md font-[Suwannaphum] mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">បន្ថែមទីកន្លែងថ្មី</h2>




      <Formik
        initialValues={{
          name: "",
          description: "",
          openHours: "",
          entryFee: 0.0,
          latitude: "",
          longitude: "",
          categoryName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <label htmlFor="name">ឈ្មោះទីកន្លែង</label>
            <Field name="name" placeholder="ឈ្មោះទីកន្លែង" className="w-full p-3 border border-gray-300 rounded-md" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

            <label htmlFor="description">ពិពណ៌នា</label>
            <Field
              as="textarea"
              name="description"
              placeholder="ពិពណ៌នាអំពីទីកន្លែង"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label htmlFor="openHours">ម៉ោងបើក</label>
                <Field name="openHours" placeholder="ម៉ោងបើក" className="w-full p-3 border border-gray-300 rounded-md" />
                <ErrorMessage name="openHours" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="entryFee">ថ្លៃចូល</label>
                <Field
                  name="entryFee"
                  type="number"
                  step="0.01"
                  placeholder="ថ្លៃចូល"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="entryFee" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label htmlFor="latitude">Latitude</label>
                <Field name="latitude" placeholder="Latitude" className="w-full p-3 border border-gray-300 rounded-md" />
                <ErrorMessage name="latitude" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="longitude">Longitude</label>
                <Field name="longitude" placeholder="Longitude" className="w-full p-3 border border-gray-300 rounded-md" />
                <ErrorMessage name="longitude" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <label htmlFor="location">ទីតាំង</label>
            <input
              type="text"
              value={`${values.latitude},${values.longitude}`}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
              placeholder="Location"
            />

            <Field
              as="select"
              name="categoryName"
              className="w-full p-3 border border-gray-300 rounded-md bg-white"
            >
              <option value="">ជ្រើសរើសប្រភេទ</option>
              <option value="តំបន់ប្រាសាទ">តំបន់ប្រាសាទ</option>
              <option value="តំបន់កោះ">តំបន់កោះ</option>
              <option value="តំបន់ភ្នំ">តំបន់ភ្នំ</option>
              <option value="តំបន់វាលរាប">តំបន់វាលរាប</option>
              <option value="ទីក្រុង">ទីក្រុង</option>
            </Field>
            <ErrorMessage name="categoryName" component="div" className="text-red-500 text-sm" />

            <div className="space-y-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors cursor-pointer">
                <label htmlFor="images" className="block text-lg font-semibold text-gray-700 mb-2">
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="images"
                  multiple
                />
                <label htmlFor="images" className="flex flex-col items-center space-y-2 cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-600">
                    Drag & Drop or click to upload <br />
                    <span className="font-semibold">Images</span>
                  </p>
                </label>
              </div>
            </div>

            {previewUrls.length > 0 && (
              <div className="flex justify-center items-center flex-wrap gap-2">
                {previewUrls.map((url, index) => (
                  <img key={index} src={url} alt={`preview-${index}`} className="h-10 object-cover rounded-md" />
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-Primary text-white py-2 rounded disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  <span>កំពុងផ្ទុករូបភាព...</span>
                </div>
              ) : (
                "បញ្ជូន"
              )}
            </button>

            {successMessage && (
              <Alert color="success" className="mb-4" onDismiss={() => setSuccessMessage("")}>
                <span>{successMessage}</span>
              </Alert>
            )}

            {errorMessage && (
              <Alert color="failure" className="mb-4" onDismiss={() => setErrorMessage("")}>
                <span>{errorMessage}</span>
              </Alert>
            )}

            {uploadErrorMessage && (
              <Alert color="failure" className="mb-4" onDismiss={() => setUploadErrorMessage("")}>
                <span>{uploadErrorMessage}</span>
              </Alert>
            )}

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPlaceForm;
