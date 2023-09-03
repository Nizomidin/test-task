import React, { useState } from "react";

function Products() {
    async function RefreshToken() {
        let token_refresh = localStorage.getItem('token_refresh');
        const url = `http://31.129.97.20/api/v1/account/token/refresh/`;
        let body = {
          refresh: token_refresh
        };
      
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          });
      
          if (response.ok) {
            const data = await response.json(); 
            localStorage.setItem('token_access', data.access);
          } else {
            console.error("Error:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(100); 
    const [offset, setOffset] = useState(0); 
    const [search, setSearch] = useState("");
    async function Request()
    {
        RefreshToken();
        const apiUrl = `http://31.129.97.20/api/v1/handbook/products/?limit=${limit}&offset=${offset}&search=${search}`;
        let accessToken = localStorage.getItem('token_access');
        let headers = {
            Authorization: `Bearer ${accessToken}`
        }
    // Fetch data from the API
        fetch(apiUrl, {
            headers: headers
        })
    .then((response) => response.json())
      .then(async (data) => {
        // Update the state with the retrieved products
        setProducts(await data.results);
        console.log(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    return (
        <div>
        <h1>Product List</h1>
        <div>
            <label>Limit:</label>
            <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            />
        </div>
        <div>
            <label>Offset:</label>
            <input
            type="number"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
            />
        </div>
        <div>
            <label>Search:</label>
            <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <div>
            <button onClick={Request}>Request</button>
        </div>
            {products.map((product) => (
             <div className="product-card">
            <img src={product.images[0].thumbnail_url} alt={product.name} />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-details">
                <p className="product-price">Price: ${product.price}</p>
            </div>
            </div>
            ))}
        </div>
      );
}

export default Products;
