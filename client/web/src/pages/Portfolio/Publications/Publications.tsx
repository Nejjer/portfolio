import { FC, useContext } from 'react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { observer } from 'mobx-react';

interface IPublication {
  text: string;
}

const PublicationItem = ({ text }: IPublication) => (
  <li className={'bg-white p-3'}>
    <p>{text}</p>
  </li>
);

// const publicationItems: IPublication[] = [
//   {
//     text: 'Дикий северный олень (Rangifer tarandus L.) Восточного Таймыра: особенности пространственного размещения',
//   },
//   {
//     text: 'Принцип социальной справедливости в использовании ресурсов дикого северного оленя (Rangifer tarandus L.) как основа жизнеобеспечения аборигенного населения Крайнего Севера',
//   },
//   {
//     text: 'Поведенческие характеристики дикого северного оленя (Rangifer tarandus L.) в период охоты в контексте стратегии и механизмов рационального природопользования',
//   },
//   {
//     text: 'Хоросинхронная динамика диких северных оленей (Rangifer tarandus L.) на территории Восточного Таймыра как отклик на внешние вызовы',
//   },
//   {
//     text: 'XIII Международная конференция «Размышления о науке в “темные” времена»',
//   },
// ];

const Publications: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <section className={'mt-20 h-[351px]'}>
      <h4 className={'mb-10 text-3xl font-bold'}>Публикации</h4>
      <ul className={'grid columns-1 gap-0.5 bg-blue'}>
        {mainStore.publications.map(({ title }) => (
          <PublicationItem text={title} />
        ))}
      </ul>
    </section>
  );
};

const connected = observer(Publications);
export { connected as Publications };
