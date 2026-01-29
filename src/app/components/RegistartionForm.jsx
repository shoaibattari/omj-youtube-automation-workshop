"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  FaYoutube,
  FaWhatsapp,
  FaCircleNotch,
  FaUser,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUsers,
  FaIdCard,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { baseUrl } from "../data/constant";

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const router = useRouter();
  // Default values for locked fields
  const DEFAULT_EVENT = "YouTube Automation Workshop";
  const DEFAULT_CATEGORY = "General";
  const DEFAULT_CITY = "Karachi";

  const initialValues = {
    event: DEFAULT_EVENT,
    category: DEFAULT_CATEGORY,
    fullName: "",
    fatherName: "",
    contact: "",
    email: "",
    community: "",
    cast: "",
    communityCardNumber: "",
    cnic: "",
    gender: "",
    dob: "",
    qualification: "",
    institute: "",
    address: "",
    city: DEFAULT_CITY,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father name is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().required("email is required"),
    community: Yup.string().required("community is required"),
    cast: Yup.string().required("cast is required"),
    communityCardNumber: Yup.string(),
    cnic: Yup.string().required("CNIC is required"),
    gender: Yup.string().required("Gender selection is required"),
    dob: Yup.date().required("DOB is required"),
    qualification: Yup.string().required("Qualification is required"),
    institute: Yup.string().required("Institute is required"),
    address: Yup.string().required("Address is required"),
  });
  // this is event form
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    // Explicitly mapping payload with default values
    const payload = {
      ...values,
      event: "696578d835d1959292cdfcc9",
      category: DEFAULT_CATEGORY,
      city: DEFAULT_CITY,
    };

    try {
      const response = await fetch(`${baseUrl}/participant/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setModalData(result.data || payload);
        setIsModalOpen(true);
        toast.success("Successfully Registered!");
        resetForm();
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAndNavigate = () => {
    setIsModalOpen(false);
    // Option A: Navigate to Home
    router.push("/");
    // Option B: Refresh page
    // window.location.reload();
  };

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
            <FaYoutube className="absolute -top-10 -right-10 text-red-600/20 text-[12rem] rotate-12" />
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter relative z-10">
              Registration <span className="text-red-600">Form</span>
            </h2>
            <p className="text-slate-400 font-bold relative z-10 uppercase tracking-widest text-xs mt-1">
              {DEFAULT_EVENT}
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form className="p-6 md:p-10 space-y-10">
                {/* 1. Personal Information */}
                <div>
                  <div className="flex items-center gap-2 mb-6 text-red-600 border-b pb-2">
                    <FaUser size={14} />
                    <h3 className="font-black uppercase tracking-widest text-xs text-slate-900">
                      Personal Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <InputField
                      label="Full Name"
                      name="fullName"
                      onChange={handleChange}
                      value={values.fullName}
                      touched={touched.fullName}
                      error={errors.fullName}
                    />
                    <InputField
                      label="Father / Husband Name"
                      name="fatherName"
                      onChange={handleChange}
                      value={values.fatherName}
                      touched={touched.fatherName}
                      error={errors.fatherName}
                    />
                    <InputField
                      label="Contact (WhatsApp)"
                      name="contact"
                      placeholder="03XXXXXXXXX"
                      onChange={handleChange}
                      value={values.contact}
                      touched={touched.contact}
                      error={errors.contact}
                    />
                    <InputField
                      label="CNIC Number"
                      name="cnic"
                      placeholder="42XXXXXXXXXXX"
                      onChange={handleChange}
                      value={values.cnic}
                      touched={touched.cnic}
                      error={errors.cnic}
                    />
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                      touched={touched.email}
                      error={errors.email}
                    />

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        className={`p-3 bg-slate-50 border rounded-xl outline-none focus:border-red-600 text-sm ${
                          touched.gender && errors.gender
                            ? "border-red-500"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <InputField
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      onChange={handleChange}
                      value={values.dob}
                      touched={touched.dob}
                      error={errors.dob}
                    />
                  </div>
                </div>

                {/* 2. Community Details */}
                <div>
                  <div className="flex items-center gap-2 mb-6 text-red-600 border-b pb-2">
                    <FaUsers size={14} />
                    <h3 className="font-black uppercase tracking-widest text-xs text-slate-900">
                      Community Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <InputField
                      label="Community"
                      name="community"
                      placeholder="e.g. Okhai Memon"
                      onChange={handleChange}
                      value={values.community}
                    />
                    <InputField
                      label="Cast"
                      name="cast"
                      placeholder="e.g. Khosa"
                      onChange={handleChange}
                      value={values.cast}
                    />
                    <InputField
                      label="Community Card #"
                      name="communityCardNumber"
                      onChange={handleChange}
                      value={values.communityCardNumber}
                    />
                  </div>
                </div>

                {/* 3. Education & Address */}
                <div>
                  <div className="flex items-center gap-2 mb-6 text-red-600 border-b pb-2">
                    <FaGraduationCap size={14} />
                    <h3 className="font-black uppercase tracking-widest text-xs text-slate-900">
                      Education & Address
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Qualification"
                      name="qualification"
                      onChange={handleChange}
                      value={values.qualification}
                      touched={touched.qualification}
                      error={errors.qualification}
                    />
                    <InputField
                      label="Institute"
                      name="institute"
                      onChange={handleChange}
                      value={values.institute}
                      touched={touched.institute}
                      error={errors.institute}
                    />
                    <div className="md:col-span-2">
                      <InputField
                        label="Residential Address"
                        name="address"
                        onChange={handleChange}
                        value={values.address}
                        touched={touched.address}
                        error={errors.address}
                      />
                    </div>
                    <InputField
                      label="City"
                      name="city"
                      value={values.city}
                      readOnly
                      className="bg-slate-100 cursor-not-allowed font-bold"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex justify-center items-center gap-3 disabled:bg-slate-400 group"
                >
                  {loading ? (
                    <>
                      <FaCircleNotch className="animate-spin text-xl" />{" "}
                      REGISTERING...
                    </>
                  ) : (
                    "SUBMIT REGISTRATION"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg">
              ✓
            </div>
            <h2 className="text-2xl font-black mb-2 uppercase">
              Success Your Registration!
            </h2>
            <h2 className="text-2xl font-black text-red-600 mb-2 uppercase">
              {" "}
              Your registartion ID is {modalData?.participantId}
            </h2>
            <p className="text-slate-500 mb-8 font-medium">
              Registration for {modalData?.fullName} has been received.
            </p>

            <Link
              href="/status"
              target="_blank"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-black py-4 rounded-2xl mb-4 transition-transform hover:scale-105"
            >
              <FaIdCard /> ENTRY PASS CREATE
            </Link>

            <button
              onClick={handleCloseAndNavigate}
              className="bg-slate-200 text-slate-900 font-bold p-4 cursor-pointer rounded-2xl hover:bg-slate-300 transition-colors uppercase tracking-widest text-xs"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function InputField({
  label,
  name,
  type = "text",
  error,
  touched,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </label>
      <input
        type={type}
        name={name}
        {...props}
        className={`p-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm focus:ring-4 focus:ring-red-50 ${
          touched && error
            ? "border-red-500"
            : "border-slate-200 focus:border-red-600"
        } ${className}`}
      />
      {touched && error && (
        <p className="text-[9px] text-red-600 font-bold uppercase mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
