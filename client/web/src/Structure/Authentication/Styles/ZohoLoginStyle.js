import styled from 'styled-components'

export const Button = styled.div`
    background-color: #2b5cac;
    color: rgb(255, 255, 255);
    height: 50px;
    width: 240px;
    border: none;
    text-align: center;
    box-shadow: rgb(0 0 0 / 25%) 0px 2px 4px 0px;
    font-size: 16px;
    line-height: 48px;
    display: block;
    border-radius: 1px;
    transition: background-color 0.218s ease 0s, border-color 0.218s ease 0s, box-shadow 0.218s ease 0s;
    font-family: Roboto, arial, sans-serif;
    cursor: pointer;
    user-select: none;
    margin-left: 10px;

    :hover{
        box-shadow: rgb(66 133 244 / 30%) 0px 0px 3px 3px;
    }

    > img{
        width: 48px;
        height: 48px;
        text-align: center;
        display: block;
        margin-top: 1px;
        margin-left: 1px;
        float: left;
        background-color: rgb(255, 255, 255);
        border-radius: 1px;
        white-space: nowrap;
        padding: 0 5px;
    }
`