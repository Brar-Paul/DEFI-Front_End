/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />

import { useEthers, ChainId } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import paul from "../dapp.png"
import dai from "../dai.png"
import eth from "../eth.png"
import uni from "../uni.png"
import aud from "../aud.png"
import { YourWallet } from "./yourWallet"
import { makeStyles } from "@material-ui/core"
import { YourStaked } from "./yourStaked"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(1)
    },
    container: {
        textAlign: 'center',
    }
}))

export const Main = () => {
    // Show token values from the wallet

    // Get the address of different tokens
    // Get the balance of the user's wallet
    const classes = useStyles()
    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    const paulTokenAddress = chainId ? networkMapping[String(chainId)]["PaulToken"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
    const uniTokenAddress = chainId ? brownieConfig["networks"][networkName]["uni_token"] : constants.AddressZero
    const audTokenAddress = chainId ? brownieConfig["networks"][networkName]["aud_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        {
            image: paul,
            address: paulTokenAddress,
            name: "PAUL"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "wETH"
        },
        {
            image: uni,
            address: uniTokenAddress,
            name: "UNI"
        },
        {
            image: aud,
            address: audTokenAddress,
            name: "AUD"
        }
    ]

    return (<>
        <h1 className={classes.title}>Paul's Organic Token Farm</h1>
        <p className={classes.title}>Please connect to Kovan Testnet. <br /> Test coin addresses can be found in config file in repo</p>
        <div className={classes.container}>
            <a className={classes.title} href="https://faucets.chain.link/">Click here for Kovan ETH</a>
        </div>
        <YourWallet supportedTokens={supportedTokens} />
        <YourStaked supportedTokens={supportedTokens} />
    </>)
}