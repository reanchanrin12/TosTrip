import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false, 
    },
    validationSchema: Yup.object({
      username: Yup.string().required('សូមបញ្ចូលឈ្មោះអ្នកប្រើ'),
      password: Yup.string().required('សូមបញ្ចូលពាក្យសម្ងាត់'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await fetch('https://tostrip.eunglyzhia.social/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus(data.message || 'ការចូលបរាជ័យ');
        } else {
          localStorage.setItem('accessToken', data.accessToken);
          if (values.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberMe');
          }
          setStatus('ការចូលជោគជ័យ!');
          window.location.href = '/place';
        }
      } catch (error) {
        setStatus('មានបញ្ហា! សូមព្យាយាមម្តងទៀត។');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-5">
      <h2 className="text-2xl font-bold text-Primary text-center mb-6">ចូលគណនី</h2>

      <div>
        <label className="block text-sm  text-Primary mb-1">ឈ្មោះអ្នកប្រើ</label>
        <input
          type="text"
          name="username"
          placeholder="ឈ្មោះអ្នកប្រើ"
          className="w-full border border-orange-300 p-2 rounded"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-Primary text-sm mt-1">{formik.errors.username}</div>
        )}
      </div>

      <div>
        <label className="block text-sm text-Primary mb-1">ពាក្យសម្ងាត់</label>
        <input
          type="password"
          name="password"
          placeholder="ពាក្យសម្ងាត់"
          className="w-full border border-orange-300 p-2 rounded"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-Primary text-sm mt-1">{formik.errors.password}</div>
        )}
        
        {/* ✅ Remember Me និង Forget password */}
        <div className="flex justify-between items-center mt-2">
          <label className="text-sm flex items-center gap-1 text-Primary">
            <input
              type="checkbox"
              name="rememberMe"
              onChange={formik.handleChange}
              checked={formik.values.rememberMe}
            />
            ចង់ចាំខ្ញុំ
          </label>
          <Link to="/auth/forgot-password" className="text-sm text-Primary hover:underline">
            ភ្លេចពាក្យសម្ងាត់?
          </Link>
        </div>
      </div>

      {formik.status && (
        <div className="text-sm text-center text-Primary">{formik.status}</div>
      )}

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded"
      >
        {formik.isSubmitting ? 'កំពុងចូល...' : 'ចូល'}
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        មិនទាន់មានគណនី?{' '}
        <Link to={'/auth/register'} className="text-Primaryfont-medium hover:underline">
          ចុះឈ្មោះ
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
