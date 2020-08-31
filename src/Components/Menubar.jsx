import React from 'react';
import styled from 'styled-components';
import SaveLoadButton from './SaveLoadButton';
import { drawerWidth } from './Sidebar';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const CustomNav = styled.nav`
  margin-left: ${props => props.drawerOpen ? drawerWidth : 0}px;
  /* transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms; */
  /* transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */
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
      className='navbar navbar-expand-lg bg-primary text-light'
      drawerOpen={props.drawerOpen}
    >
      <MenuOpenButton
        className='btn'
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
