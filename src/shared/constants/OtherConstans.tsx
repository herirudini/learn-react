export const DEFAULT_SEARCH_KEYWORD = '2024';
const currentYear = new Date().getFullYear();
export const YEARS = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => {
  const year = 1900 + index;
  return {label: year, value: year}
}); // Generate years
export const REGEX = {
	email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
