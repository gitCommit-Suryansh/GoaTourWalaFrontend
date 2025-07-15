import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import SubcategoryPage from './components/SubcategoryPage'
import ExistingSubcategories from './components/ExistingSubcategories';
import ExploreCategory from './components/ExploreCategory';
import SeePayments from './components/SeePayments';
import CreatePackage from './components/CreatePackage'

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
        <Route path='/CreatePackage' element={<CreatePackage/>}/>
        <Route path='/seePayments' element={<SeePayments/>}/>
        <Route path="/editSubcategories" element={<ExistingSubcategories/>}/>

        <Route path="/:categorySlug/:subSlug" element={<SubcategoryPage />} />
        <Route path='/explore/:slug' element={<ExploreCategory/>}/>
      </Routes>
    </Router>
  );
}

export default App;
