import { SpecTypes } from '@gravity-ui/dynamic-forms';
import { IMySpec } from '../Portfolio/formSpec.ts';

export const workExpSpec: IMySpec[] = [
  {
    type: SpecTypes.Array,
    items: {
      type: SpecTypes.Object,
      properties: {
        description: {
          type: SpecTypes.String,
          viewSpec: {
            type: 'base',
            layout: 'row',
            placeholder: 'Например, почта',
            layoutTitle: 'Тип',
          },
        },
        startDate: {
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
