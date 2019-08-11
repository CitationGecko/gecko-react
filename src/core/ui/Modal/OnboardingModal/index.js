import React, { useContext } from 'react';
import styles from './styles.module.css';
import PrimarySquareButton from 'core/components/PrimarySquareButton';
import SecondarySquareButton from 'core/components/SecondarySquareButton';
import ButtonList from 'core/components/ButtonList';
import { importExampleBibTex } from 'import-modules/bibtex';
import AddSeedsModal from 'core/ui/Modal/AddSeedsModal';
import { UI } from 'core/state/ui';
import { Store } from 'core/state/data';

const Welcome = () => {
  const { setModal } = useContext(UI);
  const { updatePapers } = useContext(Store);
  return (
    <React.Fragment>
      <h1> Welcome to Gecko </h1>
      <p>
        Gecko is here to help you find the most relevant papers to your research and give you a more
        complete sense of the research landscape.
      </p>
      <p>
        Start from a small set of 'seed papers' that define an area you are interested. Gecko will
        search the citation network for connected papers allowing you to quickly identify important
        papers you may have missed.
      </p>
      <div className={styles['modal-footer']}>
        <PrimarySquareButton
          onClick={() => setModal(<AddSeedsModal />)}
          text={'Start discovering papers'}
        />
      </div>
      <div>
        <button
          className={styles['demo-button']}
          onClick={async () => {
            let papers = await importExampleBibTex();
            updatePapers(papers, true);
            setModal(null);
          }}
        >
          show me an example!
        </button>
      </div>
    </React.Fragment>
  );
};

const AddSeedsHelp = () => {
  const { setModal } = useContext(UI);
  return (
    <React.Fragment>
      <h1> Add seed papers... </h1>
      <p>
        The first step is to pick the seed papers that define your area of interest. There are a
        number of ways to do this....
      </p>
      <AddSeedsModal />
    </React.Fragment>
  );
};

const SelectModeHelp = () => {
  return (
    <React.Fragment>
      <h1> What kind of papers are you looking for? </h1>
      <ButtonList>
        <SecondarySquareButton>
          <h1> Papers Cited-By Seed Papers </h1>
          <p>
            {' '}
            Papers cited by a lot of your seed papers are likely to be important older papers,
            perhaps foundational to the field.
          </p>
        </SecondarySquareButton>
        <SecondarySquareButton>
          <h1> Papers Citing Seed Papers </h1>
          <p>
            {' '}
            Papers citing a lot of your seed papers are newer papers that are in your area of
            interest.{' '}
          </p>
        </SecondarySquareButton>
      </ButtonList>
    </React.Fragment>
  );
};

const Help = () => {
  return (
    <React.Fragment>
      <table>
        <tr>
          <td>
            <img className="demo-screenshot" src="images/onboarding/seed-paper-demo.png" />
          </td>
          <td>Your seed papers are shown as yellow circles.</td>
        </tr>
        <tr>
          <td>
            <img className="demo-screenshot" src="images/onboarding/seed-list-demo.png" />
          </td>
          <td>To view / add / remove seed papers click the yellow circle in the side bar.</td>
        </tr>
        <tr>
          <td>
            <img className="demo-screenshot" src="images/onboarding/connected-paper-demo.png" />
          </td>
          <td>
            Papers connected to them are shown in grey. The size corresponds to the number of seed
            paper connections.
          </td>
        </tr>
        <tr>
          <td>
            <img className="demo-screenshot" src="images/onboarding/connected-list-demo.png" />
          </td>
          <td>To view a list of connected papers click the three grey circles in the side bar.</td>
        </tr>
        <tr>
          <td>
            <img className="demo-screenshot" src="images/onboarding/mode-toggle-demo.png" />
          </td>
          <td>
            To switch between papers cited by seeds and papers citing seeds, click the toggle switch
            in the key.
          </td>
        </tr>
      </table>
      <SecondarySquareButton text="Okay, let's go!" />
    </React.Fragment>
  );
};

export default Welcome;
