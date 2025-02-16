import { useFormik } from "formik";
import { basicSchema } from "./schemas/index";
import classNames from "classnames";
import { useState } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import Swal from "sweetalert2";

const AtendeeDetails = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [pickedTicket, setPickedTicket] = useState(null);
  const [numTickets, setNumTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const initialState = {
    name: "",
    email: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData")) || null;
    if (savedData) {
      setFormValues({
        name: savedData.name || "",
        email: savedData.email || "",
        message: savedData.message || "",
      });
      setImageUrl("");
    }
  }, []);

  // storage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formEntries"));
    if (savedData && savedData.length > 0) {
      setFormValues({
        name: "",
        email: "",
        message: "",
      });
      setImageUrl("");
    }
  }, []);

  // Handle File Upload (Cloudinary)
  const handleFileUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first-time-using-cloudinary");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dh341yerj/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadedImage = await response.json();
      setImageUrl(uploadedImage.secure_url);
      console.log("Uploaded Image URL:", uploadedImage.secure_url);
    } catch (error) {
      console.error("Upload failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const removeImage = () => {
    setImageUrl("");
  };

  // FORM
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: basicSchema,

    onSubmit: (values, { resetForm }) => {
      if (!imageUrl) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Submission",
          text: "Please upload an image before submitting.",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      // Fetch existing ticket details from localStorage
      const storedTicketData =
        JSON.parse(localStorage.getItem("ticketData")) || [];

      const lastTicket =
        storedTicketData.length > 0
          ? storedTicketData[storedTicketData.length - 1]
          : null;

      const finalPickedTicket = lastTicket?.pickedTicket || pickedTicket;
      const finalNumTickets = lastTicket?.numTickets || numTickets;
      const finalTotalPrice = lastTicket?.totalPrice || totalPrice;

      if (!finalPickedTicket || finalNumTickets <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Selection",
          text: "Please select a valid ticket before submitting.",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      // Merge ticket data and form data
      const newTicket = {
        name: values.name,
        email: values.email,
        message: values.message,
        imageUrl: imageUrl,
        pickedTicket: finalPickedTicket,
        numTickets: finalNumTickets,
        totalPrice: finalTotalPrice,
      };

      storedTicketData.push(newTicket);
      localStorage.setItem("ticketData", JSON.stringify(storedTicketData));

      console.log("Updated ticket data:", storedTicketData);

      // Success Alert and Redirect
      Swal.fire({
        icon: "success",
        title: "Ticket Added",
        text: "Your ticket has been successfully saved!",
        confirmButtonColor: "#23a0b5",
      }).then(() => {
        resetForm();
        setImageUrl("");
        setPickedTicket(null);
        setNumTickets(0);
        setTotalPrice(0);
        navigate("/downloadticket");
      });
    },
  });

  return (
    <div>
      <main
        className="pt-[76px] mt-8 flex flex-col justify-center items-center"
        style={{
          background:
            "radial-gradient(52.52% 32.71% at 50% 97.66%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), #02191D",
        }}
      >
        <div className="lg:h-[1083px h-fit  lg:p-12 p-6 bg-MainBackgroundColor2 rounded-[24px] border border-MainBackgroundColorBorder flex-col justify-center items-center gap-8 flex lg:w-[700px] mx-auto w-[90%]">
          {/* attendeee */}
          <div className="self-stretch justify-start items-center gap-3 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-4 inline-flex h-[32]">
              <div className="self-stretch text-white lg:text-[2rem] text-2xl  font-normal font-jeju">
                Attendee Details
              </div>
            </div>
            <div className="text-neutral-50 text-[1rem] font-normal font-roboto leading-normal">
              Step 2/3
            </div>
          </div>
          <div data-svg-wrapper>
            <svg
              width="100%"
              height="4"
              viewBox="0 0 604 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_5_2229)">
                <path
                  d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H602C603.105 0.00012207 604 0.895553 604 2.00012C604 3.10469 603.105 4.00012 602 4.00012H2.00001C0.895441 4.00012 0 3.10469 0 2.00012Z"
                  fill="#0E464F"
                />
                <path
                  d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H324C325.105 0.00012207 326 0.895553 326 2.00012C326 3.10469 325.105 4.00012 324 4.00012H2.00001C0.895436 4.00012 0 3.10469 0 2.00012Z"
                  fill="#24A0B5"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_2229">
                  <path
                    d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H602C603.105 0.00012207 604 0.895553 604 2.00012C604 3.10469 603.105 4.00012 602 4.00012H2.00001C0.895441 4.00012 0 3.10469 0 2.00012Z"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          {/*  */}
          <div className="self-stretch lg:h-[907px] h-fit p-6 bg-[#08252b] rounded-[32px] border border-[#0e464e] flex-col justify-center items-start gap-8 flex lg:w-[604px] w-full mx-auto">
            {/*  */}
            <div className="lg:h-[328px] h-fit px-6 pt-6 pb-12 bg-[#042127] rounded-3xl border border-[#07363e] flex-col justify-start items-start gap-8 flex w-full">
              <div className="text-center text-neutral-50 text-[1rem] font-normal font-roboto leading-normal">
                Upload Profile Photo
              </div>
              <div className="h-[200px] self-stretch bg-black/20 justify-center items-center gap-2.5 inline-flex">
                <div
                  className="w-60 h-60 p-6 bg-[#0E464F] rounded-[32px] flex flex-col justify-center items-center gap-4 border-4 border-customBorder mx-auto relative"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {!imageUrl && (
                    <div className="flex flex-col justify-center items-center">
                      <div className="text-white text-sm">
                        {loading ? (
                          "Uploading..."
                        ) : (
                          <BiSolidCloudUpload size={50} />
                        )}
                      </div>

                      <input
                        type="file"
                        id="fileInput"
                        name="file"
                        aria-invalid="true"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="fileInput"
                        className="text-center text-neutral-50 text-[1rem] font-normal cursor-pointer font-roboto"
                      >
                        Drag & drop or click to upload
                      </label>
                    </div>
                  )}

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-full h-full object-cover absolute top-0 left-0 rounded-[32px]"
                    />
                  )}
                </div>
                {/* </div> */}

                {/*  */}
              </div>
            </div>

            <div className="w-full bg-MainBackgroundColorBorder h-[3px]">
              <div className="h-[3px]"></div>
            </div>

            {/* form */}
            <div className="lg:w-[556px] w-full mx-auto ">
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="flex flex-col gap-8 justify-center items-center"
              >
                <div className="lg:w-[556px] w-full mx-auto lg:h-[80px] h-full">
                  <label
                    htmlFor="text"
                    className="self-stretch text-neutral-50 text-[1rem]  font-normal font-roboto leading-normal h-6"
                  >
                    Enter Your Name
                  </label>
                  <input
                    id="name"
                    type="name"
                    name="name"
                    aria-invalid="true"
                    aria-describedby="nameError"
                    placeholder="Enter your Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document.getElementById("email").focus();
                      }
                    }}
                    className={classNames(
                      "w-full  p-3 border rounded-xl  bg-transparent  shadow-sm focus:outline-none focus:ring-2 text-white mb-0 flex gap-2 self-stretch h-[48px]",
                      {
                        "border-[#07373F] focus:ring-[#23a0b5]":
                          !errors.name || !touched.name,
                        "border-red-500 focus:ring-red-500":
                          errors.name && touched.name,
                      }
                    )}
                  />
                  {errors.name && touched.name && (
                    <p
                      id="emailError"
                      role="alert"
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="lg:w-[556px] w-full mx-auto lg:h-[80px] h-full">
                  <label
                    htmlFor="email"
                    className="self-stretch text-neutral-50 text-[1rem]  font-normal font-roboto leading-normal"
                  >
                    Enter your email *
                  </label>
                  <div className="relative w-full">
                    <input
                      value={values.email}
                      onChange={handleChange}
                      id="email"
                      type="email"
                      name="email"
                      aria-invalid="true"
                      aria-describedby="emailError"
                      placeholder="hello@avioflagos.io"
                      onBlur={handleBlur}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("message").focus();
                        }
                      }}
                      className={classNames(
                        "w-full  p-3 pl-10 border rounded-xl border-[#07373F] bg-transparent shadow-sm focus:outline-none focus:ring-2 text-white mb-0 flex gap-2 self-stretch h-[48px]",
                        {
                          "border-[#07373F] focus:ring-[#23a0b5]":
                            !errors.email || !touched.email,
                          "border-red-500 focus:ring-red-500":
                            errors.email && touched.email,
                        }
                      )}
                    />
                    <CiMail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                 text-gray-400"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p
                      id="emailError"
                      role="alert"
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* </div> */}
                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="self-stretch text-neutral-50 text-[1rem]  font-normal font-roboto leading-normal"
                  >
                    Message
                  </label>
                  <textarea
                    value={values.message}
                    onChange={handleChange}
                    id="message"
                    name="message"
                    aria-describedby="messageError"
                    placeholder="Enter your message"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document.getElementById("submitBtn").focus();
                      }
                    }}
                    onBlur={handleBlur}
                    className={classNames(
                      "w-full p-3 border rounded-xl border-[#07373F] bg-transparent shadow-sm focus:outline-none focus:ring-2 text-white mb-0 flex gap-2 self-stretch  mx-auto lg:h-[127px]",
                      {
                        "border-[#07373F] focus:ring-[#23a0b5]":
                          !errors.message || !touched.message,
                        "border-red-500 focus:ring-red-500":
                          errors.message && touched.message,
                      }
                    )}
                  ></textarea>
                  {errors.message && touched.message && (
                    <p
                      id="messageError"
                      role="alert"
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className="self-stretch justify-center items-center lg:gap-8 gap-4 inline-flex flex-col lg:flex-row-reverse lg:w-[556px] w-full mx-auto lg:h-[48px] h-full">
                  <button
                    to="/downloadticket"
                    type="submit"
                    id="submitBtn"
                    disabled={isSubmitting}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.currentTarget.click();
                      }
                    }}
                    className="self-stretch grow shrink basis-0 lg:h-12 h-fit px-6 py-3 bg-[#23a0b5] rounded-lg justify-center items-center gap-2 flex text-white text-[1rem] font-jeju "
                  >
                    Get My Ticket
                  </button>

                  <Link
                    to="/"
                    type="submit"
                    className="self-stretch grow shrink basis-0 lg:h-12 h-fit px-6 py-3 rounded-lg border border-[#23a0b5] justify-center items-center gap-2 flex text-[#23a0b5] text-[1rem]  font-normal font-jeju leading-normal"
                  >
                    Back
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/*  */}
        </div>
      </main>
    </div>
  );
};

export default AtendeeDetails;
