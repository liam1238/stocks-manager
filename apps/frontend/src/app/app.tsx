import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { PortfolioPage } from '../pages/PortfolioPage';
import { StockDetailPage } from '../pages/StockDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/stocks/:symbol" element={<StockDetailPage />} />
        {/* 404 fallback route */}
        <Route
          path="*"
          element={<div style={{ padding: 24 }}>404 - Not Found</div>}
        />
      </Routes>
    </Router>
  );
};

export default App;
