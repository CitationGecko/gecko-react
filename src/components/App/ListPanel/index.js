import React, { useContext } from 'react';
import SeedList from 'components/App/ListPanel/SeedList';
import RecommendedList from 'components/App/ListPanel/RecommendedList';
import { UI } from 'state/ui';

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
