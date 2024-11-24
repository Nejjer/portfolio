import { FC } from 'react';
import { ParticipationInConferences } from './ParticipationInConferences';
import { Publications } from './Publications';
import { Presentations } from './Presentations';

export const Portfolio: FC = () => {
  return (
    <>
      <ParticipationInConferences />
      <Publications />
      <Presentations />
    </>
  );
};
