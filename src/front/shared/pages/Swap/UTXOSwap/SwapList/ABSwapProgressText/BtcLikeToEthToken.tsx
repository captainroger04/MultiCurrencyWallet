import React, { Component } from 'react'

import { FormattedMessage } from 'react-intl'

export default class BtcLikeToEthToken extends Component<any, any> {
  BtcLikeToEthToken = (step, coinName, flow) => {
    if (!flow.isTakerMakerModel
      || (flow.isTakerMakerModel && flow.isMaker())
    ) {
      switch (step) {
        case 1:
          return (
            <FormattedMessage id="BitcoinBuyText17_BtcLike_to_tokens" defaultMessage="Please wait" />
          )
        case 2:
          return (
            <FormattedMessage id="BtcToEthToken20_BtcLike_to_tokens" defaultMessage="Create a secret key" />
          )
        case 3:
          return (
            <FormattedMessage id="BitcoinBuyText29_BtcLike_to_tokens" defaultMessage="Checking balance.." />
          )
        case 4:
          return (
            <FormattedMessage
              id="BitcoinBuyText33_BtcLike_to_tokens"
              defaultMessage="Depositing {coinName}.{br}It can take a few minutes"
              values={{
                br: <br />,
                coinName,
              }}
            />
          )
        case 5:
          return (
            <FormattedMessage
              id="BitcoinBuyText37_BtcLike_to_tokens"
              defaultMessage="Waiting for the transaction to be mined and the {buyCurrency} owner deposit his funds to the swap's contract"
              values={{
                buyCurrency: `${this.props.swap.buyCurrency}`
              }}
            />
          )
        case 6:
          return (
            <FormattedMessage
              id="BitcoinBuyText41_BtcLike_to_tokens"
              defaultMessage="{buyCurrency} Contract created and charged. Requesting withdrawal from {buyCurrency} Contract."
              values={{ buyCurrency: `${this.props.swap.buyCurrency}` }} />
          )
        case 7:
          return (
            <FormattedMessage
              id="BitcoinBuyText45_BtcLike_to_tokens"
              defaultMessage="{buyCurrency} tokens was transferred to your wallet. Check the balance."
              values={{ buyCurrency: `${this.props.swap.buyCurrency}` }} />
          )
        case 8:
          return (
            <FormattedMessage id="BitcoinBuyText49_BtcLike_to_tokens" defaultMessage="Thank you for using Swap.Online" />
          )
        case 9:
          return (
            <FormattedMessage id="BitcoinBuyText53_BtcLike_to_tokens" defaultMessage="Thank you for using Swap.Online!" />
          )
        default:
          return null
      }
    }
  }

  render() {

    return this.BtcLikeToEthToken(this.props.step, this.props.coinName, this.props.swap.flow)
  }
}
