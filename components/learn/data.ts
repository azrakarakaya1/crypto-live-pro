import type { GlossaryTerm, LearningModule, QuizQuestion } from '@/types';

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
        quiz: {
          id: 'q-ch-1-1',
          question: 'Who created Bitcoin?',
          options: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Charlie Lee', 'Nick Szabo'],
          correctIndex: 1,
          explanation:
            'Bitcoin was created in 2009 by the pseudonymous Satoshi Nakamoto, whose real identity remains unknown.',
        },
      },
      {
        id: 'ch-1-2',
        title: 'How Transactions Work',
        content: `When you send Bitcoin, you broadcast a signed message to the network saying "I authorize the transfer of X BTC from my address to another." Your private key creates a digital signature that proves you own the funds.\n\nMiners collect pending transactions into a block, solve a computationally hard puzzle (Proof of Work), and add the block to the chain. This takes about 10 minutes on average.\n\nOnce a transaction is confirmed in a block, altering it would require redoing the work for that block and every block after it — making fraud economically unfeasible.\n\nTransaction fees incentivize miners to include your transaction. During congestion, higher fees get you faster confirmation. During quiet periods, fees can be very low.`,
        quiz: {
          id: 'q-ch-1-2',
          question: 'What is the average time for a Bitcoin block to be mined?',
          options: ['1 minute', '5 minutes', '10 minutes', '30 minutes'],
          correctIndex: 2,
          explanation:
            'Bitcoin targets a 10-minute block time. The network adjusts difficulty every 2016 blocks to maintain this target.',
        },
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
        quiz: {
          id: 'q-ch-2-1',
          question: 'Who created Ethereum?',
          options: ['Satoshi Nakamoto', 'Charlie Lee', 'Vitalik Buterin', 'Gavin Wood'],
          correctIndex: 2,
          explanation:
            'Ethereum was proposed by Vitalik Buterin in 2013 and launched in 2015 with a team of co-founders including Gavin Wood, Joseph Lubin, and others.',
        },
      },
      {
        id: 'ch-2-2',
        title: 'Proof of Stake & The Merge',
        content: `For its first seven years, Ethereum used Proof of Work (PoW) — the same energy-intensive mining mechanism as Bitcoin. In September 2022, Ethereum completed "The Merge," switching to Proof of Stake (PoS).\n\nIn PoS, validators lock up (stake) 32 ETH as collateral. They are randomly selected to propose new blocks and attest to others. If they act dishonestly, they lose part of their stake — a mechanism called slashing.\n\nThe Merge reduced Ethereum's energy consumption by ~99.95%. It also changed ETH's issuance significantly: far less new ETH is created per block, and since EIP-1559, a portion of every gas fee is burned (destroyed), making ETH deflationary during periods of high activity.\n\nStaking ETH earns rewards of roughly 3–5% APR. Liquid staking protocols like Lido allow users to stake any amount and receive a tradeable token in return.`,
        quiz: {
          id: 'q-ch-2-2',
          question: 'What did "The Merge" change about Ethereum?',
          options: [
            'It increased the block size',
            'It switched from Proof of Work to Proof of Stake',
            'It merged Ethereum and Bitcoin',
            'It removed gas fees',
          ],
          correctIndex: 1,
          explanation:
            'The Merge (Sept 2022) transitioned Ethereum from energy-intensive Proof of Work mining to Proof of Stake validation, cutting energy use by ~99.95%.',
        },
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
        quiz: {
          id: 'q-ch-3-1',
          question: 'Which blockchain hosts the majority of DeFi activity?',
          options: ['Bitcoin', 'Solana', 'Ethereum', 'Cardano'],
          correctIndex: 2,
          explanation:
            'Ethereum pioneered smart contracts and remains the dominant platform for DeFi, though competitors are growing.',
        },
      },
      {
        id: 'ch-3-2',
        title: 'Liquidity Pools & AMMs',
        content: `Traditional exchanges match buyers and sellers using an order book. Automated Market Makers (AMMs) use a different model: a liquidity pool of two tokens governed by a mathematical formula.\n\nThe most common formula is x * y = k. For a pool of ETH and USDC, the product of their quantities must stay constant. When you buy ETH, you add USDC and remove ETH — the formula automatically adjusts the price.\n\nLiquidity Providers (LPs) deposit equal values of both tokens into the pool and receive LP tokens in return. They earn a fraction of every trade that happens in the pool.\n\nImpermanent loss is the main risk for LPs: if the price ratio of the two assets changes significantly, you may have been better off just holding them. High trading volume can offset this loss through fees.`,
        quiz: {
          id: 'q-ch-3-2',
          question: 'What does AMM stand for?',
          options: [
            'Automated Money Manager',
            'Automated Market Maker',
            'Algorithmic Mint Mechanism',
            'Asset Management Module',
          ],
          correctIndex: 1,
          explanation:
            'AMM stands for Automated Market Maker — a smart contract that prices assets using a mathematical formula instead of an order book.',
        },
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
        quiz: {
          id: 'q-ch-4-1',
          question: 'What is a hardware wallet?',
          options: [
            'A wallet app on your phone',
            'A device that stores private keys offline',
            'A savings account at a crypto bank',
            'A multi-sig smart contract',
          ],
          correctIndex: 1,
          explanation:
            'Hardware wallets store private keys in an offline chip, protecting them from internet-based attacks even when connected to a compromised computer.',
        },
      },
      {
        id: 'ch-4-2',
        title: 'Common Scams & Red Flags',
        content: `The crypto space attracts scammers because transactions are irreversible. Once you send funds to a scammer, they are gone forever. Knowing the patterns is your best defense.\n\nRug pulls: a team launches a token, hypes it, attracts buyers, then drains the liquidity pool and disappears. Red flag: anonymous team, no audit, locked liquidity for only a short time.\n\nPhishing: fake websites or emails that look identical to real ones. Always double-check the URL. Bookmark the sites you use. Never click wallet-connect links from Discord or Telegram DMs.\n\nPump and dump: coordinated groups buy a low-cap coin, hype it on social media, then sell at the top — leaving latecomers with losses. Red flag: sudden unexplained price spike with aggressive social media push.\n\nFake giveaways: "Send 1 ETH, get 2 back." No legitimate project or person does this. Ever. Elon Musk is not giving away Bitcoin.\n\nGeneral rule: if it sounds too good to be true, it is.`,
        quiz: {
          id: 'q-ch-4-2',
          question: 'What is a "rug pull"?',
          options: [
            'A market correction of over 20%',
            'When developers drain a project\'s liquidity and disappear',
            'A type of hardware wallet attack',
            'When a coin is delisted from an exchange',
          ],
          correctIndex: 1,
          explanation:
            'In a rug pull, the team behind a project suddenly withdraws all funds from the liquidity pool and abandons the project, leaving investors with worthless tokens.',
        },
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
        quiz: {
          id: 'q-ch-5-1',
          question: 'What does a Fear & Greed Index score near 0 typically indicate?',
          options: [
            'Extreme greed — time to sell',
            'Extreme fear — potential buying opportunity',
            'Neutral market conditions',
            'A market crash is guaranteed',
          ],
          correctIndex: 1,
          explanation:
            'Scores near 0 represent extreme fear. Contrarian investors often view this as a buying signal, as markets tend to be oversold during periods of maximum pessimism.',
        },
      },
      {
        id: 'ch-5-2',
        title: 'Support, Resistance & Volume',
        content: `Technical analysis (TA) is the study of price charts and trading volume to forecast future price movements. It doesn't predict the future with certainty, but it helps you understand the context of where price is and where it might go.\n\nSupport is a price level where buying interest is strong enough to stop or reverse a downtrend. Resistance is the opposite — a level where selling pressure halts upward moves. When a resistance level is broken, it often becomes the new support.\n\nVolume is the number of coins traded in a given period. Price moves on high volume are more significant than the same move on low volume. A breakout above resistance with high volume is a much stronger signal than one on thin volume.\n\nCandlestick charts show four data points per period: open, high, low, close. A green candle means price closed higher than it opened; red means it closed lower. Learning to read candles is the foundation of chart analysis.\n\nRemember: TA is a tool, not a crystal ball. Always combine it with fundamental research and risk management.`,
        quiz: {
          id: 'q-ch-5-2',
          question: 'What happens when a resistance level is decisively broken?',
          options: [
            'It disappears from the chart permanently',
            'It often becomes the new support level',
            'The price always doubles',
            'It signals the end of the bull market',
          ],
          correctIndex: 1,
          explanation:
            'In technical analysis, a broken resistance level typically flips to become support. Traders watch these flipped levels closely for re-test entries.',
        },
      },
    ],
  },
];

export const DAILY_QUIZ: QuizQuestion[] = [
  {
    id: 'dq-1',
    question: 'What is the maximum supply of Bitcoin?',
    options: ['18 million', '21 million', '100 million', 'Unlimited'],
    correctIndex: 1,
    explanation:
      'Bitcoin has a hard cap of 21 million coins, enforced by its protocol. This scarcity is a core part of its value proposition.',
  },
  {
    id: 'dq-2',
    question: 'What does "DYOR" stand for in crypto culture?',
    options: [
      'Do Your Own Research',
      'Define Your Own Risk',
      'Diversify Your Own Returns',
      'Deploy Your Own Rewards',
    ],
    correctIndex: 0,
    explanation:
      'DYOR — Do Your Own Research — is a reminder to verify information independently before making any investment decisions.',
  },
  {
    id: 'dq-3',
    question: 'Which type of wallet keeps private keys offline?',
    options: ['Hot wallet', 'Exchange wallet', 'Cold wallet', 'Browser wallet'],
    correctIndex: 2,
    explanation:
      'Cold wallets (hardware wallets, paper wallets) store private keys offline, making them immune to online attacks.',
  },
  {
    id: 'dq-4',
    question: 'What is a "gas fee" on Ethereum?',
    options: [
      'A fee for using a VPN',
      'The cost to compensate miners/validators for processing a transaction',
      'A charge for converting ETH to USD',
      'A monthly subscription fee',
    ],
    correctIndex: 1,
    explanation:
      'Gas fees compensate Ethereum validators for the computational work required to process and secure transactions on the network.',
  },
  {
    id: 'dq-5',
    question: 'What happens during a "halving" event in Bitcoin?',
    options: [
      'The price of Bitcoin is cut in half',
      'Half of all Bitcoin is burned',
      'The block reward for miners is cut in half',
      'Transaction fees are doubled',
    ],
    correctIndex: 2,
    explanation:
      'Every ~4 years (210,000 blocks), the Bitcoin block reward halves. This reduces new supply issuance and has historically preceded major bull markets.',
  },
];
