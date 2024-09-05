import styled from "@emotion/styled";

export const ParentContainer = styled.div`
  background: skyblue;
  height: 500px;
  width: 500px;
  display: flex;
  justify-items: center;
  align-items: center;
  margin: 10px;
  position: fixed;
`;

export const Snake = styled.div`
  background: red;
  height: 10px;
  width: 10px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  animation: MovedUpDown 10s linear infinite;
  @keyframes MovedUpDown {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-200px);
    }
    100% {
      transform: translateY(400px);
    }
  }
`;
