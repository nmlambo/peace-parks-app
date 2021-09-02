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

      <div className='banner__info'>
        <h1>SAFE GAURDING OUR RHINOS</h1>
        <h5>
          Reconnecting Africa’s wild spaces, to create a future for humankind in harmony with nature.
        </h5>
        <Button variant='outlined'>
          Visit Us
        </Button>
      </div>
    </div>
  );
}

export default Banner;
