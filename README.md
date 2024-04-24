# Sovryn DEX
Decentralized exchange with traditional, concentrated liquidity and Limit Orders out of the box


## Installation

Clone the repository. In the repository home directory run the following commands:

    $ yarn install
    $ npx hardhat compile
    
To verify that the code is functioning run:

    $ npx hardhat test

Test coverage can be run with



## Documentation

Primary docs can be found at [our Gitbook](https://build.sovryn.com/builder-portal/) <!-- @todo: update the link -->

Additional technical documentation can be found

* [Repo Layout](docs/Layout.md): Top-level overview of the Solidity source files in the project.
* [Control Flow](docs/ControlFlow.md): Illustrated flow charts mapping the smart contract logic associated with common SdexSwap operations.
* [Encoding Guide](docs/Encoding.md): Technical specification for clients outlining how to encode arguments to the SdexSwap contract methods that don't use standard Solidity args.

## Risks

Users of the Sovryn DEX protocol should be aware of the implicit risks to the protocol design. Among other major risk sare

* Protocol Risk - Although carefully reviewed the protocol could have an implementation error that leads to loss of funds
* [Governance Risk](./docs/GovernanceRoles.md) - Sovryn governance has fairly extensive powers, and users should fully trust the entities holding governance roles.
* [Token Risk](./docs/TokenModel.md) - SdexSwap expects has fairly stringent conformance requirements to guarantee safe and defined behavior. Users interacting with pools on non-compliant or malicious tokens risk loss of funds.
* [Upgrade Risk](./docs/UpgradeSafety.md) - SdexSwap allows for smart contract code upgrade. Any upgrade represents a risk to the entire protocol and users funds if implemented incorrectly. Users should monitor all proposed upgrades and trust the governance process for approving upgrade proposals.
