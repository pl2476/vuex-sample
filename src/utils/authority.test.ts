import { getAuth } from './authority';

describe('getAuth should be strong', () => {
  it('string', () => {
    expect(getAuth('admin')).toEqual(['admin']);
  });
  it('array with double quotes', () => {
    expect(getAuth('"admin"')).toEqual(['admin']);
  });
  it('array with single item', () => {
    expect(getAuth('["admin"]')).toEqual(['admin']);
  });
  it('array with multiple items', () => {
    expect(getAuth('["admin", "guest"]')).toEqual(['admin', 'guest']);
  });
});
