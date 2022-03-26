import { useContext } from 'react';
import { I18nContext } from 'next-i18next';
import { i18n } from '../../../../i18n';

function LanguageSwitcher() {
  // const [languageChose, setLanguageChose] = useState('');
  const {
    i18n: { language }
  } = useContext(I18nContext);

  const changeLanguage = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <select
        onChange={changeLanguage}
        defaultValue={language}
        style={{
          margin: '0 10px',
          padding: '0',
          background: 'none',
          color: '#fff',
          width: '77px',
          outline: 'none',
          border: 'none'
        }}
      >
        <option value="en" style={{ color: 'black' }}>
          ENGLISH
        </option>
        <option value="fr" style={{ color: 'black' }}>
          FRENCH
        </option>
        <option value="de" style={{ color: 'black' }}>
          GERMAN
        </option>
        <option value="es" style={{ color: 'black' }}>
          SPANISH
        </option>
        <option value="it" style={{ color: 'black' }}>
          ITALIAN
        </option>
        <option value="lit" style={{ color: 'black' }}>
          LITHUANIAN
        </option>
      </select>
    </>
  );
}

export default LanguageSwitcher;
