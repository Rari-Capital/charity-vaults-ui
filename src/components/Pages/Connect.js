import React, { useEffect, useContext } from 'react'
import { ethers } from 'ethers';
import RariContext from '../../Context';
import Page from "../Page/Page"
import Card from "../Card/Card"
import Button from "../Button/Button"
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./Connect.css"


const Connect = () => {
    // Extracting function to set provider in context
    const context = useContext(RariContext);
    console.log(context);
    const provider = context.web3provider;
    const setProvider = context.setProvider;

    // Defining provider options to add wallet connect to web3modal
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
            }
        },
    };

    // Initializing web3modal
    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true, // optional
        disableInjectedProvider: false,
        providerOptions // required
    });

    // Connect to cached provider if any.
    useEffect(async() => {
        if (!provider && web3Modal.cachedProvider) {
            let new_provider = await web3Modal.connect();
            setProvider(new_provider);
        }
    }, []);

    // Disconnecting provider
    const disconnect = async () => {
        // Close provider if necessary
        if (provider && provider.close) {
            await provider.close();
        }

        // Clear web3modal cached provider and set provider state back to null
        await web3Modal.clearCachedProvider();
        setProvider(null);
    }

    const connect = async () => {
        console.log("hello");
        const new_provider = await web3Modal.connect();
        console.log("connected");
        const ethersProvider = new ethers.providers.Web3Provider(new_provider);
        setProvider(ethersProvider);
    };

    // Determining display name for connected provider (if there is one)
    let connectedProviderName = "----";
    if (provider && web3Modal.cachedProvider) {
        if (web3Modal.cachedProvider == "injected") {
            connectedProviderName = "Metamask"
        } else {
            connectedProviderName = web3Modal.cachedProvider
        }
    }

    return (
        <Page>
            <div className="connect-card-container">
                <Card name="Connected Address" value={provider ? provider.provider.selectedAddress : "XXXXXXXXXXXXXXXXXXXXX"} />
            </div>
            <div className="connect-card-container">
                <Card name="Wallet Provider" value={connectedProviderName} />
            </div>
            <div className="connect-buttons-container">
                <Button onClick={disconnect} isDark={true}>Disconnect</Button>
                <Button onClick={connect}>Connect</Button>
            </div>
        </Page>
    )
}

export default Connect;
