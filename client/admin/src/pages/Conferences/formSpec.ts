import { Spec, SpecTypes } from '@gravity-ui/dynamic-forms';

export type IMySpec = Spec & {
  name: string;
};

export const specs: IMySpec[] = [
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'textarea',
      layout: 'row',
      layoutTitle: 'Название',
      placeholder: 'Название конференции',
    },
    name: 'name',
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'Дата проведения',
      placeholder: 'Дата проведения',
    },
    name: 'date',
  },
];
