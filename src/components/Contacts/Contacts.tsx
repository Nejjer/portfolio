import { FC } from 'react';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Button } from '../Button';

export const Contacts: FC = () => {
  const contact = (text: string) => (
    <li className={'mb-6 flex w-full items-center gap-4'}>
      <div className={'bg-blue h-6 w-6'}></div> {text}
    </li>
  );

  return (
    <section className={'mb-11 flex gap-10'}>
      <div className={'grid basis-[760px] grid-cols-1 grid-rows-7 gap-3'}>
        <h4 className={'text-3xl font-bold'}>Связаться напрямую</h4>
        <Input />
        <Input />
        <Textarea className={'row-span-3'} />
        <Button className={'justify-self-end'}>Отправить</Button>
      </div>

      <div className={'h-full w-[360px] flex-1'}>
        <h4 className={'mb-8 text-3xl font-bold '}>Прочие контакты</h4>
        <ul className={'bg-grey1 p-8'}>
          {contact('Контакт 1')}
          {contact('Контакт 1')}
          {contact('Контакт 1')}
          {contact('Контакт 1')}
        </ul>
      </div>
    </section>
  );
};
