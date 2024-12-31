import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loading des composants
const Home = React.lazy(() => import('./pages/Home'));
const VideoPlayer = React.lazy(() => import('./pages/VideoPlayer'));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main role="main" className="flex-grow pt-16">
          <Suspense fallback={<div>Chargement...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/videos" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
