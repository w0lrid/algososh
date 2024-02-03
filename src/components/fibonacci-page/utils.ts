export const generateFibonacciSequence = (n: number): number[] => {
  const fibonacciArray: number[] = [1, 1];

  for (let i = 2; i <= n; i++) {
    fibonacciArray[i] = fibonacciArray[i - 1] + fibonacciArray[i - 2];
  }

  return fibonacciArray;
};
