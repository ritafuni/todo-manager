import React from 'react';
import styled from 'styled-components';
import SaveLoadButton from './SaveLoadButton';
import { drawerWidth } from './Sidebar';

const NavbarBrand = styled.div`
  margin-left: 10px;
`;

const CustomNav = styled.nav`
  margin-left: ${drawerWidth}px;
`;

function Menubar(props){
  return(
    <CustomNav className='navbar navbar-expand-lg bg-primary text-light'>
      <NavbarBrand className='navbar-brand'>TODO Manager</NavbarBrand>
      <SaveLoadButton
        saveFunc={props.saveFunc}
        loadFunc={props.loadFunc}
      />
    </CustomNav>
  );
}

export default Menubar;
