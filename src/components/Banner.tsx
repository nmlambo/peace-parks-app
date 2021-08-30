import { useState } from 'react';
import Search from './Search';
import { Button } from '@material-ui/core';
import './Banner.css';

function Banner() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className='banner'>
      <div className='banner__search'>
        {showSearch && <Search />}
        <Button
          className='banner__searchButton'
          variant='outlined'
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? 'Hide' : 'BOOK NOW'}
        </Button>
      </div>
    </div>
  );
}

export default Banner;
