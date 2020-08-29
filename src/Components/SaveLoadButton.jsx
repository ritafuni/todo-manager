import React from 'react';
import styled from 'styled-components';

const ButtonRow = styled.div`
  margin-left: 8px;

  > button {
    margin: 0 8px 0 8px;
  }
`;

function SaveLoadButton(props){
  return (
    <ButtonRow className='row'>
      <button className='btn btn-primary' onClick={() => props.saveFunc()}>Save</button>
      <button className='btn btn-primary' onClick={() => props.loadFunc()}>Load</button>
    </ButtonRow>
  );
}

export default SaveLoadButton;
