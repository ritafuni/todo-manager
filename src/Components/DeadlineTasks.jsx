import React from 'react';
import styled from 'styled-components';
import { drawerWidth } from './Sidebar';

const Container = styled.div`
  margin-left: ${props => props.drawerOpen ? drawerWidth : 0}px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  padding: 8px;
`;

function DeadlineTasks(props){
  return (
    <Container drawerOpen={props.drawerOpen}>
      <Title>
        期限付きタスク
      </Title>
    </Container>
  );
}

export default DeadlineTasks;
