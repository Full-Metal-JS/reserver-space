import React from 'react';
import SidebarLocation from './SidebarLocation';

const Sidebar = ({locationsList, roomsList}) => {
  let locations = locationsList ? locationsList.map(location =>
    <SidebarLocation location={location} roomsList={roomsList}/>) : '';

  return (
    <div className='col-sm-3 col-md-2 sidebar'>
      <h3 className='nav-sidebar text-center'>Locations</h3>
      <ul className='nav nav-sidebar'>
        {locations}
      </ul>
    </div>
  );
};

export default Sidebar;
