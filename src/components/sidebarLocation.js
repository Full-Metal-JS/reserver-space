import React from 'react';

const SidebarLocation = ({location, roomsList}) => {
  let rooms = roomsList.map(function(room){
    return (<li id={room}>{room}</li>);
  });

  return (
    <li id={location}>
      <ul className='roomsList'>
        {rooms}
      </ul>
    </li>
  );
};

export default SidebarLocation;
