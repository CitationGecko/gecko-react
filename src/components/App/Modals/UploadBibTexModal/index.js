import React, { useContext } from 'react';
import { importBibTex } from 'import-modules/bibtex';
import { Store } from 'state/data';
import { UI } from 'state/ui';

const UploadBibTexModal = () => {
  const { updatePapers } = useContext(Store);
  const { closeModal } = useContext(UI);

  const onChange = async e => {
    let papers = await importBibTex(e);
    updatePapers(papers, true);
    closeModal();
  };

  return (
    <React.Fragment>
      <h1>Upload BibTex</h1>
      <div>
        <input type="file" accept=".bib" onChange={onChange} />
        <output />
      </div>
    </React.Fragment>
  );
};

export default UploadBibTexModal;
