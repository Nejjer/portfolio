import { ReactNode, useState } from 'react';

interface Props<T> {
  renderItem: (item: T, index: number) => ReactNode;
  items: T[];
  countPerPage: number;
  className?: string;
}

export const Pagination = <T,>({
  renderItem,
  items,
  countPerPage,

  className,
}: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(items.length / countPerPage);

  // Определяем начальный и конечный индексы для текущей страницы
  const startIndex = (currentPage - 1) * countPerPage;
  const endIndex = startIndex + countPerPage;

  // Получаем элементы для текущей страницы
  const itemsToDisplay = items.slice(startIndex, endIndex);

  // Обработчик для смены страницы
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={'flex flex-col justify-between ' + className}>
      {/* Рендер элементов текущей страницы */}
      <ul className={'grid columns-1 gap-0.5  bg-ultra-white-blue'}>
        {itemsToDisplay.map((item, index) => renderItem(item, index))}
      </ul>
      {/* Кнопки пагинации */}
      <div className='mt-4 flex justify-center space-x-2'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`flex h-6 w-6 items-center justify-center text-xs ${
              page === currentPage
                ? 'bg-blue2 text-white'
                : 'hover:bg-blue2 bg-grey5'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};
