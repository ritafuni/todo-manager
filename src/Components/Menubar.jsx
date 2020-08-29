import React from 'react';
import styled from 'styled-components';
import SaveLoadButton from './SaveLoadButton';

const NavbarBrand = styled.div`
  margin-left: 10px;
`;

function Menubar(props){
  return(
    <nav className='navbar navbar-expand-lg bg-primary text-light'>
      <NavbarBrand className='navbar-brand'>TODO Manager</NavbarBrand>
      <SaveLoadButton
        saveFunc={props.saveFunc}
        loadFunc={props.loadFunc}
      />
    </nav>
  );
}

export default Menubar;
