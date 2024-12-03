import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    categoryName: "",
    amount: "",
    description: "",
    file: null,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, categoryName, amount, description, file } = formData;
    if (!file) {
      setMessage("File is required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("First_name", firstName);
    formDataToSend.append("Last_name", lastName);
    formDataToSend.append("Email", email);
    formDataToSend.append("Category_name", categoryName);
    formDataToSend.append("Amount", amount);
    formDataToSend.append("Description", description);
    formDataToSend.append("file", file);

    try {
      const response = await axios.post(
        "https://expensemanagementccb8.azurewebsites.net/api/addexpense?code=2mDTVUZ0dzvAaY7iasJXLLThKFiN4Ma02m_L6lODOSjdAzFuxz8qJA==",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/");
      },1000);

    } catch (error) {
      setMessage("Error: " + error.response?.data?.error || "Unknown error");
    }
  };
  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="categoryName" placeholder="Category Name" onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="file" name="file" onChange={handleFileChange} required />
        <button type="submit">Add Expense</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleBackHome}>Back to Home</button>
    </div>
  );
};

export default AddExpense;
