import React, { Component } from 'react';
import styles from './styles.module.css';

class SideBarButton extends Component {
  render() {
    return (
      <button className={styles.button}>
        <img src={this.props.img} alt="icon" className={styles.icon} />
      </button>
    );
  }
}

export default SideBarButton;
