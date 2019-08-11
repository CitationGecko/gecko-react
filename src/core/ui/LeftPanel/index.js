import React, { useContext } from 'react';
import SeedList from './SeedList';
import RecommendedList from './RecommendedList';
import { UI } from 'core/state/ui';

const LeftPanel = () => {
  const { listView } = useContext(UI);

  switch (listView) {
    case 'Seeds':
      return <SeedList />;
    case 'Recommended':
      return <RecommendedList />;
    default:
      return null;
  }
};

export default LeftPanel;
