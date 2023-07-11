import { describe, expect, test } from 'vitest';
import { parseAsync } from '../methods';
import { voidAsync } from './voidAsync';

describe('voidAsync', () => {
  test('should pass only void', async () => {
    const schema = voidAsync();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(await parseAsync(schema, (() => {})())).toBeUndefined();
    expect(await parseAsync(schema, undefined)).toBeUndefined();
    await expect(parseAsync(schema, 123)).rejects.toThrowError();
    await expect(parseAsync(schema, 'test')).rejects.toThrowError();
    await expect(parseAsync(schema, false)).rejects.toThrowError();
    await expect(parseAsync(schema, null)).rejects.toThrowError();
    await expect(parseAsync(schema, {})).rejects.toThrowError();
  });

  test('should throw custom error', async () => {
    const error = 'Value is not void!';
    await expect(parseAsync(voidAsync(error), 123)).rejects.toThrowError(error);
  });
});
