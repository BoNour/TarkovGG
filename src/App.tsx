import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import PlayerDetails from './pages/PlayerDetails';
import Players from './pages/Players';
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';
import Matches from './pages/Matches';
import MatchDetails from './pages/MatchDetails';
import Tournaments from './pages/Tournaments';
import TournamentDetails from './pages/TournamentDetails';
import News from './pages/News';
import NotFound from './pages/NotFound';
import { GameDataProvider } from './context/GameDataContext';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GameDataProvider>
        <div className="min-h-screen bg-dark text-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/players" element={<Players />} />
              <Route path="/players/:id" element={<PlayerDetails />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/teams/:id" element={<TeamDetails />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/matches/:id" element={<MatchDetails />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/tournaments/:id" element={<TournamentDetails />} />
              <Route path="/news" element={<News />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GameDataProvider>
    </Router>
  );
}

export default App;