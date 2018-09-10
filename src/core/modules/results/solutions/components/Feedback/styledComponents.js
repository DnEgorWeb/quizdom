import styled from 'styled-components'
import Checkbox from '../Checkbox'

export const FeedbackWrapper = styled.div`
  margin-left: 25px;
`
export const FeedbackTitle = styled.div`
  font: 500 36px Arial;
  margin: 0 100px 15px 0;
  color: white;
`
export const FeedbackCheckboxList = styled.ul`
  padding: 0;
  margin: 0;
  margin-bottom: 54px;
  list-style-type: none;
  & > li:nth-child(even) {
    background: rgb(54,54,55);
  }
  & > li:nth-child(odd) {
    background: rgb(65,65,65);
  }
  &:last-child {
    margin: 0;
  }
`
export const CheckboxLabel = styled.li`
  box-sizing: border-box;
  border: 2px solid rgb(103,103,103);
  border-bottom-color: rgb(35,31,31);
  font: 500 32px Arial;
  color: ${({checked}) => checked ? 'rgb(31,242,255)' : 'white'};
`
export const CheckboxCaption = styled.div`
  display: inline-block;
  width: 450px;
  margin-left: 20px;
`
export const ComplexityBlock = styled.div``
export const ComplexityBlockTitle = styled.div`
  font: 500 28px Arial;
  color: rgb(255,230,0);
  margin: 0 0 20px 10px;
`
export const ComplexityBlockForm = styled.div``

export const ComplexityCheckbox = styled(Checkbox)`
   margin: 0 0 0 50px;
`
export const FormLabelsBlock = styled.div`
  display: flex;
  height: 82px;
  box-sizing: border-box;
  border: 2px solid rgb(103,103,103);
  border-bottom-color: rgb(35,31,31);
  font: 500 25px Arial;
  background: rgb(65,65,65);
`
export const Label = styled.div`
    flex: 1;
    margin: 10px 0 0 15px;
    color: ${({checked}) => checked ? 'rgb(31,242,255)' : 'white'};
`
export const FormCheckboxesBlock = styled.div`
  display: flex;
  height: 82px;
  box-sizing: border-box;
  border: 2px solid rgb(103,103,103);
  border-bottom-color: rgb(35,31,31);
  font: 500 25px Arial;
  background: rgb(54,54,55);
`
export const CheckboxBlock = styled.div`
  flex: 1;
  margin: 10px 0 0 0;
`

export const SendButton = styled.button`
    border: none;
    border-radius: 42px;
    display: ${({enabled}) => enabled ? 'block' : 'none'};
    width: 340px;
    margin: 50px 0 0 80px;
    height: 96px;
    background: linear-gradient(rgb(90,90,90),rgb(49,46,48));
    font: 900 36px 'Franclin-gothic-demi';
    text-shadow: 0 -4px 5px black;
    color: #1ff2ff;
    box-shadow: 0px -2px 0px rgba(255,255,255,1), 0px 0px 0px 4px rgba(40,40,40,1);
    cursor: pointer;

    &:active {
        background: linear-gradient(rgb(49,46,48), rgb(90,90,90));
        box-shadow: 0px -1px 3px rgba(40, 40, 40, 1);
        transform: translate(0, 2px);
    }

    &:focus {
        outline: none;
    }
`

export const CongratulationLabel = styled.div`
  width: 340px;
  margin: 50px 0 0 80px;
  height: 96px;
  border-radius: 42px;
  color: rgb(54,167,0);
  background: rgb(54,54,55);
  font: 500 36px 'Franclin-gothic-demi';
  display: flex;
  justify-content: center;
  align-items: center;
`
