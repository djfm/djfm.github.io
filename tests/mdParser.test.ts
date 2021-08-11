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
});
