import {
  parser,
} from '../src/MDParser/parser';

describe('the Markdown parser', () => {
  it('parses a paragraph at document root', async () => {
    const doc = await parser('hello world', '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'literal',
                  value: 'hello world',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it([
    'merges consecutive lines into a single',
    'paragraph with appropriate whitespace',
  ].join(' '), async () => {
    const doc = await parser('hello\n  beloved \nworld\n', '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'literal',
                  value: 'hello beloved world',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it(
    'does not mess up with formatting on single line', async () => {
      const doc = await parser('hello *dearest* world', '');
      expect(doc).toMatchObject({
        type: 'document',
        children: [
          {
            type: 'section',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'literal',
                    value: 'hello ',
                  },
                  {
                    type: 'idiomatic',
                    children: [
                      {
                        type: 'literal',
                        value: 'dearest',
                      },
                    ],
                  },
                  {
                    type: 'literal',
                    value: ' world',
                  },
                ],
              },
            ],
          },
        ],
      });
    },
  );

  it('parses a section followed by a paragraph', async () => {
    const doc = await parser([
      'Introduction',
      '============',
      '',
      'This is an introduction.',
    ].join('\n'), '');

    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          props: {
            level: 0,
          },
          children: [
            {
              type: 'section',
              props: {
                level: 1,
              },
              children: [
                {
                  type: 'heading',
                  props: {
                    level: 1,
                  },
                  children: [
                    {
                      type: 'literal',
                      value: 'Introduction',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'literal',
                      value: 'This is an introduction.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses complex sections', async () => {
    const doc = await parser([
      'Introduction',
      '============',
      '',
      'This is an introduction.',
      '',
      'This is Subsection A',
      '--------------------',
      '',
      'subsection A text',
      '',
      'This is Subsection B',
      '--------------------',
      'subsection B text',
      '',
      'this is another paragraph in B',
      '',
      'Part 1',
      '=======',
      '',
      'intro 1',
      '',
      'This is subsection 1',
      '-------------------',
      '',
      'subsection 1 text',
      '',
      'This is subsection 2',
      '-------------------',
      '',
      'subsection 2 text',
    ].join('\n'), '');

    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          props: {
            level: 0,
          },
          children: [
            {
              type: 'section',
              props: {
                level: 1,
              },
              children: [
                {
                  type: 'heading',
                  props: {
                    level: 1,
                  },
                  children: [
                    {
                      type: 'literal',
                      value: 'Introduction',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'literal',
                      value: 'This is an introduction.',
                    },
                  ],
                },
                {
                  type: 'section',
                  props: {
                    level: 2,
                  },
                  children: [
                    {
                      type: 'heading',
                      props: {
                        level: 2,
                      },
                      children: [
                        {
                          type: 'literal',
                          value: 'This is Subsection A',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'subsection A text',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'section',
                  props: {
                    level: 2,
                  },
                  children: [
                    {
                      type: 'heading',
                      props: {
                        level: 2,
                      },
                      children: [
                        {
                          type: 'literal',
                          value: 'This is Subsection B',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'subsection B text',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'this is another paragraph in B',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'section',
              props: {
                level: 1,
              },
              children: [
                {
                  type: 'heading',
                  props: {
                    level: 1,
                  },
                  children: [
                    {
                      type: 'literal',
                      value: 'Part 1',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'literal',
                      value: 'intro 1',
                    },
                  ],
                },
                {
                  type: 'section',
                  props: {
                    level: 2,
                  },
                  children: [
                    {
                      type: 'heading',
                      props: {
                        level: 2,
                      },
                      children: [
                        {
                          type: 'literal',
                          value: 'This is subsection 1',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'subsection 1 text',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'section',
                  props: {
                    level: 2,
                  },
                  children: [
                    {
                      type: 'heading',
                      props: {
                        level: 2,
                      },
                      children: [
                        {
                          type: 'literal',
                          value: 'This is subsection 2',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'subsection 2 text',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses strong content', async () => {
    const doc = await parser('**hello world**', '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'bold',
                  children: [
                    {
                      type: 'literal',
                      value: 'hello world',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses nested idiomatic within strong content', async () => {
    const doc = await parser('**hello *my* world**', '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'bold',
                  children: [
                    {
                      type: 'literal',
                      value: 'hello ',
                    },
                    {
                      type: 'idiomatic',
                      children: [
                        {
                          type: 'literal',
                          value: 'my',
                        },
                      ],
                    },
                    {
                      type: 'literal',
                      value: ' world',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses nested strong content within idiomatic content', async () => {
    const doc = await parser('*hello **my** world*', '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'idiomatic',
                  children: [
                    {
                      type: 'literal',
                      value: 'hello ',
                    },
                    {
                      type: 'bold',
                      children: [
                        {
                          type: 'literal',
                          value: 'my',
                        },
                      ],
                    },
                    {
                      type: 'literal',
                      value: ' world',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses quoted text', async () => {
    const doc = await parser('`hi *world*`', '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'quote',
                  value: 'hi *world*',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses a simple list', async () => {
    const doc = await parser('- one\n- two\n- three', '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'one',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'two',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'three',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses a list with multi-paragraph items', async () => {
    const doc = await parser([
      '- one',
      '',
      '  still-one',
      '- two',
    ].join('\n'), '');

    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'one',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'still-one',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'two',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses a nested list', async () => {
    const doc = await parser([
      '- top level one',
      '  - nested one',
      '    still in one',
      '',
      '    another paragraph',
      '',
      '  - nested two',
      '  - nested three',
      '    - deep 1',
      '- top level two',
    ].join('\n'), '');

    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'top level one',
                        },
                      ],
                    },
                    {
                      type: 'list',
                      children: [
                        {
                          type: 'list-item',
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'literal',
                                  value: 'nested one still in one',
                                },
                              ],
                            },
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'literal',
                                  value: 'another paragraph',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'list-item',
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'literal',
                                  value: 'nested two',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'list-item',
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'literal',
                                  value: 'nested three',
                                },
                              ],
                            },
                            {
                              type: 'list',
                              children: [
                                {
                                  type: 'list-item',
                                  children: [
                                    {
                                      type: 'paragraph',
                                      children: [
                                        {
                                          type: 'literal',
                                          value: 'deep 1',
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'top level two',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses a blockquote', async () => {
    const doc = await parser('```hello\nabc\ndef\n```', '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'blockquote',
              props: {
                syntax: 'hello',
              },
              children: [
                {
                  type: 'literal',
                  value: 'abc',
                },
                {
                  type: 'literal',
                  value: 'def',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses a blockquote followed by a paragraph', async () => {
    const doc = await parser([
      '```js',
      'const x = 4;',
      'console.log(x);',
      '```',
      '',
      'hello world',
    ].join('\n'), '');
    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'blockquote',
              props: {
                syntax: 'js',
              },
              children: [
                {
                  type: 'literal',
                  value: 'const x = 4;',
                },
                {
                  type: 'literal',
                  value: 'console.log(x);',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'literal',
                  value: 'hello world',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses function calls within sections', async () => {
    const doc = await parser([
      '@@META(',
      '  bob/lol',
      '  anchor=""',
      '  title="fmdj.fr"',
      ')',
    ].join('\n'), '');

    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'function-call',
              value: 'META',
              props: {
                positionalArgs: ['bob/lol'],
                namedArgs: {
                  anchor: '',
                  title: 'fmdj.fr',
                },
              },
            },
          ],
        },
      ],
    });
  });

  it('parses function calls within paragraphs', async () => {
    const doc = await parser([
      'hello',
      '@@IMG(/img/cat.png alt="cat")',
    ].join('\n'), '');

    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'literal',
                  value: 'hello ',
                },
                {
                  type: 'function-call',
                  value: 'IMG',
                  props: {
                    positionalArgs: ['/img/cat.png'],
                    namedArgs: {
                      alt: 'cat',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('parses function calls within list items', async () => {
    const doc = await parser([
      '- hello',
      '',
      '  @@TEST()',
    ].join('\n'), '');

    expect(doc).toMatchObject({
      type: 'document',
      children: [
        {
          type: 'section',
          children: [
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'literal',
                          value: 'hello',
                        },
                      ],
                    },
                    {
                      type: 'function-call',
                      value: 'TEST',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
