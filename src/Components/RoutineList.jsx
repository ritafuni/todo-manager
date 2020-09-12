import React from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.div`
  margin: 8px;
`;

const Title = styled.h4`
  padding: 8px;
`;

function RoutineList(props){
  return (
    <div>
      <Title>
        ルーチン一覧
      </Title>
      <ButtonDiv>
        <button className='btn btn-primary' onClick={() => props.changePageFunc('EditRoutine')}>新規ルーチン</button>
      </ButtonDiv>
    </div>
  );
}

export default RoutineList;
