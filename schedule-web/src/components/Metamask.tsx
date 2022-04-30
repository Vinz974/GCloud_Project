import React, { useEffect, useState } from "react";
import styles from"./Metamask.module.css";


async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

  }
}

export default function MetaMask({ onAddressChanged }) {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  return userAddress ? (
    <div>
      Connected with <Address className={styles.address}userAddress={userAddress} />
    </div>
  ) : (
     <Connect className={styles.button}setUserAddress={setUserAddress}/>
  );
}

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}


function Connect({ setUserAddress }) {
  return (
    <button className={styles.button} onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}


function Address({ userAddress }) {
  return (
    <span className={styles.address} >{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
  );
}