import React, { useContext } from 'react';
import SeedList from 'vis-modules/ListView/SeedList';
import RecommendedList from 'vis-modules/ListView/RecommendedList';
import { UI } from 'core/state/ui';

const ListPanel = () => {
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

export default ListPanel;
