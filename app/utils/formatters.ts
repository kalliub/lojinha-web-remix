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

/**
 * Slice the string if it's length is bigger than `size` and then add ellipsis.
 *
 * @param text
 * The text to be sliced.
 *
 * @param size
 * The limit length of `text`.
 * If it doesn't reach this length, `text` will remain unchanged.
 *
 * @Returns
 * Sliced (or not) string.
 *
 * @Example
 * `sliceStringBiggerThan("endeavor", 10)`
 *
 *  Returns: `"pneumon..."`
 */
export const sliceStringBiggerThan = (
  text: string | undefined,
  size: number | undefined
): string => {
  if (!text) {
    return "";
  }

  if (size && text.length > size) return `${text.slice(0, size - 3).trim()}...`;

  return text;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
