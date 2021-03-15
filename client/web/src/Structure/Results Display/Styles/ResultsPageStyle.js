import styled from 'styled-components'

export const ResultWrapper = styled.div`
    font-size: 16px;
`

export const QuestionWrapper = styled.div`
    border: 1px solid #e8e8e8;
    padding: 10px 40px;
    border-radius: 2px;
    margin-bottom: 20px;
`

export const OutcomeTag = styled.span`
    background-color: ${props => props.outcome === "SKIPPED" ? '#e3bf2d' : props.outcome === 'CORRECT' ? 'green' : 'red'};
    padding: 5px 10px;
    border-radius: 3px;
    color: white;
`

export const QuestionLine = styled.div`
    position: absolute;
    background-color: #165f78;
    top: 0;
    bottom: 0;
    width: 10px;
`

export const QuestionMain = styled.div`
    position: relative;
    font-weight: bolder;
`

export const Bolder = styled.p`
    font-weight: bolder;
`