// import { ApiPromise } from '@polkadot/api';
import { superSigRpc } from './definitions';

declare module '@polkadot/api/types' {
  interface AugmentedRpc {
    superSig: typeof superSigRpc;
  }
}

declare module '@polkadot/api/types' {
  interface LookupSource {
    superSig: typeof superSigRpc;
  }
}

// ApiPromise.registerTypes({
//   rpc: {
//     superSig: superSigRpc,
//   },
// });
