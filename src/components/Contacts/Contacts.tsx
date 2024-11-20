import { FC } from 'react';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Button } from '../Button';
import Phone from './Phone.svg?react';
import Telegram from './Telegram.svg?react';
import Mail from './Mail.svg?react';

export const Contacts: FC = () => {
  const contact = (text: string) => (
    <li className={'mb-6 flex w-full items-center gap-4'}>
      <div className={'h-6 w-6 bg-blue'}></div> {text}
    </li>
  );

  return (
    <section
      className={
        'bg-ultra-white-blue mb-0 flex flex-col gap-10 md:mb-11 md:flex-row md:bg-none'
      }
    >
      <div
        className={
          'flex grid-cols-1 grid-rows-7 flex-col gap-3 md:grid md:basis-[760px]'
        }
      >
        <h4 className={'mt-5 text-lg font-bold md:mt-0 md:text-3xl'}>
          Связаться напрямую
        </h4>
        <Input placeholder={'Имя'} />
        <Input placeholder={'E-mail'} />
        <Textarea placeholder={'Ваше сообщение'} className={'row-span-3'} />
        <Button className={'md:justify-self-end'}>Отправить</Button>
      </div>

      <div className={'hidden h-full w-[360px] flex-1 md:block'}>
        <h4 className={'mb-8 text-3xl font-bold '}>Прочие контакты</h4>
        <ul className={'bg-grey1 p-8'}>
          {contact('Контакт 1')}
          {contact('Контакт 1')}
          {contact('Контакт 1')}
          {contact('Контакт 1')}
        </ul>
      </div>

      <div>
        <h6 className={'font-bold text-dark-blue'}>
          Малыгина Наталья Владимировна
        </h6>
        <div className={'mb-5 mt-2 flex gap-2.5'}>
          <Phone />
          <Telegram />
          <Mail />
        </div>
      </div>
    </section>
  );
};
