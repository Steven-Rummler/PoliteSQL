export function tokenize(input: string): string[] {
  const tokens = [];
  let currentToken = '';
  let currentQuote: '\'' | '"' | "`" | null = null;

  for (let i = 0; i < input.length; i++) {
    const thisCharacter = input[i];
    if (thisCharacter === undefined) throw new Error('Unexpected end of query while tokenizing.');
    if (currentQuote === null) {
      if (spaceCharacters.includes(thisCharacter)) {
        if (currentToken.length === 0) continue;
        tokens.push(currentToken);
        currentToken = '';
      } else if (quoteCharacters.includes(thisCharacter)) {
        currentQuote = thisCharacter as '\'' | '"' | "`";
        currentToken += thisCharacter;
      } else if (commaCharacters.includes(thisCharacter) || mathCharacters.includes(thisCharacter) || braceCharacters.includes(thisCharacter)) {
        if (currentToken.length > 0) tokens.push(currentToken);
        tokens.push(thisCharacter);
        currentToken = '';
      } else currentToken += thisCharacter;
    } else {
      if (thisCharacter === currentQuote) {
        currentToken += thisCharacter;
        tokens.push(currentToken);
        currentToken = '';
        currentQuote = null;
      } else currentToken += thisCharacter;
    }
  }
  tokens.push(currentToken);

  return tokens;
}

const spaceCharacters = [' ', '\t', '\n', '\r'];
const commaCharacters = [','];
const quoteCharacters = ['\'', '"', '`'];
const mathCharacters = ['+', '-', '*', '/', '%', '=', '<', '>'];
const braceCharacters = ['(', ')', '[', ']', '{', '}'];