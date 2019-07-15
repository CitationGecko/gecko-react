import React, { useContext } from 'react';
import styles from './styles.module.css';
import SideBarButton from 'core/ui/components/SideBarButton';
import settingsIcon from 'core/icons/settings-icon.png';
import recommendedIcon from 'core/icons/recommended-icon.png';
import seedIcon from 'core/icons/seed-icon.png';
import { UI } from 'core/state/ui';

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
    </div>
  );
};

export default SideBar;
