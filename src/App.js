import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import AddExpense from "./components/AddExpense";
import UpdateExpense from "./components/UpdateExpense";
import ViewExpense from "./components/ViewExpense";
import DeleteExpense from "./components/DeleteExpense";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/update-expense" element={<UpdateExpense />} />
        <Route path="/view-expense" element={<ViewExpense />} />
        <Route path="/delete-expense" element={<DeleteExpense />} />
      </Routes>
    </Router>
  );
}

export default App;
