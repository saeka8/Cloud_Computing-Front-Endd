import React, { useState } from "react";
import axios from "axios";

const UpdateExpense = () => {
  const [formData, setFormData] = useState({
    expenseId: "",
    firstName: "",
    lastName: "",
    email: "",
    categoryName: "",
    amount: "",
    description: "",
    file: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { expenseId, firstName, lastName, email, categoryName, amount, description, file } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("Expense_ID", expenseId);
    formDataToSend.append("First_name", firstName);
    formDataToSend.append("Last_name", lastName);
    formDataToSend.append("Email", email);
    formDataToSend.append("Category_name", categoryName);
    formDataToSend.append("Amount", amount);
    formDataToSend.append("Description", description);
    if (file) formDataToSend.append("file", file);

    try {
      const response = await axios.post(
        "https://expensemanagementccb8.azurewebsites.net/api/updateexpense?code=2mDTVUZ0dzvAaY7iasJXLLThKFiN4Ma02m_L6lODOSjdAzFuxz8qJA==",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: " + error.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div>
      <h2>Update Expense</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="expenseId" placeholder="Expense ID" onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="categoryName" placeholder="Category Name" onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Update Expense</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateExpense;
