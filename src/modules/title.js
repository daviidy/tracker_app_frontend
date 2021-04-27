const title = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Choose what you want to measure';

    case '/measures':
      return 'Choose a habit to see the measurements';

    case '/progress':
      return 'Select a habit to see your progress';

    case '/more':
      return 'More';

    default:
      return 'Track it';
  }
};

export default title;
