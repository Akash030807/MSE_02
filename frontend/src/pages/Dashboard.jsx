import { useEffect, useState } from "react";
import API from "../services/api";

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
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <button className="btn btn-danger mb-3"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}>
        Logout
      </button>

      <form onSubmit={addItem}>
        <input className="form-control my-2" placeholder="Item Name"
          onChange={e => setForm({...form, itemName: e.target.value})}/>
        <input className="form-control my-2" placeholder="Description"
          onChange={e => setForm({...form, description: e.target.value})}/>
        <button className="btn btn-primary">Add Item</button>
      </form>

      <hr />

      {items.map(item => (
        <div key={item._id} className="card p-3 my-2">
          <h5>{item.itemName}</h5>
          <p>{item.description}</p>
          <button className="btn btn-danger"
            onClick={() => deleteItem(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}