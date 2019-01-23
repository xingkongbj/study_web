// 基本类型
let isDone: boolean = false;
let decLiteral: number = 6;
let str: string = 'bob';
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let x: [string, number] = ['string',5];
enum Color { Red, Green = '2', Blue='3' }

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ tar: "red", width: 100 });