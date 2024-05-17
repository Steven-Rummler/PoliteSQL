export const spaces = [' ', '\t', '\n', '\r'];
export const commas = [','];
export const quotes = ['\'', '"', '`'];
export const symbols = ['+', '-', '*', '/', '%', '=', '<', '>'];
export const braces = ['(', ')', '[', ']', '{', '}'];

export const majorKeywords = [
  'insert',
   'create',
    'drop',
     'truncate',
      'delete',
       'select',
        'from',
         'where',
          'group',
           'having',
            'order',
             'union',
            ];
export const otherKeywords = ['table', 'column', 'by', 'asc', 'desc', 'distinct', 'all', 'any', 'cross', 'right', 'left', 'join'];
export const keywords = [...majorKeywords, ...otherKeywords];