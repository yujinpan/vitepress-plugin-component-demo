import { h } from 'vue';

import { data } from './demo-codes';

export default {
  props: {
    name: String,
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  computed: {
    code() {
      return data[this.name];
    },
  },
  render() {
    return h(
      'div',
      {
        class: {
          'custom-block': true,
          [this.type]: true,
        },
        style: 'font-size: 16px',
      },
      [
        h('p', { class: 'custom-block-title' }, this.title),
        h(this.name),
        h(
          'details',
          { class: 'details custom-block', style: 'font-size: 16px' },
          [
            h('summary', undefined, 'Click me to show code'),
            h('span', {
              domProps: {
                innerHTML: this.code,
              },
            }),
          ],
        ),
      ],
    );
  },
};
