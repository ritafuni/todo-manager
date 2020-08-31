import React from 'react';
import styled from 'styled-components';
import SaveLoadButton from './SaveLoadButton';
import { drawerWidth } from './Sidebar';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const CustomNav = styled.nav`
  /* drawer-open class */
  &.drawer-open {
    transform: translateX(${drawerWidth}px);
    transition: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: calc(100% - ${drawerWidth}px);
  }
  /* drawer-close class */
  &.drawer-close {
    transform: translateX(0px);
    transition: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: 100%;
  }
`;

const MenuOpenButton = styled.button`
  display: ${props => props.drawerOpen ? 'none' : 'block'};
`;

const NavbarBrand = styled.div`
margin-left: 10px;
`;

function Menubar(props){
  return(
    <CustomNav
      className={
        'navbar navbar-expand-lg bg-primary text-light '
        + (props.drawerOpen ? 'drawer-open' : 'drawer-close')
      }
      drawerOpen={props.drawerOpen}
    >
      <MenuOpenButton
        className='btn btn-primary'
        onClick={props.toggleDrawer}
        drawerOpen={props.drawerOpen}
      >
        <MenuOpenIcon style={{color: '#fff'}} />
      </MenuOpenButton>
      <NavbarBrand className='navbar-brand'>TODO Manager</NavbarBrand>
      <SaveLoadButton
        saveFunc={props.saveFunc}
        loadFunc={props.loadFunc}
      />
    </CustomNav>
  );
}

export default Menubar;
