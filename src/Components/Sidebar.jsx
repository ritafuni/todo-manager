import React from 'react';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const drawerWidth = 240;

const CloseButton = styled.button`
  height: 56px;
  display: flex;
  padding-top: 15px;
  > div {
    margin-left: 10px;
  }
  /*style of icon*/
  > svg {
    margin-left: 130px;
    transform: rotate(180deg);
  }
`;
//this is how you use styled-components with material-ui
const CustomDrawer = styled(Drawer)`
  /* the content of the drawer is inside another div */
  > div {
    background-color: #007bff;
    width: ${drawerWidth}px;
  }
`;

const MenuButton = styled.button`
  display: flex;
  padding-top: 8px;
  > svg {
    font-size: 40px;
  }
  > div {
    margin-top: 7px;
    margin-left: 7px;
  }
`;

function Sidebar(props){
  return(
    <CustomDrawer
      variant="persistent"
      anchor="left"
      open={props.drawerOpen}
    >
      <CloseButton className='btn btn-primary' onClick={props.toggleDrawer}>
        <div>Menu</div><DoubleArrowIcon />
      </CloseButton>
      <MenuButton className='btn btn-primary'>
        <AssignmentIcon /><div>今日のタスク</div>
      </MenuButton>
      <MenuButton className='btn btn-primary'>
        <AssignmentIcon /><div>ルーチンタスク</div>
      </MenuButton>
      <MenuButton className='btn btn-primary'>
        <AssignmentIcon /><div>非ルーチンタスク</div>
      </MenuButton>
    </CustomDrawer>
  );
}

export default Sidebar;
