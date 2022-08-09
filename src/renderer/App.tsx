import Button from '@mui/material/Button';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

const Hello = () => {
  return <Button variant="contained">Hello World</Button>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
