export function retry<T>(max: number, action: () => T): T {
  if (max <= 0) throw new Error('argument "max" needs integer.');

  const errors: Error[] = [];
  for (let i = 0; i < max; i++) {
    try {
      return action();
    } catch (error) {
      errors.push(error);
      if (typeof Logger !== 'undefined') Logger.log(JSON.stringify(error));
    }
  }
  throw errors;
}
