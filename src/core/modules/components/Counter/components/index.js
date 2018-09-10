import React from 'react'
import styled from 'styled-components'

const CounterWrapper = styled.div`
  font: 900 48px Univers-condensed;
  color: #89898b;
  
  display: flex;
  align-items: flex-start;
  height: 48px;
`;

const Current = styled.div`
  color: ${({color}) => color};
`;

const Separator = styled.div`
  width: 4px;
  height: 100%;
  background: #89898b;
  
  margin: 7px 10px 0
`;

const Max = styled.div``

const Counter = ({current = 1, max = 7, color = 'rgb(31,241,255)'}) => {
    return (
        <CounterWrapper>
            <Current color={color}>{current}</Current>
            <Separator />
            <Max>{max}</Max>
        </CounterWrapper>
    )
}

export default Counter;
