// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface MemberFormData {
//   name: string;
//   photo_url: string; // Will hold the URL or image file
//   designation: string;
//   category_id: number | null;
// }

// interface Category {
//   id: number;
//   name: string;
// }

// const App: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [formData, setFormData] = useState<MemberFormData>({
//     name: "",
//     photo_url: "",
//     designation: "",
//     category_id: null,
//   });
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [errors, setErrors] = useState<Partial<Record<keyof MemberFormData, string>>>({});

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/categories"); // Replace with your backend endpoint
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "category_id" ? Number(value) : value,
//     }));

//     if (errors[name as keyof MemberFormData]) {
//       setErrors((prev) => ({ ...prev, [name]: undefined }));
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<Record<keyof MemberFormData, string>> = {};
//     if (!formData.name || formData.name.trim().length < 3) {
//       newErrors.name = "Name must be at least 3 characters long.";
//     }
//     if (!formData.designation) {
//       newErrors.designation = "Designation is required.";
//     }
//     if (!formData.category_id) {
//       newErrors.category_id = "Please select a category.";
//     }
//     if (!selectedFile) {
//       newErrors.photo_url = "Please upload an image.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("designation", formData.designation);
//     formDataToSend.append("category_id", String(formData.category_id));
//     if (selectedFile) {
//       formDataToSend.append("photo_url", selectedFile);
//     }

//     try {
//       const response = await axios.post("/api/board-member", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Board member added successfully!");
//       setFormData({ name: "", photo_url: "", designation: "", category_id: null });
//       setSelectedFile(null);
//     } catch (error: any) {
//       console.error("Error adding board member:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Add Board Member</h1>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           {errors.name && <span className="error">{errors.name}</span>}
//         </div>
//         <div>
//           <label>Designation:</label>
//           <input
//             type="text"
//             name="designation"
//             value={formData.designation}
//             onChange={handleInputChange}
//           />
//           {errors.designation && <span className="error">{errors.designation}</span>}
//         </div>
//         <div>
//           <label>Category:</label>
//           <select
//             name="category_id"
//             value={formData.category_id || ""}
//             onChange={handleInputChange}
//           >
//             <option value="" disabled>Select a category</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//           {errors.category_id && <span className="error">{errors.category_id}</span>}
//         </div>
//         <div>
//           <label>Photo:</label>
//           <input type="file" name="photo_url" accept="image/*" onChange={handleFileChange} />
//           {errors.photo_url && <span className="error">{errors.photo_url}</span>}
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default App;
