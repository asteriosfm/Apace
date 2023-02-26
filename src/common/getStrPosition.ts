
type Char = string;
type UnexpectedChars = string[];


export const getStrPosition = (char: Char, unexpectedChars: UnexpectedChars) => {
    return (str) => {
        let start = 0;
        let end = 0;
        let charIndex = str.indexOf(char);
        if (charIndex === -1) {
            return {
                start,
                end,
            }
        }
        for (let i = charIndex; i++;) {
            if (unexpectedChars.includes(str[i])) {
                end = i;
                break;
            }
        }
        for (let j = charIndex; j--;) {
            if (unexpectedChars.includes(str[j])) {
                start = j + 1;
                break;
            }
        }
        return {
            start,
            end,
        }
    }
}
