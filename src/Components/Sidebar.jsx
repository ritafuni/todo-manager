import React from 'react';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';

export const drawerWidth = 240;

//this is how you use styled-components with material-ui
const CustomDrawer = styled(Drawer)`
  /* the content of the drawer is inside another div */
  > div {
    background-color: skyblue;
    width: ${drawerWidth}px;
  }
`;
function Sidebar(props){
  return(
    <CustomDrawer
      variant="persistent"
      anchor="left"
      open={true}
    >
      Sidebar
    </CustomDrawer>
  );
}

export default Sidebar;
