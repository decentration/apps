// Copyright 2017-2022 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line header/header
import type { TFunction } from 'i18next';
import type { TabItem } from '@polkadot/react-components/Tabs/types';
import type { DecodedExtrinsic } from '../../page-extrinsics/src/types';

import React, { useRef, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { HelpOverlay, Tabs } from '@polkadot/react-components';

import basicMd from './md/basic.md';
import Contacts from './Supersig/Dashboard';
import { Decoder, Submission } from './SupersigDecoder';
import { useTranslation } from './translate';

export { default as useCounter } from './useCounter';

interface Props {
  basePath: string;
}

function createPathRef (basePath: string): Record<string, string | string[]> {
  return {
    create: [
      `${basePath}/create/:encoded`,
      `${basePath}/create`,
      `${basePath}`
    ],
    decode: [
      `${basePath}/decode/:encoded`,
      `${basePath}/decode`
    ]
  };
}

function createItemsRef (t: TFunction): TabItem[] {
  return [
    {
      hasParams: true,
      name: 'create',
      text: t<string>('Create/Approve')
    },
    {
      hasParams: true,
      name: 'decode',
      text: t<string>('Decode')
    },
    {
      isRoot: true,
      name: 'dashboard',
      text: t<string>('Dashboard')
    }
  ];
}

function SupersigApp ({ basePath }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [decoded, setDecoded] = useState<DecodedExtrinsic | null>(null);
  const itemsRef = useRef(createItemsRef(t));
  const pathRef = useRef(createPathRef(basePath));

  return (
    <main className='supersig--App'>
      <HelpOverlay md={basicMd as string} />
      <Tabs
        basePath={basePath}
        items={itemsRef.current}
      />
      <Switch>
        <Route
          exact
          path={basePath}
        >
          <Redirect to={`${basePath}/dashboard`} />
        </Route>
        <Route path={`${basePath}/dashboard`}>
          <Contacts basePath={basePath} />
        </Route>
        <Route path={pathRef.current.decode}>
          <Decoder
            defaultValue={decoded && decoded.hex}
            setLast={setDecoded}
          />
        </Route>
        <Route path={pathRef.current.create}>
          <Submission defaultValue={decoded} />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(SupersigApp);
