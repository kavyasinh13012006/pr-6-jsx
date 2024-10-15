import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  const [allrecod, setallRecod] = useState(JSON.parse(localStorage.getItem('react-js')) || []);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editid, setedEtid] = useState(null);

  const fileHandling = (e) => {
    e.preventDefault();
    if (editid === null) {
      let obj = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        phone: phone,
      };
      const updeta = [...allrecod, obj];
      setallRecod(updeta);
      localStorage.setItem('react-js', JSON.stringify(updeta));
    } else {
      let upRcode = allrecod.map((val) => {
        if (val.id == editid) {
          return { ...val, name, phone };
        }
        return val;
      });
      setallRecod(upRcode);
      localStorage.setItem('react-js', JSON.stringify(upRcode));
      setedEtid(null);
    }
    setName('');
    setPhone('');
  };

  const deletData = (id) => {
    let delet = allrecod.filter((val) => val.id !== id);
    setallRecod(delet);
    localStorage.setItem('react-js', JSON.stringify(delet));
  };

  const upData = (id) => {
    allrecod.find((val) => {
      if (val.id == id) {
        setName(val.name);
        setPhone(val.phone);
        setedEtid(id);
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">
            {editid == null ? 'Add New Record' : 'Update Record'}
          </h3>
          <form onSubmit={fileHandling}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Enter name" 
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input 
                onChange={(e) => setPhone(e.target.value)} 
                value={phone} 
                type="text" 
                className="form-control" 
                id="phone" 
                placeholder="Enter phone number" 
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {editid == null ? 'Submit' : 'Update'}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center">Records List</h3>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allrecod.length > 0 ? (
              allrecod.map(val => (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.phone}</td>
                  <td>
                    <button 
                      className="btn btn-danger btn-sm me-2" 
                      onClick={() => deletData(val.id)}
                    >
                      Delete
                    </button>
                    <button 
                      className="btn btn-warning btn-sm" 
                      onClick={() => upData(val.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
