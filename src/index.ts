import { AggregatedResult, Context, Reporter, ReporterOnStartOptions, Test, TestResult } from '@jest/reporters'
import { Keyboard, Key } from './keyboard'

export default class AnnePro2Reporter implements Reporter {
    kb: Keyboard;
    result: Array<boolean>

    constructor() {
        this.kb = new Keyboard();
        this.result = []
    }

    onTestStart(test: Test) {
    }

    onTestResult(test: Test, tr: TestResult, ar: AggregatedResult) {
        this.result.push(tr.numPassingTests > 0 && tr.numFailingTests == 0);
        if (this.result.length >= this.kb.keyCount) {
            this.result.splice(0, 10)
        }

        let table: Array<Array<Key>> = [];

        let index = 0;
        let prevY = 0;
        let row: Array<Key> = []
        this.kb.forEach((c, x, y) => {
            if (y != prevY) {
                table.push(row)
                row = []
            }

            if (c == ' ') {
                row.push(Key.Black)
            } else if (index < this.result.length) {
                row.push(this.result[index] ? Key.Green : Key.Red)
                index++;
            } else {
                row.push(Key.Black)
            }
        })

        this.kb.multiColor(table);
    }

    onRunStart(ar: AggregatedResult, options: ReporterOnStartOptions) {
    }

    onRunComplete(contexts: Set<Context>, ar: AggregatedResult) {
        let color = ar.numFailedTestSuites == 0 ? Key.Green : Key.Red;
        this.kb.singleColor(color)
    }

    getLastError() {
    }
}
