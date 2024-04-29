import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  useEffect(() => {}, []);

  return <Outlet />;
}

export default App;
