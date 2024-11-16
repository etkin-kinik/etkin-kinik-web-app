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

    const [currentColor, setCurrentColor] = useState({}); // Tracks selected color for each product

    // Handle color change
    const handleColorChange = (id, index) => {
        setCurrentColor((prev) => ({ ...prev, [id]: index }));
    };

    // Carousel logic
    const [startIndex, setStartIndex] = useState(0);
    const visibleProducts = 4; // Number of visible products in the carousel

    const handleNext = () => {
        if (startIndex + visibleProducts < products.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };


    return (
        <div className="product-list">
        <h1>Product List</h1>
            <div className="carousel">
                <button className="arrow left" onClick={handlePrev}>
                    &lt;
                </button>
                <div className="product-cards">
                    {products.slice(startIndex, startIndex + visibleProducts).map((product) => (
                        <div key={product.name} className="product-card">
                            <img
                                src={product.images[currentColor[product.name] || 0]}
                                alt={product.title}
                                className="product-image"
                            />
                            <h2>{product.title}</h2>
                            <p>${product.price.toFixed(2)} USD</p>
                            <div className="color-picker">
                                {product.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorChange(product.name, index)}
                                    />
                                ))}
                            </div>
                            <p>{product.colorNames[currentColor[product.name] || 0]}</p>
                            <div className="rating">
                                {"★".repeat(Math.floor(product.rating)) +
                                    "☆".repeat(5 - Math.floor(product.rating))}
                                <span> {product.rating}/5</span>
                            </div>
                        </div>
                    ))}
                </div>
            <button className="arrow right" onClick={handleNext}>
                &gt;
            </button>
        </div>
    </div>
    );
};

export default App;
