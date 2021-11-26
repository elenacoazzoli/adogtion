export const getAgeRangeByYears = (years: number) => {
  if (years > 0 && years < 3) {
    return 'Puppy';
  } else if (years > 2 && years < 6) {
    return 'Young';
  } else if (years > 5 && years < 11) {
    return 'Adult';
  } else {
    return 'Senior';
  }
};

export const getYearsByAgeRange = (age: string) => {
  switch (age) {
    case 'puppy':
      return [1, 2];
    case 'young':
      return [3, 4, 5];
    case 'adult':
      return [6, 7, 8, 9, 10];
    case 'senior':
      return [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  }
};

export const getSizeByKgs = (kg: number) => {
  if (kg > 0 && kg < 11) {
    return 'small';
  } else if (kg > 10 && kg < 31) {
    return 'medium';
  } else if (kg > 30) {
    return 'large';
  } else {
    return null;
  }
};

// export const getKgsbySize = (size: string) => {
//   switch (size) {
//     case 'small':
//       return [1, 2];
//     case 'medium':
//       return [3, 4, 5];
//     case 'large':
//     default:
//       return [6, 7, 8, 9, 10];
//   }
// };
