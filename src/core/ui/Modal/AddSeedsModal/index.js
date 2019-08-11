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

  return <ButtonList>{buttons}</ButtonList>;
};

export default AddSeedsModal;
