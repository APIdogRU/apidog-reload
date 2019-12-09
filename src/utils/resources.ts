export const getPublicPath = (path: string) => (process.env.PUBLIC_URL || '.') + '/' + path;
