import React from 'react';
import ProductList from "./components/ProductList";
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      
      <header style={{ 
  textAlign: 'center', 
  padding: '20px', 
  backgroundColor: '#f0f0f0',
  borderBottom: '1px solid #ddd' 
}}>
  <nav style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '20px', 
    padding: '10px 0' 
  }}>
    <a href="#" style={{ 
      color: '#333', 
      textDecoration: 'none', 
      fontSize: '16px', 
      fontWeight: 'bold' 
    }}>Home</a>
    
    <a href="#" style={{ 
      color: '#333', 
      textDecoration: 'none', 
      fontSize: '16px', 
      fontWeight: 'bold' 
    }}>Products</a>
    
    <a href="#" style={{ 
      color: '#333', 
      textDecoration: 'none', 
      fontSize: '16px', 
      fontWeight: 'bold' 
    }}>About Us</a>
    
    <a href="#" style={{ 
      color: '#333', 
      textDecoration: 'none', 
      fontSize: '16px', 
      fontWeight: 'bold' 
    }}>Contact</a>
  </nav>
</header>

      
      <main>
        <ProductList/>
      </main>
    </div>
  )
}

export default App;
