import React, { useState ,useEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom"
import axios from "axios";

const UpdateExpense = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (location.state && location.state.expense) {
      const { Expense_ID, First_name,Last_name,Email,Category_name, Amount, Description} = location.state.expense;
      setFormData({
        expenseId: Expense_ID,
        firstName: First_name,
        lastName: Last_name,
        email: Email,
        categoryName: Category_name,
        amount: Amount,
        description: Description,
        file: null,
      });
    }
  }, [location.state]);

  const handleBackHome = () => {
    navigate("/");
  };

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
      setTimeout(()=>{
        navigate("/");
      },3000);

    } catch (error) {
      setMessage("Error: " + error.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div>
      <h2>Update Expense</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="expenseId" placeholder="Expense ID" value ={formData.expenseId} onChange={handleChange} required/>
        <input type="text" name="firstName" placeholder="First Name" value ={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value ={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value ={formData.email} onChange={handleChange} required />
        <input type="text" name="categoryName" placeholder="Category Name" value ={formData.categoryName}  onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value ={formData.amount} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value ={formData.description} onChange={handleChange} required />
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Update Expense</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleBackHome}>Back to Home</button>
    </div>
  );
};

export default UpdateExpense;
