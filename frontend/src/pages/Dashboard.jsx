import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    await API.post("/items", form);
    setForm({});
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Lost & Found Dashboard</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* Add Item Form */}
      <div className="dashboard-card">
        <h4>Add Item</h4>

        <form onSubmit={addItem}>
          <input
            className="form-control my-2"
            placeholder="Item Name"
            value={form.itemName || ""}
            onChange={(e) =>
              setForm({ ...form, itemName: e.target.value })
            }
          />

          <input
            className="form-control my-2"
            placeholder="Description"
            value={form.description || ""}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button className="dashboard-btn">Add Item</button>
        </form>
      </div>

      {/* Items List */}
      <div className="dashboard-card">
        <h4>All Items</h4>

        {items.map((item) => (
          <div key={item._id} className="item-card">
            <h5>{item.itemName}</h5>
            <p>{item.description}</p>

            <button
              className="delete-btn"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}