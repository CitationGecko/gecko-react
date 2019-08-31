import React, { useContext } from 'react';
import SeedList from 'core/ui/LeftPanel/SeedList';
import RecommendedList from 'core/ui/LeftPanel/RecommendedList';
import Settings from 'core/ui/LeftPanel/Settings';
import { UI } from 'core/state/ui';

const LeftPanel = () => {
  const { leftPanel } = useContext(UI);

  switch (leftPanel) {
    case 'Seeds':
      return <SeedList />;
    case 'Recommended':
      return <RecommendedList />;
    case 'Settings':
      return <Settings />;
    default:
      return null;
  }
};

export default LeftPanel;
