import { FC } from 'react';
import { Header } from '../../components/Header';
import { AboutMe } from '../../components/AboutMe';
import { Portfolio } from '../../components/Portfolio';
import { Contacts } from '../../components/Contacts';

export const Main: FC = () => {
  return (
    <>
      <Header />
      <AboutMe />
      <Portfolio />
      <Contacts />
    </>
  );
};
