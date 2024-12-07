import { useNavigate } from 'react-router-dom';

export const useBreadcrumbs = (
  breadcrumbs: [
    {
      text: string;
      action: () => void;
    },
  ],
) => {
  const navigate = useNavigate();
  return [
    {
      text: 'Главная',
      action: () => navigate('/'),
    },
    {
      text: 'Портфолио',
      action: () => navigate(-1),
    },
    ...breadcrumbs,
  ];
};
