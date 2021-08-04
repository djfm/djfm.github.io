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
});
