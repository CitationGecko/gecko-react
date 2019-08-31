import React, { useContext } from 'react';
import styles from './styles.module.css';
import SideBarButton from 'core/components/SideBarButton';
import recommendedIcon from 'core/icons/recommended-icon.png';
import filterIcon from 'core/icons/filter-icon.png';
import seedIcon from 'core/icons/seed-icon.png';
import { UI } from 'core/state/ui';

const TogglePanelButton = ({ panel, img }) => {
  const { leftPanel, setLeftPanel } = useContext(UI);
  const active = leftPanel === panel;
  return (
    <SideBarButton active={active} img={img} onClick={() => setLeftPanel(active ? null : panel)} />
  );
};

const SideBar = () => {
  return (
    <div className={styles['side-bar']}>
      <TogglePanelButton panel="Seeds" img={seedIcon} />
      <TogglePanelButton panel="Recommended" img={recommendedIcon} />
      <TogglePanelButton panel="Settings" img={filterIcon} />
    </div>
  );
};

export default SideBar;
