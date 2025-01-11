import { FC } from 'react';
import { Header } from '../../components/Header';
import { AboutMe } from '../../components/AboutMe';
import { Portfolio } from '../../components/Portfolio';
import { Contacts } from '../../components/Contacts';
import { ParticipationInConferences } from '../Portfolio/ParticipationInConferences';
import { Publications } from '../Portfolio/Publications';
import { Presentations } from '../Portfolio/Presentations';
import { Education } from '../AboutMe/Education';
import { WorkExperience } from '../AboutMe/WorkExperience';

export const AutoSave: FC = () => {
  return (
    <>
      <Header />
      <AboutMe />
      <Portfolio />
      <Contacts />
      <ParticipationInConferences hideNav />
      <Publications />
      <Presentations />
      <Education />
      <WorkExperience />
    </>
  );
};
