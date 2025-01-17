import TOKEN_STANDARDS from 'helpers/constants/TOKEN_STANDARDS'

const tokensData = {}

Object.keys(TOKEN_STANDARDS).forEach((key) => {
  const standard = TOKEN_STANDARDS[key].standard

  tokensData[standard] = {}
})

export const initialState = {
  ghostData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'GHOST',
    fullName: 'ghost',
    balanceError: null,
    infoAboutCurrency: null,
  },
  nextData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'NEXT',
    fullName: 'next',
    balanceError: null,
    infoAboutCurrency: null,
  },
  ethData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'ETH',
    fullName: 'Ethereum',
    balanceError: null,
    infoAboutCurrency: null,
  },
  bnbData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'BNB',
    fullName: 'Binance Coin',
    balanceError: null,
    infoAboutCurrency: null,
  },
  btcData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'BTC',
    fullName: 'Bitcoin',
    balanceError: null,
    infoAboutCurrency: null,
  },
  btcMultisigSMSData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'BTC (SMS-Protected)',
    fullName: 'Bitcoin (SMS)',
    balanceError: null,
    infoAboutCurrency: null,
  },
  btcMultisigPinData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'BTC (PIN-Protected)',
    fullName: 'Bitcoin (PIN)',
    balanceError: null,
    infoAboutCurrency: null,
  },
  btcMultisigG2FAData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'BTC (Google 2FA)',
    fullName: 'Bitcoin (Google 2FA)',
    balanceError: null,
    infoAboutCurrency: null,
  },
  btcMultisigUserData: {
    balance: 0,
    isBalanceFetched: false,
    currency: 'BTC (Multisig)',
    fullName: 'Bitcoin (Multisig)',
    balanceError: null,
    infoAboutCurrency: null,
  },
  usdtData: {
    address: '0x0', // ? for what
    publicKey: '0x0', // ?
    balance: 0,
    isBalanceFetched: false,
    currency: 'USDT',
    fullName: 'Tether',
    balanceError: null,
  },
  fiats: [],
  tokensData,
  isFetching: false,
  isBalanceFetching: false,
  isTokenSigned: false,
  activeFiat: window.DEFAULT_FIAT || 'USD',
  activeCurrency: 'BTC',
  multisigStatus: {},
  multisigPendingCount: 0,
  metamaskData: false,
}

export const updateMultisigStatus = (state, { address, last, total }) => {
  let totalPending = 0
  if (state.multisigStatus) {
    Object.keys(state.multisigStatus).map((savedAddress) => {
      if (address !== savedAddress) totalPending += state.multisigStatus[savedAddress].count
    })
  }

  totalPending += total

  return {
    ...state,
    multisigPendingCount: totalPending,
    multisigStatus: {
      ...(state.multisigStatus ? state.multisigStatus : {}),
      [address] : {
        address,
        pending: last,
        count: total,
      },
    },
  }
}

export const addWallet = (state, { name, data }) => ({
  ...state,
  [name]: {
    ...data,
  },
})

export const setAuthData = (state, { name, data }) => ({
  ...state,
  [name]: {
    ...state[name],
    ...data,
  },
})

export const setTokenSigned = (state, booleanValue) => ({
  ...state,
  isTokenSigned: booleanValue,
})

export const setTokenAuthData = (state, { name, standard, data }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
    [name]: {
      ...state.tokensData[name],
      ...data,
    },
  },
})

export const setBtcMultisigBalance = (state, { address, amount, unconfirmedBalance }) => {
  state.btcMultisigUserData.wallets.forEach((wallet) => {
    if (wallet.address === address) {
      wallet.balance = Number(amount)
      wallet.unconfirmedBalance = unconfirmedBalance
      wallet.isBalanceFetched = true
      wallet.balanceError = false
    }
  })
  return {
    ...state,
  }
}

export const setBalance = (state, { name, standard, amount, unconfirmedBalance }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
  },
  [name]: {
    ...state[name],
    balance: Number(amount),
    unconfirmedBalance,
    isBalanceFetched: true,
    balanceError: false,
  },
})

export const setInfoAboutToken = (state, { name, standard, infoAboutCurrency }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
    [name]: {
      ...state.tokensData[name],
      infoAboutCurrency,
    },
  },
})

export const setInfoAboutCurrency = (state, { name, standard, infoAboutCurrency }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
    [name]: {
      ...state.tokensData[name],
      infoAboutCurrency,
    },
  },
  [name]: {
    ...state[name],
    infoAboutCurrency,
  },
})

export const setBalanceError = (state, { name }) => ({
  ...state,
  [name]: {
    ...state[name],
    balanceError: true,
  },
})

export const setTokenBalanceError = (state, { name, standard }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
    [name]: {
      ...state.tokensData[name],
      balanceError: true,
    },
  },
})

export const setTokenBalance = (state, { name, standard, amount }) => ({
  ...state,
  tokensData: {
    ...state.tokensData,
    [name]: {
      ...state.tokensData[name],
      balance: Number(amount),
      isBalanceFetched: true,
      balanceError: false,
    },
  },
})

export const setIsBalanceFetching = (state, { isBalanceFetching }) => ({
  ...state,
  isBalanceFetching,
})

export const setIsFetching = (state, { isFetching }) => ({
  ...state,
  isFetching,
})

export const setFiats = (state, { fiats }) => ({ ...state, fiats })

export const setActiveCurrency = (state, { activeCurrency }) => ({ ...state, activeCurrency })

export const setActiveFiat = (state, { activeFiat }) => ({ ...state, activeFiat })
