const annemone = require('annemone');

const keymap = [
    ' 1234567890-= ',
    ' qwertyuiop{} ',
    " asdfghjkl;' ",
    ' zxcvbnm,./ ',
]

export enum Key {
    Black,
    Green,
    Red,
}

export class Keyboard {
    kb: any
    readonly keyCount: number

    constructor() {
        this.kb = new annemone.LEDController();
        let c = 0;
        keymap.forEach(row => {
            for (let i = 0; i < row.length; i++) {
                if (row.charAt(i) != ' ') {
                    c++;
                }
            }
        })
        this.keyCount = c;
    }

    forEach(f: (s: string, x: number, y: number) => void) {
        keymap.forEach((s, y) => {
            for (let x = 0; x < s.length; x++) {
                f(s.charAt(x), x, y)
            }
        })
    }

    singleColor(color: Key) {
        let table: Array<Array<Key>> = [];

        keymap.forEach(s => {
            let row: Array<Key> = []
            for (let i = 0; i < s.length; i++) {
                if (s.charAt(i) == ' ') {
                    row.push(Key.Black)
                } else {
                    row.push(color)
                }
            }
            table.push(row)
        })
        this.multiColor(table)
    }

    multiColor(src: Array<Array<Key>>) {
        let dest: Array<Array<Array<number>>> = [];
        src.forEach(s => {
            let d: Array<Array<number>> = []
            for (let i = 0; i < s.length; i++) {
                if (s[i] == Key.Green) {
                    d.push([0, 255, 0])
                } else if (s[i] == Key.Red) {
                    d.push([255, 0, 0])
                } else {
                    d.push([0, 0, 0])
                }
            }
            dest.push(d)
        })
        try {
            this.kb.setMultiColorLed(dest);
        } catch (e) {
            console.log(e);
        }
    }
}