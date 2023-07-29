import React, {useState} from 'react'
import {ethers} from 'ethers';

const Wallet = () => {

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) { 

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			setErrorMessage('No Ethereum provided detected, Kindly install MetaMask browser extension to interact (Install Chrome)');
		}
    }

    const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString())
		
	}

    const getUserBalance = (address) => {
        if (window.ethereum) {
          window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then(balance => {
              setUserBalance(ethers.formatEther(balance));
            })
            .catch(error => {
              setErrorMessage(error.message);
            });
        } else {
          alert('No Ethereum provider detected');
          console.log('No Ethereum provider detected');
        }
      };
      

      const chainChangedHandler = () => {
        window.location.reload();
      };
      
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', accountChangedHandler);
      
        window.ethereum.on('chainChanged', chainChangedHandler);
      } else {
        //alert('No Ethereum Extension Detected, Kindly Make Use Chrome');
        console.log('No Ethereum provider detected');
      }


    return (
        <div className='Wallet'>
		<h4> {"Connection to MetaMask"} </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div className='accountDisplay'>
				<h4>Address: {defaultAccount}</h4>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
                
			</div>
			{errorMessage}
		</div>
    )
}


export default Wallet;