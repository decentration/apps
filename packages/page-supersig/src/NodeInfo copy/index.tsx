// Copyright 2017-2022 @polkadot/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Info, SupersigInfo, PalletSupersigPreimageCall } from './types';

import React, { useEffect, useState } from 'react';

import { ApiPromise } from '@polkadot/api';
import { useApi, useCall } from '@polkadot/react-hooks';
import type { UserSupersig } from 'supersig-types/dist/interfaces'

// import Extrinsics from '../BlockInfo/Extrinsics';
import { useTranslation } from '../translate';
import Peers from './Peers';
import Summary from './Summary';

const POLL_TIMEOUT = 9900;

async function retrieveInfo (api: ApiPromise): Promise<Partial<PalletSupersigPreimageCall>> {

  
  try {
    const [callno, supersigno] = await Promise.all([
      

      // const account = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      // const bob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
      // api.derive.chain.bestNumber(),
      // api.rpc.system.health().catch(() => null),
      // api.rpc.system.peers().catch(() => null),
      api.query.supersig.calls(callno, supersigno).catch(() => null),

    ]);

    return { calldata };
  } catch (error) {
    return {};
  }
}

function SupersigInfo (): React.ReactElement {
  const { api } = useApi();
   const getSupersig = useCall<UserSupersig[]>(api.rpc.superSig.getUserSupersigs);

  const { t } = useTranslation();
  // const { api } = useApi();
  const [info, setInfo] = useState<Partial<Info>>({});
  const [nextRefresh, setNextRefresh] = useState(() => Date.now());

  useEffect((): () => void => {
    const _getStatus = (): void => {
      retrieveInfo(api).then(setInfo).catch(console.error);
    };

    _getStatus();

    const timerId = window.setInterval((): void => {
      setNextRefresh(Date.now() + POLL_TIMEOUT);
      _getStatus();
    }, POLL_TIMEOUT);

    return (): void => {
      window.clearInterval(timerId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Summary
        info={info}
        nextRefresh={nextRefresh}
      />
      <Peers peers={info.peers} />
      <Extrinsics
        blockNumber={info.blockNumber}
        label={t<string>('pending extrinsics')}
        value={info.extrinsics}
        withLink
      />
    </>
  );
}

export default React.memo(SupersigInfo);
