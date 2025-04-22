import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router'; 

const RegisterForm = () => {
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('សូមបញ្ចូលនាមខ្លួន'),
      lastName: Yup.string().required('សូមបញ្ចូលនាមត្រកូល'),
      username: Yup.string().required('សូមបញ្ចូលឈ្មោះអ្នកប្រើ'),
      email: Yup.string().email('អ៊ីមែលមិនត្រឹមត្រូវ').required('សូមបញ្ចូលអ៊ីមែល'),
      password: Yup.string().min(6, 'ពាក្យសម្ងាត់តិចបំផុត 6 តួអក្សរ').required('សូមបញ្ចូលពាក្យសម្ងាត់'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'ពាក្យសម្ងាត់មិនដូចគ្នា')
        .required('សូមបញ្ចូលពាក្យសម្ងាត់ម្តងទៀត'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        const response = await fetch('https://tostrip.eunglyzhia.social/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username,
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            password: values.password,
          }),
          mode: 'cors',
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus(data.message || 'ការចុះឈ្មោះបរាជ័យ');
        } else {
          setStatus('ចុះឈ្មោះបានជោគជ័យ!');
          resetForm();
          setTimeout(() => {
            navigate('/auth/login'); 
          }, 1000);
        }
      } catch (error) {
        setStatus('មានបញ្ហាកើតឡើង សូមព្យាយាមម្ដងទៀត។');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 my-6 rounded-lg font-[Suwannaphum]">
      <h2 className="text-center text-2xl font-semibold text-Primary mb-6">បង្កើតគណនី</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-heade mb-1">នាមខ្លួន</label>
            <input
              type="text"
              name="firstName"
              placeholder="នាមខ្លួន"
              className="w-full border border-orange-300 p-2 rounded"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-Primary text-sm">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-heade mb-1">នាមត្រកូល</label>
            <input
              type="text"
              name="lastName"
              placeholder="នាមត្រកូល"
              className="w-full border border-Primary p-2 rounded"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm text-heade mb-1">ឈ្មោះអ្នកប្រើ</label>
          <input
            type="text"
            name="username"
            placeholder="ឈ្មោះអ្នកប្រើ"
            className="w-full border border-orange-300 p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div>

        <div>
          <label className="block text-sm text-heade mb-1">អ៊ីមែល</label>
          <input
            type="email"
            name="email"
            placeholder="អ៊ីមែល"
            className="w-full border border-orange-300 p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label className="block text-sm text-heade mb-1">ពាក្យសម្ងាត់</label>
          <input
            type="password"
            name="password"
            placeholder="ពាក្យសម្ងាត់"
            className="w-full border border-orange-300 p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <div>
          <label className="block text-sm text-heade mb-1">បញ្ចាក់ពាក្យសម្ងាត់</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="បញ្ចាក់ពាក្យសម្ងាត់"
            className="w-full border border-orange-300 p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-Primary text-sm">{formik.errors.confirmPassword}</div>
          )}
        </div>

        {formik.status && (
          <div className="text-sm text-center text-orange-600">{formik.status}</div>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-orange-400 hover:bg-orange-500 transition-all text-white font-semibold py-2 rounded"
        >
          {formik.isSubmitting ? 'កំពុងដំណើរការ...' : 'ចុះឈ្មោះ'}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          មានគណនីរួចហើយ?{' '}
          <Link to={'/auth/login'} className="text-orange-500 font-medium hover:underline">
            ចូលគណនី
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
