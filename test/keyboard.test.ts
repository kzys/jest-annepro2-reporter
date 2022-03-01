import { Keyboard } from '../src/keyboard'

test('new', () => {
    expect(() => {
        new Keyboard();
    }).toThrowError();
});
