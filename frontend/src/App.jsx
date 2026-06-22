import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProducts = async (nextCursor = null, reset = false) => {
    setLoading(true);

    try{
      let url = "/products?limit=20";

      if (category)
        url += `&category=${category}`;

      if (nextCursor)
        url += `&cursor=${nextCursor}`;

      const res = await api.get(url);

      if (reset)
        setProducts(res.data.products);
      else
        setProducts((prev) => [
          ...prev,
          ...res.data.products,
        ]);

      setCursor(res.data.nextCursor);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(null, true);
  }, [category]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Browser</h1>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">
          All Categories
        </option>

        <option value="Books">
          Books
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Fashion">
          Fashion
        </option>

        <option value="Sports">
          Sports
        </option>

        <option value="Home">
          Home
        </option>
      </select>

      <table
        border="1"
        cellPadding="8"
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {cursor && (
        <button
          style={{
            marginTop: "20px",
          }}
          disabled={loading}
          onClick={() => loadProducts(cursor)}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default App;