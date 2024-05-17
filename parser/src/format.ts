import { commas, keywords, majorKeywords } from './data';

export function format(tokens: string[]): string {
  let formatted = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const lowercaseToken = token.toLowerCase();
    const tokenToAdd = keywords.includes(lowercaseToken) ? lowercaseToken : token;

    const firstToken = i === 0;
    const commaToken = commas.includes(token);
    if (firstToken || commaToken) formatted += tokenToAdd;
    else {
      if (majorKeywords.includes(tokenToAdd)) formatted += `\n${tokenToAdd}`;
      else formatted += ` ${tokenToAdd}`;
    }
  }
  return formatted;
}

