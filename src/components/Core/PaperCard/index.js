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
          <span>
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
      <div className={styles['paper-box']} onClick={this.props.onClick}>
        <div className={styles['paper-title']}>
          {this.props.paper.title}
          <a
            className={styles['linkout-icon']}
            target="_blank"
            href={`https://doi.org/${this.props.paper.doi}`}
          >
            {<LinkoutIcon />}
          </a>
        </div>
        <div className={styles['author-year']}>{`${author} ${this.props.paper.year}`}</div>
        <div className={styles['right-float']}>{rightFloat}</div>
        <div className={styles['journal']}>{journal}</div>
      </div>
    );
  }
}

export default PaperCard;
