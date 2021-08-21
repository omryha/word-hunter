import { MenuItem } from '@material-ui/core';
import { createMuiTheme, TextField, ThemeProvider } from '@material-ui/core';
import './Header.css';
import categories from '../../data/categories';
import { debounce } from 'lodash';

const Header = ({
  category,
  setCategory,
  word,
  setWord,
  setMeanings,
  LightTheme,
}) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: LightTheme ? '#000' : '#fff',
      },
      type: LightTheme ? 'light' : 'dark',
    },
  });

  const handleChange = (e) => {
    setCategory(e.target.value);
    setWord('');
    setMeanings([]);
  };

  const handleText = debounce((text) => {
    setWord(text);
  }, 1000);

  return (
    <div className='header'>
      <span className='title'>{word ? word : 'Word Hunter'}</span>
      <div className='inputs'>
        <ThemeProvider theme={darkTheme}>
          <TextField
            className='search'
            id='filled-basic'
            label='Search a Word'
            onChange={(e) => handleText(e.target.value)}
          />
          <TextField
            select
            label='Language'
            value={category}
            onChange={(e) => handleChange(e)}
            className='select'
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
