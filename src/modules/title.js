const title = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Choose what you want to measure';

    case '/measures':
      return 'Your measurements';

    case '/progress':
      return 'Your progress';

    case '/more':
      return 'More';

    default:
      return 'Track it';
  }
};

export default title;
