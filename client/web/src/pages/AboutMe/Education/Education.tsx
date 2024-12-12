import { FC, useContext } from 'react';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { observer } from 'mobx-react';

const EducationItem: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <li>
    <h5 className={'text-lg font-bold'}>{title}</h5>
    <p>{description}</p>
  </li>
);

const Education: FC = () => {
  const {
    appStore: { mainStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <section className={'mb-28'}>
      <h4 className={'mb-6 text-3xl font-bold'}>Образование</h4>
      <ul className={'bg-grey5 p-3 md:w-1/2'}>
        {mainStore.educations
          .slice()
          .sort((a, b) => (a.startYear < b.startYear ? -1 : 1))
          .map((edu, index) => (
            <>
              <EducationItem
                key={edu.id}
                title={`${edu.name} (${edu.degree})`}
                description={`${edu.institution}, ${edu.startYear}-${edu.endYear}`}
              />
              {index !== mainStore.educations.length - 1 && (
                <div className={'bg-grey2 mb-1 mt-2 h-0.5 w-full'}></div>
              )}
            </>
          ))}
      </ul>
    </section>
  );
};

const connected = observer(Education);
export { connected as Education };
