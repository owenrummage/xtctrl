export async function convert_to_14_bit_integer(i: number) {
    let output = '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const a of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]) {
        const x = Math.floor(i % 2);
        i = i / 2;
        output = x.toString() + output;
    }
    const outputa = '0b' + output.slice(0, 7);
    const outputb = '0b' + output.slice(7, 14);
    return [Number(outputa), Number(outputb)];
}

// export function getLastFourBinaryDigits(i: number){
// 		const d = Math.floor(i % 2);
// 		i = i / 2;

// 		const c = Math.floor(i % 2);
// 		i = i / 2;

// 		const b = Math.floor(i % 2);
// 		i = i / 2;

// 		const a = Math.floor(i % 2);
// 		i = i / 2;

// 		return `${a}+b+c+d`
// }

export function getLastFourBitsFromNumber(num: number): string {
    const binary = num.toString(2);
    if (binary.length < 4) {
        return binary.padStart(4, '0');
    }
    return binary.slice(-4);
}

export function stringToCharArray(input: string) {
    return input.split('').map((char) => char.charCodeAt(0) || 0x3f); // 0x3F as fallback for unknown chars
}

export function padString(str: string, char = ' ', direction = 'end') {
    if (str.length >= 7) {
        return str;
    }

    const paddingLength = 7 - str.length;
    const padding = char.repeat(paddingLength);

    if (direction === 'start') {
        return padding + str;
    } else {
        return str + padding;
    }
}
