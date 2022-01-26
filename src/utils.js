export const roundOverThousand = number => {
  if (number >= 1000) {
    return `${Math.round(number / 100) / 10}k`;
  }
  return number + '';
};

export const getSortDescription = sort => {
  switch (sort) {
    case 'latest':
      return 'Latest repositories';
    case 'highest':
      return 'Highest rated repositories';
    case 'lowest':
      return 'Lowest rated repositories';
    default:
      throw new Error('Invalid sort', sort);
  }
};

export const getSortSettings = sort => {
  switch (sort) {
    case 'latest':
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    case 'highest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case 'lowest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    default:
      throw new Error('Invalid sort', sort);
  }
};
