import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Product } from '../types';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/.netlify/functions/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((p: Product) => p.category))
        );
        setCategories(uniqueCategories as string[]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.category === selectedCategory : true) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ... rest of the component remains the same
};

export default ProductCatalog;