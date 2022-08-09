import Button from '@mui/material/Button';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const Hello = () => {
  return <Button variant="contained">Hello World</Button>;
};

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </MemoryRouter>
  );
}
