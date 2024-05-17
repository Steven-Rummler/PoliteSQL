import { braces, commas, quotes, spaces, symbols } from "./data";

export function tokenize(input: string): string[] {
  const tokens = [];
  let currentToken = '';
  let currentQuote: '\'' | '"' | "`" | null = null;

  for (let i = 0; i < input.length; i++) {
    const thisCharacter = input[i];
    if (thisCharacter === undefined) throw new Error('Unexpected end of query while tokenizing.');
    if (currentQuote === null) {
      if (spaces.includes(thisCharacter)) {
        if (currentToken.length === 0) continue;
        tokens.push(currentToken);
        currentToken = '';
      } else if (quotes.includes(thisCharacter)) {
        currentQuote = thisCharacter as '\'' | '"' | "`";
        currentToken += thisCharacter;
      } else if (commas.includes(thisCharacter) || symbols.includes(thisCharacter) || braces.includes(thisCharacter)) {
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