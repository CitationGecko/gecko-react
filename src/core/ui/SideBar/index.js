import React, { useContext } from 'react';
import styles from './styles.module.css';
import SideBarButton from 'core/components/SideBarButton';
import recommendedIcon from 'core/icons/recommended-icon.png';
import filterIcon from 'core/icons/filter-icon.png';
import seedIcon from 'core/icons/seed-icon.png';
import helpIcon from 'core/icons/help-icon.png';
import { UI } from 'core/state/ui';
import HelpModal from 'core/ui/Modal/HelpModal';

const TogglePanelButton = ({ panel, img }) => {
  const { leftPanel, setLeftPanel } = useContext(UI);
  const active = leftPanel === panel;
  return (
    <SideBarButton active={active} img={img} onClick={() => setLeftPanel(active ? null : panel)} />
  );
};

const SideBar = () => {
  const { setModal } = useContext(UI);

  return (
    <div className={styles['side-bar']}>
      <div>
        <TogglePanelButton panel="Seeds" img={seedIcon} />
        <TogglePanelButton panel="Recommended" img={recommendedIcon} />
        <TogglePanelButton panel="Settings" img={filterIcon} />
      </div>
      <div>
        <SideBarButton
          active={false}
          img={helpIcon}
          onClick={() => {
            setModal(<HelpModal />);
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
