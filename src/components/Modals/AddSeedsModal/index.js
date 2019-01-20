import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import SecondarySquareButton from '../../Core/SecondarySquareButton';
import { openModal } from '../../../state';

class AddSeedsModal extends Component {
  render() {
    const dispatch = action => () => this.props.dispatch(action);
    const actions = [
      {
        text: 'Import from Zotero',
        action: dispatch(openModal('zotero'))
      },
      {
        text: 'Import from Mendeley',
        action: dispatch(openModal('mendeley'))
      },
      {
        text: 'Import from BibTex',
        action: dispatch(openModal('bibtex'))
      },
      {
        text: 'Search for Papers',
        action: dispatch(openModal('seedSearch'))
      }
    ];

    const buttons = actions.map(b => {
      return <SecondarySquareButton action={b.action} text={b.text} />;
    });

    return (
      <React.Fragment>
        <div className={styles['large-button-list']}>{buttons}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSeedsModal);
