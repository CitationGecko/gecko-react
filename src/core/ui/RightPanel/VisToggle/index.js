import React, { useContext } from 'react';
import SideBarButton from 'core/components/SideBarButton';
import timelineIcon from 'core/icons/timeline-icon.png';
import networkIcon from 'core/icons/network-icon.png';

import { UI } from 'core/state/ui';

import styles from './styles.module.css';

const TogglePanelButton = ({ panel, img }) => {
  const { rightPanel, setRightPanel } = useContext(UI);
  const active = rightPanel === panel;
  return <SideBarButton active={active} img={img} onClick={() => setRightPanel(panel)} />;
};

export const VisToggle = () => (
  <div className={styles['vis-toggle']}>
    <TogglePanelButton panel="timeline" img={timelineIcon} />
    <TogglePanelButton panel="network" img={networkIcon} />
  </div>
);
