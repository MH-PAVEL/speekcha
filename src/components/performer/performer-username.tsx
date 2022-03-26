import React from 'react';
// import Link from 'next/link';
import { IPerformer } from 'src/interfaces';
import { Link } from '../../../i18n';

interface P {
  performer: IPerformer;
}

export const PerformerUsername = ({ performer }: P) => (
  <Link
    href={{
      pathname: '/stream',
      query: { performer: JSON.stringify(performer) }
    }}
    as={`/profile/${performer.username}`}
  >
    <a>{performer.username}</a>
  </Link>
);
