import { retry } from '../src/util';

test('retry', () => {
  try {
    retry(3, () => {
      throw new Error();
    });
  } catch (error) {
    if (error instanceof Array) {
      expect(error.length).toBe(3);
    } else {
      throw error;
    }
  }
});
