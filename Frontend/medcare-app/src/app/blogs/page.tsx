
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

// Define types for blog data
interface Blog {
  title: string;
  description: string;
  url: string;
}
const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
  // Fetch blogs from NewsAPI
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const API_URL = `https://newsapi.org/v2/everything?q=health&apiKey=${API_KEY}`; // Replace YOUR_API_KEY
        const response = await axios.get(API_URL);
        setBlogs(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div 
    style={{ display: 'flex', flexDirection: 'column' 
    , margin:'20px auto',
    justifyContent: 'center',
    alignItems:'center',}}>
      <h1 style={{textAlign:'center',color:'white'}}>🩺 Health Blogs</h1>
      {loading && <p>Loading blogs...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          {blogs.map((blog, index) => (
            <div key={index}
             style={{width:'90%',
             backgroundColor:'white',
             borderRadius:'10px', 
             border:'none',
              margin:'10px auto'
              ,padding:'10px', lineHeight:'2'}}>
              <h3>{blog.title}</h3>
              <p>{blog.description || 'No description available.'}</p>
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
