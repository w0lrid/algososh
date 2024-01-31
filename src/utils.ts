export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const swap = (arr: string[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
