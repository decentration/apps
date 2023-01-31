// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../../augment-supersig.ts';
import React from 'react';
import { useTranslation } from '@polkadot/app-treasury/translate';
import { CardSummary } from '@polkadot/react-components';
import { FormatBalance } from '@polkadot/react-query';

type SortedAddress = { address: string; isFavorite: boolean };

interface Props {
  // className?: string;
  // balance?: AccountBalance;
  // supersigs?: SupersigsAssociated;
  sigCnt: SortedAddress[] | undefined;
  totalProposals: number;
  totalBalance: string;
}

function Summary ({ sigCnt, totalProposals, totalBalance }: Props) {
  const { t } = useTranslation();

  return (

    <div style={{display: "flex", marginBottom: "30px"}}>
      {/* {balance && ( */}
        {/* <> */}
          {
            sigCnt &&
              <CardSummary label={t<string>('Supersig Collectives')}>
                <p>{sigCnt.length}</p>
              </CardSummary>
          }
          <CardSummary label={t<string>('Proposals')}>
            <p>{totalProposals}</p>
          </CardSummary>
          <CardSummary label={t<string>('Total Funds')}>
            <FormatBalance
              className='result'
              value={totalBalance}
            />
          </CardSummary>
    </div>
  );
}

export default React.memo(Summary);
