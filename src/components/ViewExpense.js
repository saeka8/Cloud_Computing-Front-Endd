import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewExpense = () => {
  const [choice, setChoice] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [expenseId, setExpenseId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChoiceChange = (e) => {
    setChoice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data object based on the choice
    let data = { choice };

    if (choice === "all") {
      data = { ...data, First_name: firstName, Last_name: lastName, Email: email };
    } else if (choice === "category") {
      data = { ...data, First_name: firstName, Last_name: lastName, Email: email, Category_name: categoryName };
    } else if (choice === "expense_id") {
      data = { ...data, Expense_ID: expenseId };
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "https://expensemanagementccb8.azurewebsites.net/api/viewexpense?code=2mDTVUZ0dzvAaY7iasJXLLThKFiN4Ma02m_L6lODOSjdAzFuxz8qJA==",
        {
          headers: {
            "Content-Type": "application/json"
          },
          params: data
        }
      );
      console.log(response.data);
      setResult(response.data); // Show the result from the API response
    } catch (error) {
      setResult({ error: "An error occurred while fetching data." });
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = (expense) => {
    navigate("/update-expense",{ state: { expense } });
  };
  const handleBackHome = () => {
    navigate("/");
  };
  const handleDelete = async(expenseId) => {
    try {
      // Send the DELETE request to the server
      setLoading(true);
      const response = await axios.post(
        "https://expensemanagementccb8.azurewebsites.net/api/deleteexpense?code=2mDTVUZ0dzvAaY7iasJXLLThKFiN4Ma02m_L6lODOSjdAzFuxz8qJA==",
        JSON.stringify({ Expense_ID: expenseId }),  // Ensure the payload is in JSON format
        {
          headers: {
            "Content-Type": "application/json",  // Correct header to indicate JSON body
          },
        }
      );
      setResult(response.data.message || "Expense deleted successfully!");  // Show success message
    } catch (error) {
      // Handle error if the API call fails
      setResult("Error: " + (error.response?.data?.error || "Unknown error"));
      console.error("Delete request failed:", error); // Log error for debugging
    } finally {
      setLoading(false);  // Stop loading state after the request
    }
  };

  const renderTable = (data) => {
    if (!data || data.error) {
      return <p>{data ? data.error : "No data available"}</p>;
    }
  
    // Handle "expense_id" case (single record instead of an array)
    if (choice === "expense_id" && !Array.isArray(data)) {
      // For expense_id, just render a single expense entry
      return (
        <table>
          <thead>
            <tr>
              <th>Expense ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
              <th>Receipt Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.Expense_ID}</td>
              <td>{data.Amount}</td>
              <td>{data.Date}</td>
              <td>{data.Description}</td>
              <td><a href={data.Receipt_URL} target="_blank" rel="noopener noreferrer">View Receipt</a></td> {/* Display Receipt URL */}
              <td>
                <button onClick={() => handleUpdate(data)}>Update</button>
                <button onClick={() => handleDelete(data.Expense_ID)}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  
    // Handle other cases (all and category) where data is an array
    if (Array.isArray(data)) {
      return (
        <table>
          <thead>
            <tr>
              <th>Expense ID</th>
              <th>User First Name</th>
              <th>User Last Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
              <th>Receipt Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((expense, index) => (
              <tr key={index}>
                <td>{expense.Expense_ID}</td>
                <td>{firstName}</td> {/* Use the name entered by the user */}
                <td>{lastName}</td>  {/* Use the last name entered by the user */}
                <td>{expense.Amount}</td>
                <td>{expense.Date}</td>
                <td>{expense.Description}</td>
                <td><a href={expense.Receipt_URL} target="_blank" rel="noopener noreferrer">View Receipt</a></td> {/* Display Receipt URL */}
                <td>
                  <button onClick={() => handleUpdate(expense)}>Update</button>
                  <button onClick={() => handleDelete(expense.Expense_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  
    return null;
  };
  

  return (
    <div>
      <h2>View Expense</h2>

      <form onSubmit={handleSubmit}>
        {/* Choice selection */}
        <div>
          <label>Choose the option:</label>
          <select value={choice} onChange={handleChoiceChange} required>
            <option value="">Select</option>
            <option value="all">All Expenses</option>
            <option value="category">Category Expenses</option>
            <option value="expense_id">Expense by ID</option>
          </select>
        </div>

        {/* Input fields for 'all' choice */}
        {choice === "all" && (
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        {/* Input fields for 'category' choice */}
        {choice === "category" && (
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Input fields for 'expense_id' choice */}
        {choice === "expense_id" && (
          <div>
            <input
              type="number"
              placeholder="Expense ID"
              value={expenseId}
              onChange={(e) => setExpenseId(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {/* Display results in table format */}
      <div>{renderTable(result)}</div>
      <button onClick={handleBackHome}>Back to Home</button>
    </div>
  );
};

export default ViewExpense;

