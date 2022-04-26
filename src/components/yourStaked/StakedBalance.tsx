import { Token } from "../Main"
import { useEthers } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../BalanceMsg"
import { constants } from 'ethers'
import { useStakedTokenBalance } from "../../hooks/useStakedTokenBalance"

export interface WalletBalanceProps {
    token: Token
}

export const StakedBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const user = account ? account.toString() : constants.AddressZero
    const tokenBalance = useStakedTokenBalance(address, user)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg
        label={`Your staked ${name} balance`}
        amount={formattedTokenBalance}
        tokenImgSrc={image} />)
}