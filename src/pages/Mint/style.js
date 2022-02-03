import styled from "styled-components";

export const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const MintText = styled.span`
  color: white;
  font-size: 40px;
  margin: 20px 0 0 0;
  text-align: center;
`;
export const SmallText = styled.span`
  color: white;
  font-size: 14px;
`;

export const BtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
  margin: 20px 0 0 0;
`;
export const WalletAddress = styled.input`
  height: 50px;
  color: white;
  background-color: transparent;
  outline: none;
  border: 1px solid white;
`;
export const MintButton = styled.button`
  color: white;
  background-color: #401758;
  width: 120px;
  height: 50px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
`;
export const NFTimg = styled.img`
  width: 100px;
  height: 60px;
`;
export const NFTvideo = styled.video`
  width: 100px;
`;
export const TransferView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;
export const TransferDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;
