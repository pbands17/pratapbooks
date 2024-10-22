import React, { useState, useEffect } from 'react';
import { Notice, Product } from '../types';

// This is not secure and should be replaced with proper authentication in a real application
const ADMIN_PASSWORD = '09876123';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'notices' | 'products'>('notices');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [newNotice, setNewNotice] = useState<Omit<Notice, 'id'>>({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    image: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    fetchNotices();
    fetchProducts();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/.netlify/functions/api/notices');
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/.netlify/functions/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/.netlify/functions/api/notices', {
        method: 'POST',
        body: JSON.stringify(newNotice),
      });
      if (response.ok) {
        fetchNotices();
        setNewNotice({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
      }
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/.netlify/functions/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts();
        setNewProduct({ name: '', price: 0, image: '', description: '', category: '' });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // ... rest of the component remains the same
};

export default Admin;