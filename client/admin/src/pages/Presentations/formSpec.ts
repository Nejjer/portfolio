import { Spec, SpecTypes } from '@gravity-ui/dynamic-forms';

export type IMySpec = Spec & {
  name: string;
};

export const specs: IMySpec[] = [
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'Название',
      placeholder: 'Название презентации',
    },
    name: 'title',
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'textarea',
      layout: 'row',
      layoutTitle: 'Описание',
      placeholder: 'Описание',
    },
    name: 'description',
  },
];
