import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

const Hello = () => {
  return <div>Hello World</div>;
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
