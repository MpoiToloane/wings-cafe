import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js'; 
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import './Dashboard.css'; 

// Registering necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const snapshot = await getDocs(collection(db, 'products'));
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                setProducts(data);
                setError(null);
            } catch (error) {
                setError('Error fetching products: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const chartData = {
        labels: products.map(product => product.name),
        datasets: [
            {
                label: 'Quantity',
                data: products.map(product => product.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                type: 'bar',
            },
            {
                label: 'Price',
                data: products.map(product => product.price),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                fill: false,
                type: 'line',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true, 
        maintainAspectRatio: false 
    };

    return (
        <section className="dashboard">
            <div className="stockOverview">
                {isLoading ? (
                    <div className="loading">Loading products...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : products.length > 0 ? (
                    <div className="canvas-container">
                        <Bar data={chartData} options={options} />
                    </div>
                ) : (
                    <div className="no-products">No products available</div>
                )}
            </div>
        </section>
    );
}

export default Dashboard;