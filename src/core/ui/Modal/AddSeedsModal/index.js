import React, { useContext } from 'react';
import SecondarySquareButton from 'core/components/SecondarySquareButton';
import ButtonList from 'core/components/ButtonList';
import { UI } from 'core/state/ui';
import { getImportModules } from 'core/module-loader';

const AddSeedsModal = () => {
  const { setModal } = useContext(UI);
  const options = getImportModules();

  const buttons = options.map((option, i) => {
    return (
      <SecondarySquareButton
        key={i}
        onClick={() => setModal(option.modal)}
        text={option.buttonText}
      />
    );
  });

  return (
    <React.Fragment>
      <h1>Add Seed Papers</h1>
      <p>
        Add seed papers that define your area of interest and Gecko will find you connected papers.
        We recommended starting with 5 or 6.
      </p>
      <ButtonList>{buttons}</ButtonList>
    </React.Fragment>
  );
};

export default AddSeedsModal;
