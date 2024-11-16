import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [selectedColor, setSelectedColor] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://etkin-kinik-web.vercel.app/api/products');
            const data = await response.json();
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleColorChange = (id, color) => {
        setSelectedColor(prev => ({ ...prev, [id]: color }));
    };

    return (
        <div className="App">
            <h1>Product List</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.name} className="product-card">
                        <img
                            src={product.images[selectedColor[product.name] || 0]}
                            alt={product.name}
                            className="product-image"
                        />
                        <h2>{product.name}</h2>
                        <p>${product.price} USD</p>
                        <p>{product.popularity} / 5</p>
                        <div className="color-picker">
                            {['Yellow', 'White', 'Rose'].map((color, index) => (
                                <button
                                    key={index}
                                    style={{ backgroundColor: product.colorOptions[index] }}
                                    onClick={() => handleColorChange(product.name, index)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
