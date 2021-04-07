import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 1800px;
  margin: auto;
`;

export const DotsPos = styled.div`
  position: absolute;
  bottom: 0;

  @media only screen and (max-width: 320px) {
    right: 24%;
  }
  @media only screen and (min-width: 375px) {
    right: 28.3%;
  }
  @media only screen and (min-width: 425px) {
    right: 33.5%;
  }
  @media only screen and (min-width: 430px) {
    right: 75%;
  }
  @media only screen and (min-width: 768px) {
    right: 19%;
  }
  @media only screen and (min-width: 992px) {
    right: 16%;
  }
  @media only screen and (min-width: 1200px) {
    right: 12%;
  }
`;
