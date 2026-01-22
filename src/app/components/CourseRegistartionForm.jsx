"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  FaYoutube,
  FaCircleNotch,
  FaUser,
  FaGraduationCap,
  FaUsers,
  FaIdCard,
  FaReceipt,
  FaMoneyCheckAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import Link from "next/link";
import { baseUrl } from "../data/constant";

export default function CourseRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // Backend se aya hua student data
  const [previewSlip, setPreviewSlip] = useState(null);

  // Aapke Schema/Course JSON ke mutabiq Static IDs
  const COURSE_ID = "696fcd74924021332ec017cd";
  const CAMPUS_ID = "696fccb9924021332ec017c9";
  const SECTION_TIME = "11 am to 1 pm";

  const initialValues = {
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
    city: "Karachi",
    paymentSlip: null,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    fatherName: Yup.string().required("Father name is required"),
    contact: Yup.string().required("WhatsApp contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    community: Yup.string().required("Community selection is required"),
    cnic: Yup.string().min(13, "Min 13 digits").required("CNIC is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of Birth is required"),
    qualification: Yup.string().required("Qualification is required"),
    institute: Yup.string().required("Institute is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    paymentSlip: Yup.mixed().required("Payment slip is required"),
  });

  const handleSlipChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) return toast.error("File size < 3MB");
      setFieldValue("paymentSlip", file);
      setPreviewSlip(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const formData = new FormData();

    // Text fields
    Object.keys(values).forEach((key) => {
      if (key !== "paymentSlip") {
        formData.append(key, values[key] || "");
      }
    });

    // Mandatory Schema Fields
    formData.append("course", COURSE_ID);
    formData.append("campus", CAMPUS_ID);
    formData.append("sectionTime", SECTION_TIME);

    if (values.paymentSlip) {
      formData.append("paymentSlip", values.paymentSlip);
    }

    try {
      const response = await fetch(`${baseUrl}/student/add`, {
        method: "POST",

        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setModalData(result.data); // Backend se studentId aur fullName save karein
        setIsModalOpen(true);
        toast.success("Successfully Registered!");
        resetForm();
        setPreviewSlip(null);
      } else {
        toast.error(result.message || "Error submitting form");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-4xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
            <FaYoutube className="absolute -top-10 -right-10 text-red-600/20 text-[12rem] rotate-12" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                Course <span className="text-red-600">Admission</span>
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">
                YouTube Automation (Batch-01)
              </p>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, values, setFieldValue }) => (
              <Form className="p-6 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left Column */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-red-600 text-white p-6 rounded-3xl shadow-xl shadow-red-200 relative overflow-hidden">
                      <FaMoneyCheckAlt className="absolute -bottom-4 -right-4 text-white/10 text-7xl rotate-12" />
                      <h4 className="text-[10px] font-black uppercase mb-4 tracking-widest border-b border-white/20 pb-2 flex items-center gap-2">
                        🏦 Bank Account for Fee
                      </h4>
                      <div className="space-y-4 relative z-10">
                        <div>
                          <p className="text-[9px] font-bold text-red-100 uppercase">
                            Account Title
                          </p>
                          <p className="font-black text-sm">
                            The Okhai Memon Jamat HO
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-red-100 uppercase">
                            Bank Name
                          </p>
                          <p className="font-black text-sm">Meezan Bank</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-red-100 uppercase">
                            Account Number
                          </p>
                          <p className="font-black text-xl font-mono tracking-tighter">
                            0128-01000-47040
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-red-100 uppercase">
                            Branch
                          </p>
                          <p className="font-black text-sm uppercase">
                            Hussainabad
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                      <h4 className="text-[10px] font-black text-slate-900 uppercase mb-4 flex items-center gap-2">
                        <FaMoneyCheckAlt className="text-red-600" /> Fee Details
                      </h4>
                      <p className="text-3xl font-black text-slate-900 mb-6 font-mono">
                        Rs. {values.community === "Memon" ? "4,000" : "8,000"}
                      </p>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Payment Slip
                        </label>
                        <div className="relative h-56 rounded-3xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center overflow-hidden hover:border-red-400 transition-all cursor-pointer">
                          {previewSlip ? (
                            <img
                              src={previewSlip}
                              className="w-full h-full object-cover"
                              alt="Slip"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <FaReceipt className="text-slate-200 text-5xl mx-auto mb-3" />
                              <p className="text-[10px] text-slate-400 font-bold uppercase">
                                Click to upload slip
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={(e) => handleSlipChange(e, setFieldValue)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-8 space-y-8">
                    <SectionHeading
                      icon={<FaUser />}
                      title="Personal Details"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField
                        label="Full Name"
                        name="fullName"
                        onChange={handleChange}
                        value={values.fullName}
                        touched={touched.fullName}
                        error={errors.fullName}
                      />
                      <InputField
                        label="Father Name"
                        name="fatherName"
                        onChange={handleChange}
                        value={values.fatherName}
                        touched={touched.fatherName}
                        error={errors.fatherName}
                      />
                      <InputField
                        label="WhatsApp Contact"
                        name="contact"
                        onChange={handleChange}
                        value={values.contact}
                        touched={touched.contact}
                        error={errors.contact}
                      />
                      <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={values.email}
                        touched={touched.email}
                        error={errors.email}
                      />
                      <InputField
                        label="CNIC Number"
                        name="cnic"
                        onChange={handleChange}
                        value={values.cnic}
                        touched={touched.cnic}
                        error={errors.cnic}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <SelectField
                          label="Gender"
                          name="gender"
                          options={["Male", "Female"]}
                          values={values}
                          handleChange={handleChange}
                          touched={touched}
                          errors={errors}
                        />
                        <InputField
                          label="DOB"
                          name="dob"
                          type="date"
                          onChange={handleChange}
                          value={values.dob}
                          touched={touched.dob}
                          error={errors.dob}
                        />
                      </div>
                    </div>

                    <SectionHeading icon={<FaUsers />} title="Community Info" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <SelectField
                        label="Community"
                        name="community"
                        options={["Other", "Memon"]}
                        values={values}
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                      />
                      <InputField
                        label="Cast / Surname"
                        name="cast"
                        onChange={handleChange}
                        value={values.cast}
                        touched={touched.cast}
                        error={errors.cast}
                      />
                      <InputField
                        label="Card #"
                        name="communityCardNumber"
                        onChange={handleChange}
                        value={values.communityCardNumber}
                      />
                    </div>

                    <SectionHeading
                      icon={<FaGraduationCap />}
                      title="Academic"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <InputField
                        label="Qualification"
                        name="qualification"
                        onChange={handleChange}
                        value={values.qualification}
                      />
                      <InputField
                        label="Institute"
                        name="institute"
                        onChange={handleChange}
                        value={values.institute}
                      />
                      <InputField
                        label="City"
                        name="city"
                        onChange={handleChange}
                        value={values.city}
                      />
                    </div>
                    <InputField
                      label="Residential Address"
                      name="address"
                      onChange={handleChange}
                      value={values.address}
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-red-600 hover:bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex justify-center items-center gap-3 disabled:bg-slate-400 uppercase tracking-widest"
                    >
                      {loading ? (
                        <FaCircleNotch className="animate-spin" />
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* --- Success Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-lg shadow-green-200">
              <FaCheckCircle />
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tighter italic">
              Application Sent!
            </h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6 border-b pb-4">
              Admission Batch-01
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 mb-6">
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                Registration ID
              </p>
              <h3 className="text-2xl font-black text-red-600 font-mono">
                {modalData?.studentId}
              </h3>
            </div>

            <p className="text-slate-600 mb-8 text-sm font-medium">
              Dear{" "}
              <span className="text-slate-900 font-bold">
                {modalData?.fullName}
              </span>
              , your application is now under review. Please keep your ID safe
              for status tracking.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/status"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-black py-4 rounded-xl shadow-lg uppercase tracking-widest text-[11px] hover:scale-105 transition-transform"
              >
                <FaIdCard /> Check Admission Status
              </Link>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-red-600 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Helper Components
function SectionHeading({ icon, title }) {
  return (
    <div className="flex items-center gap-2 text-red-600 border-b border-slate-100 pb-2 mb-4">
      <span className="text-xs">{icon}</span>
      <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-900">
        {title}
      </h3>
    </div>
  );
}

function InputField({ label, name, type = "text", error, touched, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        {...props}
        className={`p-3 bg-slate-50 border rounded-xl outline-none text-sm font-bold ${
          touched && error
            ? "border-red-500"
            : "border-slate-200 focus:border-red-600"
        }`}
      />
      {touched && error && (
        <p className="text-[8px] text-red-600 font-bold uppercase mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  values,
  handleChange,
  touched,
  errors,
}) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <select
        name={name}
        value={values[name]}
        onChange={handleChange}
        className={`p-3 bg-slate-50 border rounded-xl outline-none text-sm font-bold ${
          touched[name] && errors[name]
            ? "border-red-500"
            : "border-slate-200 focus:border-red-600"
        }`}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
