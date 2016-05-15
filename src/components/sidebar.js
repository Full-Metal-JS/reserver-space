import React from 'react';
import SidebarLocation from './SidebarLocation';

const Sidebar = ({locationsList, roomsList}) => {
  let locations = locationsList.map(function(location){
    return <SidebarLocation location=location roomsList=roomsList}/>;
  });

  return (
    <div className='col-sm-3 col-md-2 sidebar'>
      <ul className='nav nav-sidebar'>
        {locations}
      </ul>
    </div>
  )
};

export default Sidebar;
