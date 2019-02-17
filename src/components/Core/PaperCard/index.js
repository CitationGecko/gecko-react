import React, { Component } from 'react';
import styles from './styles.module.css';
import { LinkoutIcon } from '../../Icons/LinkoutIcon';
import { DeleteIcon } from '../../Icons/DeleteIcon';

class PaperCard extends Component {
  render() {
    let author = this.props.paper.author ? this.props.paper.author : '';
    let journal = this.props.paper.journal ? this.props.paper.journal : '';

    let rightFloat;
    switch (this.props.mode) {
      case 'Seeds':
        rightFloat = <div className={styles['delete-seed']}>{<DeleteIcon />}</div>;
        break;
      case 'CitedBySeeds':
        rightFloat = (
          <span className={styles['metric']}>
            cited by <span className={styles['metric-count']}>{this.props.paper.seedsCitedBy}</span>{' '}
            seed papers
          </span>
        );
        break;
      case 'CitingSeeds':
        rightFloat = (
          <span>
            cites <span className={styles['metric-count']}>{this.props.paper.seedsCited}</span> seed
            papers
          </span>
        );
        break;
      default:
        rightFloat = '';
    }
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
        <div className={styles['float-right']}>{rightFloat}</div>
        <div className={styles['journal']}>{journal}</div>
      </div>
    );
  }
}

export default PaperCard;
