import { createInterface } from 'readline';
import { politesql } from './politesql';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});

const query: string[] = [];

readline.prompt();

readline.on('line', line => query.push(line));

readline.on('close', () => {
  console.log(politesql(query.join('\n')));
  readline.close();
})