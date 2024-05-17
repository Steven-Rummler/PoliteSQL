export function format(tokens: string[]): string {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].toLowerCase();
    if (keywords.includes(token)) tokens[i] = token;
  }
  return tokens.join(' ');
}

const keywords = ['insert', 'into', 'create', 'drop', 'table', 'truncate', 'select', 'from', 'where', 'group', 'by', 'having', 'order', 'delete'];