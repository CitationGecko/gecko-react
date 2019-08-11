import React, { useContext } from 'react';
import styles from './styles.module.css';
import SideBarButton from 'core/components/SideBarButton';
import settingsIcon from 'core/icons/settings-icon.png';
import recommendedIcon from 'core/icons/recommended-icon.png';
import seedIcon from 'core/icons/seed-icon.png';
import { UI } from 'core/state/ui';

const SeedsButton = () => {
  const { listView, setListView } = useContext(UI);
  const active = listView === 'Seeds';
  return (
    <SideBarButton
      active={active}
      img={seedIcon}
      onClick={() => setListView(active ? null : 'Seeds')}
    />
  );
};
const RecommendedButton = () => {
  const { listView, setListView } = useContext(UI);
  const active = listView === 'Recommended';
  return (
    <SideBarButton
      active={active}
      img={recommendedIcon}
      onClick={() => setListView(active ? null : 'Recommended')}
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
