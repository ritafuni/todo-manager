import React from 'react';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

export const drawerWidth = 240;

const CloseButton = styled.button`

`;
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
      open={props.drawerOpen}
    >
      Sidebar
      <CloseButton onClick={props.toggleDrawer}>
        <CloseIcon />
      </CloseButton>
    </CustomDrawer>
  );
}

export default Sidebar;
