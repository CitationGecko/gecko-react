import React, { Component } from 'react';
import styles from './styles.module.css';
import { LinkoutIcon } from 'core/icons/LinkoutIcon';

class PaperCard extends Component {
  render() {
    let author = this.props.paper.author ? this.props.paper.author : '';
    let journal = this.props.paper.journal ? this.props.paper.journal : '';

    return (
      <div
        className={`${styles['paper-box']} ${
          this.props.selected ? styles['selected-paper'] : null
        }`}
        onClick={this.props.onClick}
      >
        <div className={styles['paper-title']}>
          {this.props.paper.title}
          <a
            className={styles['linkout-icon']}
            target="_blank"
            rel="noreferrer noopener"
            href={`https://doi.org/${this.props.paper.doi}`}
          >
            {<LinkoutIcon color={this.props.selected ? 'white' : 'rgb(255, 199, 0)'} />}
          </a>
        </div>
        <div className={styles['author-year']}>{`${author} ${this.props.paper.year}`}</div>
        <div className={styles['float-right']}>{this.props.rightFloat}</div>
        <div className={styles['journal']}>{journal}</div>
      </div>
    );
  }
}

export default PaperCard;
