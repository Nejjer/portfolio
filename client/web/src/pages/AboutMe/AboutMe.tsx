import { FC } from 'react';
import { Header } from './Header';
import { WorkExperience } from './WorkExperience';
import { Education } from './Education';

export const AboutMe: FC = () => {
  return (
    <>
      <Header />
      <Education />
      <WorkExperience />
    </>
  );
};
