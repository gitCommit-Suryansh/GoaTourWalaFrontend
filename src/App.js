import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import SubcategoryPage from './components/SubcategoryPage'
import ExistingSubcategories from './components/ExistingSubcategories';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setLoaded(true);

    if (document.readyState === 'complete') {
      // Already loaded
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adminpanel' element={<AdminPanel/>}/>
        <Route path="/:categorySlug/:subSlug" element={<SubcategoryPage />} />
        <Route path="/editSubcategories" element={<ExistingSubcategories/>}/>

      </Routes>
    </Router>
  );
}

export default App;
