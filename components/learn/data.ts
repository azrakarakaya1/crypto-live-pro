import type { GlossaryTerm, LearningModule } from '@/types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Blockchain',
    definition:
      'A distributed, immutable ledger of transactions grouped into blocks that are cryptographically linked. No single entity controls the chain.',
    category: 'Basics',
  },
  {
    term: 'Wallet',
    definition:
      'Software or hardware that stores your private and public keys, allowing you to send, receive, and manage crypto assets.',
    category: 'Basics',
  },
  {
    term: 'Private Key',
    definition:
      'A secret 256-bit number that gives full control over a wallet. Anyone who knows it can spend those funds. Never share it.',
    category: 'Basics',
  },
  {
    term: 'Public Key',
    definition:
      'A cryptographic key derived from your private key. It is used to generate your wallet address and can be shared safely.',
    category: 'Basics',
  },
  {
    term: 'Market Cap',
    definition:
      'Total value of a cryptocurrency: current price × circulating supply. A common metric for ranking coins by size.',
    category: 'Trading',
  },
  {
    term: 'Liquidity',
    definition:
      'How easily an asset can be bought or sold without significantly affecting its price. High liquidity means tight spreads.',
    category: 'Trading',
  },
  {
    term: 'Slippage',
    definition:
      'The difference between the expected price of a trade and the price at which it actually executes, often caused by low liquidity.',
    category: 'Trading',
  },
  {
    term: 'HODL',
    definition:
      'Originating from a misspelled "hold," it means to hold a cryptocurrency long-term regardless of price swings.',
    category: 'Trading',
  },
  {
    term: 'DeFi',
    definition:
      'Decentralized Finance — financial services (lending, borrowing, trading) built on public blockchains without traditional intermediaries.',
    category: 'DeFi',
  },
  {
    term: 'Liquidity Pool',
    definition:
      'A smart-contract pool of two tokens that enables decentralized trading. Providers earn fees in exchange for depositing assets.',
    category: 'DeFi',
  },
  {
    term: 'Yield Farming',
    definition:
      'Strategy of moving crypto assets between DeFi protocols to maximize returns through interest, fees, and token rewards.',
    category: 'DeFi',
  },
  {
    term: 'Smart Contract',
    definition:
      'Self-executing code deployed on a blockchain that automatically enforces the terms of an agreement when conditions are met.',
    category: 'DeFi',
  },
  {
    term: 'Seed Phrase',
    definition:
      'A human-readable backup of your private key — usually 12 or 24 words. Store it offline and never share it with anyone.',
    category: 'Security',
  },
  {
    term: 'Phishing',
    definition:
      'A social-engineering attack where fraudsters impersonate trusted sites or people to steal your keys, seed phrase, or funds.',
    category: 'Security',
  },
  {
    term: 'Cold Storage',
    definition:
      'Keeping private keys offline (hardware wallet, paper wallet) to protect assets from online hacks and malware.',
    category: 'Security',
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-1',
    title: 'Bitcoin 101',
    description: 'Understand what Bitcoin is, how it works, and why it matters.',
    chapters: [
      {
        id: 'ch-1-1',
        title: 'What is Bitcoin?',
        content: `Bitcoin (BTC) was created in 2009 by the pseudonymous Satoshi Nakamoto. It is the first decentralized digital currency — money that can be sent peer-to-peer without a bank or government.\n\nAt its core, Bitcoin is a public ledger called the blockchain. Every transaction ever made is recorded in chronological blocks that are linked together cryptographically. No single person or company controls this ledger.\n\nThere will only ever be 21 million BTC. This fixed supply makes it resistant to inflation — unlike traditional currencies that central banks can print without limit.\n\nBitcoin is secured by a global network of computers (miners) who compete to validate transactions. This process, called Proof of Work, requires enormous computing power, making it nearly impossible to alter history.`,
      },
      {
        id: 'ch-1-2',
        title: 'How Transactions Work',
        content: `When you send Bitcoin, you broadcast a signed message to the network saying "I authorize the transfer of X BTC from my address to another." Your private key creates a digital signature that proves you own the funds.\n\nMiners collect pending transactions into a block, solve a computationally hard puzzle (Proof of Work), and add the block to the chain. This takes about 10 minutes on average.\n\nOnce a transaction is confirmed in a block, altering it would require redoing the work for that block and every block after it — making fraud economically unfeasible.\n\nTransaction fees incentivize miners to include your transaction. During congestion, higher fees get you faster confirmation. During quiet periods, fees can be very low.`,
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'Ethereum Explained',
    description: 'From smart contracts to the Merge — everything about the world computer.',
    chapters: [
      {
        id: 'ch-2-1',
        title: 'What is Ethereum?',
        content: `Ethereum launched in 2015, created by Vitalik Buterin and a team of co-founders. While Bitcoin is digital money, Ethereum is a programmable blockchain — a global computer anyone can build on.\n\nThe key innovation is the smart contract: code that runs on the blockchain and executes automatically when conditions are met. No lawyers, no banks, no middlemen. Two parties can transact trustlessly just by interacting with a piece of code.\n\nEther (ETH) is Ethereum's native currency. It powers the network: you pay "gas" fees in ETH to compensate the validators who process your transactions and run the contracts.\n\nThousands of applications — DeFi protocols, NFT marketplaces, DAOs, games — run on Ethereum today. It is the most active smart contract platform in the world by developer count and total value locked.`,
      },
      {
        id: 'ch-2-2',
        title: 'Proof of Stake & The Merge',
        content: `For its first seven years, Ethereum used Proof of Work (PoW) — the same energy-intensive mining mechanism as Bitcoin. In September 2022, Ethereum completed "The Merge," switching to Proof of Stake (PoS).\n\nIn PoS, validators lock up (stake) 32 ETH as collateral. They are randomly selected to propose new blocks and attest to others. If they act dishonestly, they lose part of their stake — a mechanism called slashing.\n\nThe Merge reduced Ethereum's energy consumption by ~99.95%. It also changed ETH's issuance significantly: far less new ETH is created per block, and since EIP-1559, a portion of every gas fee is burned (destroyed), making ETH deflationary during periods of high activity.\n\nStaking ETH earns rewards of roughly 3–5% APR. Liquid staking protocols like Lido allow users to stake any amount and receive a tradeable token in return.`,
      },
    ],
  },
  {
    id: 'mod-3',
    title: 'DeFi Fundamentals',
    description: 'Learn how decentralized finance is rebuilding the financial system.',
    chapters: [
      {
        id: 'ch-3-1',
        title: 'What is DeFi?',
        content: `Decentralized Finance (DeFi) refers to financial services built on public blockchains — primarily Ethereum — that operate through smart contracts instead of banks, brokers, or exchanges.\n\nAny activity you do with a bank (save, borrow, lend, trade) has a DeFi equivalent. The key differences: there is no KYC, no business hours, no middleman taking a cut, and no single point of failure.\n\nDeFi protocols are open-source. Anyone can audit the code, build on top of it, or fork it. The most prominent categories are: DEXs (decentralized exchanges), lending protocols, stablecoins, and yield aggregators.\n\nRisks include smart contract bugs, oracle manipulation, and the volatile nature of collateral. Always research before investing.`,
      },
      {
        id: 'ch-3-2',
        title: 'Liquidity Pools & AMMs',
        content: `Traditional exchanges match buyers and sellers using an order book. Automated Market Makers (AMMs) use a different model: a liquidity pool of two tokens governed by a mathematical formula.\n\nThe most common formula is x * y = k. For a pool of ETH and USDC, the product of their quantities must stay constant. When you buy ETH, you add USDC and remove ETH — the formula automatically adjusts the price.\n\nLiquidity Providers (LPs) deposit equal values of both tokens into the pool and receive LP tokens in return. They earn a fraction of every trade that happens in the pool.\n\nImpermanent loss is the main risk for LPs: if the price ratio of the two assets changes significantly, you may have been better off just holding them. High trading volume can offset this loss through fees.`,
      },
    ],
  },
  {
    id: 'mod-4',
    title: 'Crypto Security',
    description: 'Protect your assets — the most important module you will ever read.',
    chapters: [
      {
        id: 'ch-4-1',
        title: 'Your Keys, Your Coins',
        content: `"Not your keys, not your coins." This phrase sums up one of the most important lessons in crypto. When you keep funds on an exchange, you don't actually own the private keys — the exchange does. If it gets hacked or goes bankrupt (as FTX did in 2022), your funds can vanish.\n\nSelf-custody means holding your own private keys using a personal wallet. Software wallets (MetaMask, Trust Wallet) are convenient but connected to the internet. Hardware wallets (Ledger, Trezor) store keys offline and sign transactions in an isolated chip — far more secure for large holdings.\n\nYour seed phrase is the master backup of your wallet. Write it on paper (or steel), store it somewhere safe, and never type it into any website or app. Legitimate services will never ask for it.\n\nFor large amounts: use a hardware wallet. For daily spending: a small software wallet is fine, like a physical wallet you carry cash in.`,
      },
      {
        id: 'ch-4-2',
        title: 'Common Scams & Red Flags',
        content: `The crypto space attracts scammers because transactions are irreversible. Once you send funds to a scammer, they are gone forever. Knowing the patterns is your best defense.\n\nRug pulls: a team launches a token, hypes it, attracts buyers, then drains the liquidity pool and disappears. Red flag: anonymous team, no audit, locked liquidity for only a short time.\n\nPhishing: fake websites or emails that look identical to real ones. Always double-check the URL. Bookmark the sites you use. Never click wallet-connect links from Discord or Telegram DMs.\n\nPump and dump: coordinated groups buy a low-cap coin, hype it on social media, then sell at the top — leaving latecomers with losses. Red flag: sudden unexplained price spike with aggressive social media push.\n\nFake giveaways: "Send 1 ETH, get 2 back." No legitimate project or person does this. Ever.\n\nGeneral rule: if it sounds too good to be true, it is.`,
      },
    ],
  },
  {
    id: 'mod-5',
    title: 'Reading the Market',
    description: 'Understand market cycles, sentiment, and basic chart concepts.',
    chapters: [
      {
        id: 'ch-5-1',
        title: 'Bull & Bear Markets',
        content: `Crypto markets move in cycles. A bull market is a sustained period of rising prices driven by optimism, new money entering the space, and increasing media coverage. Bitcoin's bull runs in 2013, 2017, and 2020–2021 each saw 10–100x gains from the prior cycle's low.\n\nA bear market is the opposite: prolonged decline, pessimism, and falling volume. Bear markets typically last 12–24 months in crypto and can erase 70–90% of peak prices. They shake out weak hands but are also when informed investors accumulate.\n\nThe Fear & Greed Index measures market sentiment on a 0–100 scale. Extreme fear (0–25) often signals buying opportunities; extreme greed (75–100) often precedes corrections. Buy fear, sell greed — easier said than done, but historically effective.\n\nMarket cycles in crypto are loosely correlated with the Bitcoin halving, which occurs every ~4 years. Each halving reduces new BTC supply, historically triggering a bull run 6–18 months later.`,
      },
      {
        id: 'ch-5-2',
        title: 'Support, Resistance & Volume',
        content: `Technical analysis (TA) is the study of price charts and trading volume to forecast future price movements. It doesn't predict the future with certainty, but it helps you understand the context of where price is and where it might go.\n\nSupport is a price level where buying interest is strong enough to stop or reverse a downtrend. Resistance is the opposite — a level where selling pressure halts upward moves. When a resistance level is broken, it often becomes the new support.\n\nVolume is the number of coins traded in a given period. Price moves on high volume are more significant than the same move on low volume. A breakout above resistance with high volume is a much stronger signal than one on thin volume.\n\nCandlestick charts show four data points per period: open, high, low, close. A green candle means price closed higher than it opened; red means it closed lower. Learning to read candles is the foundation of chart analysis.\n\nRemember: TA is a tool, not a crystal ball. Always combine it with fundamental research and risk management.`,
      },
    ],
  },
];
