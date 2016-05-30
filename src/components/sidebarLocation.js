import React from 'react';

const SidebarLocation = ({location, roomsList}) => {
  let rooms = roomsList.map(room => 
    <li id={room}>{room}</li>
  );

  return (
    <li id={location}>
      <h3>{location}</h3>
      <ul className='roomsList'>
        {rooms}
      </ul>
    </li>
  );
};

export default SidebarLocation;
