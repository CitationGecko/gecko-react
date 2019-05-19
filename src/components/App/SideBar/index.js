import React, { useContext } from 'react';
import styles from './styles.module.css';
import SideBarButton from 'components/Generic/SideBarButton';
import settingsIcon from './settings-icon.png';
import recommendedIcon from './recommended-icon.png';
import seedIcon from './seed-icon.png';
import { UI } from 'state/ui';

const SeedsButton = () => {
  const { listView, switchToList } = useContext(UI);
  return (
    <SideBarButton
      active={listView === 'Seeds'}
      img={seedIcon}
      onClick={() => switchToList('Seeds')}
    />
  );
};
const RecommendedButton = () => {
  const { listView, switchToList } = useContext(UI);
  return (
    <SideBarButton
      active={listView === 'Recommended'}
      img={recommendedIcon}
      onClick={() => switchToList('Recommended')}
    />
  );
};

const SettingsButton = () => {
  return <SideBarButton img={settingsIcon} />;
};

const SideBar = () => {
  return (
    <div className={styles['side-bar']}>
      <SeedsButton />
      <RecommendedButton />
      <SettingsButton />
    </div>
  );
};

export default SideBar;
