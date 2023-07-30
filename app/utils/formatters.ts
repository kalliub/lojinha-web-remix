/**
 * Formats the given page title with the project's default.
 * @param page The custom part of the title.
 * @returns A string with the `page` and the project name.
 * @Example `Login | AppName`
 */
export const pageTitle = (page?: string): string => {
  const projectName = ENV.APP_NAME;
  if (page) return `${page} | ${projectName}`;
  return projectName;
};
