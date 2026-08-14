import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl, codespaceName } from './components/apiClient';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="border-bottom bg-light">
        <nav className="navbar navbar-expand-lg container py-3">
          <span className="navbar-brand fw-semibold">OctoFit Tracker</span>
          <ul className="navbar-nav d-flex flex-row gap-2 flex-wrap">
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/activities">
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/workouts">
                Workouts
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="container pt-3 pb-1">
          <div className="alert alert-secondary mb-0 small" role="status">
            API base: <strong>{apiBaseUrl}</strong>
            {!codespaceName && (
              <span className="ms-2 text-warning-emphasis">
                VITE_CODESPACE_NAME is not set, using localhost fallback.
              </span>
            )}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
