import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/common.css";

const AddSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    // Handle form submission logic, including image upload and database insertion
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("image", image);

    try {
      const response = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("School added successfully");
        router.push("/"); // Redirect to home page or any other page after successful submission
      } else {
        console.error("Failed to add school");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <main className="main">
      <div className="title">Add School Form</div>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-content">
          {/* School Name */}
          <label className="form-label">School Name:</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="form-input"
          />
          {errors.name && (
            <p className="form-input-error">{errors.name.message}</p>
          )}

          {/* Email */}
          <label className="form-label">Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
            className="form-input"
          />
          {errors.email && (
            <p className="form-input-error">{errors.email.message}</p>
          )}

          {/* City */}
          <label className="form-label">City:</label>
          <input
            {...register("city", { required: "City is required" })}
            className="form-input"
          />
          {errors.city && (
            <p className="form-input-error">{errors.city.message}</p>
          )}

          {/* State */}
          <label className="form-label">State:</label>
          <input
            {...register("state", { required: "State is required" })}
            className="form-input"
          />
          {errors.state && (
            <p className="form-input-error">{errors.state.message}</p>
          )}

          {/* Contact */}
          <label className="form-label">Contact:</label>
          <input
            {...register("contact", { required: "Contact is required" })}
            className="form-input"
          />
          {errors.contact && (
            <p className="form-input-error">{errors.contact.message}</p>
          )}

          {/* Image Upload */}
          <label className="form-label">Upload School Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-input"
          />
          {errors.schoolImage && (
            <p className="form-input-error">{errors.schoolImage.message}</p>
          )}

          <button className="form-submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
      <Link className="link" href="/">
        Go Back
      </Link>
    </main>
  );
};

export default AddSchool;
