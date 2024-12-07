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
      layoutTitle: 'ФИО',
      placeholder: 'ФИО',
    },
    name: 'name',
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'textarea',
      layout: 'row',
      layoutTitle: 'Короткая информация',
      placeholder: 'Короткая информация',
    },
    name: 'shortInfo',
  },
  {
    type: SpecTypes.String,
    viewSpec: {
      type: 'base',
      layout: 'row',
      layoutTitle: 'Слоган',
      placeholder: 'Слоган',
    },
    name: 'slogan',
  },
  {
    type: SpecTypes.Array,
    items: {
      type: SpecTypes.String,
      viewSpec: {
        type: 'base',
        layout: 'row',
        layoutTitle: 'Заслуга',
      },
    },
    viewSpec: {
      type: 'base',
      layout: 'accordeon',
      layoutTitle: 'Заслуги',
      layoutOpen: true,
      itemLabel: 'Добавить',
    },
    name: 'credits',
  },
  {
    type: SpecTypes.Array,
    items: {
      type: SpecTypes.Object,
      properties: {
        name: {
          type: SpecTypes.String,
          viewSpec: {
            type: 'base',
            layout: 'row',
            placeholder: 'Например, почта',
            layoutTitle: 'Тип',
          },
        },
        value: {
          type: SpecTypes.String,
          viewSpec: {
            type: 'base',
            layout: 'row',
            placeholder: 'Например, example@example.com',
            layoutTitle: 'Значение',
          },
        },
      },
      viewSpec: {
        type: 'base',
        layout: 'row',
        layoutTitle: 'Контакт',
      },
    },
    viewSpec: {
      type: 'base',
      layout: 'accordeon',
      layoutTitle: 'Контакты',
      layoutOpen: true,
      itemLabel: 'Добавить контакт',
    },
    name: 'contacts',
  },
];
