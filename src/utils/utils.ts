export const isValidUrl = (method: string, url: string) => {
  const baseApiUrl = '/api/users';
  const parseUrl = url.split('/');

  if (
    (['GET', 'POST'].includes(method) && baseApiUrl === url) ||
    (['GET', 'PUT', 'DELETE'].includes(method) &&
      baseApiUrl.startsWith(baseApiUrl) &&
      parseUrl.length === 4 &&
      parseUrl[3])
  ) {
    return true;
  }
  return false;
};
