import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [currentColor, setCurrentColor] = useState({}); // Tracks selected color for each product

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://etkin-kinik-web.vercel.app/api/products");
            const data = await response.json();
            setProducts(data);

            // Initialize the color state with "yellow" as the default for all products
            const initialColors = {};
            data.forEach((product) => {
                initialColors[product.name] = "yellow";
            });
            setCurrentColor(initialColors);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleColorChange = (productName, color) => {
        setCurrentColor((prev) => ({ ...prev, [productName]: color }));
    };

    // Carousel logic
    const [startIndex, setStartIndex] = useState(0);
    const visibleProducts = 4;

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

    const handleDotClick = (index) => {
        setStartIndex(index * visibleProducts);
    };

    const totalPages = Math.ceil(products.length / visibleProducts);

    return (
        <div className="product-list">
            <h1 className="title">Product List</h1>
            <div className="carousel">
                {/* Left Arrow */}
                <button className="arrow left" onClick={handlePrev} disabled={startIndex === 0}>
                    &lt;
                </button>
                <div className="product-cards">
                    {products.slice(startIndex, startIndex + visibleProducts).map((product) => (
                        <div key={product.name} className="product-card">
                            <img
                                src={product.images[currentColor[product.name]]}
                                alt={product.name}
                                className="product-image"
                            />
                            <h2 className="product-title">{product.name}</h2>
                            <p className="product-price">${((product.popularityScore + 1) * product.weight).toFixed(2)} USD</p>

                            <div className="color-picker">
                                {["yellow", "rose", "white"].map((color, index) => (
                                    <button
                                        key={index}
                                        style={{
                                            backgroundColor:
                                                color === "yellow"
                                                    ? "#E6CA97"
                                                    : color === "rose"
                                                    ? "#E1A4A9"
                                                    : "#D9D9D9",
                                        }}
                                        className={`color-circle ${currentColor[product.name] === color ? "active" : ""}`}
                                        onClick={() => handleColorChange(product.name, color)}
                                    />
                                ))}
                            </div>
                            <p className="color-name">
                                {currentColor[product.name] === "yellow"
                                    ? "Yellow Gold"
                                    : currentColor[product.name] === "rose"
                                    ? "Rose Gold"
                                    : "White Gold"}
                            </p>

                            <div className="rating">
                                {"★".repeat(Math.floor(product.popularityScore / 20)) +
                                    "☆".repeat(5 - Math.floor(product.popularityScore / 20))}
                                <span className="rating-text"> {(product.popularityScore / 20).toFixed(1)}/5</span>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Right Arrow */}
                <button
                    className="arrow right"
                    onClick={handleNext}
                    disabled={startIndex + visibleProducts >= products.length}
                >
                    &gt;
                </button>
            </div>
            <div className="dots">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${startIndex / visibleProducts === index ? "active" : ""}`}
                        onClick={() => handleDotClick(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default App;
