import { useState, useMemo } from 'react';
import tabContext from '../contexts/tabContext';

const tabProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('');

  const props = useMemo(() => ({ selectedTab, setSelectedTab }), [selectedTab, setSelectedTab]);
  return (
    <tabContext.Provider value={props}>
      {children}
    </tabContext.Provider>
  );
};

export default tabProvider;
