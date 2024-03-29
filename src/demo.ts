import { h } from 'vue';

import { getDemo, handleDemoCodeHotUpdate } from './demo-codes';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  data() {
    return {
      code: '',
      component: undefined,
    };
  },
  mounted() {
    getDemo(this.name).then((res) => {
      this.component = res.component;
      this.code = res.code;
    });
    handleDemoCodeHotUpdate(this.name, (code) => {
      this.code = code;
    });
  },
  render() {
    return h(
      'div',
      {
        class: {
          demo: true,
          'custom-block': true,
          [this.type]: true,
        },
        style: 'background:transparent;border-color:var(--vp-c-divider)',
      },
      [
        h('p', { class: 'custom-block-title' }, this.title),
        h(
          'div',
          { class: 'demo__main', style: 'font-size: 16px' },
          this.component && [h({ ...this.component })],
        ),
        h('details', { class: 'details custom-block' }, [
          h('summary', undefined, 'Click me to show code'),
          h('span', {
            style: 'font-size: 16px',
            // vue3 || vue2
            innerHTML: this.code,
            domProps: {
              innerHTML: this.code,
            },
          }),
        ]),
      ],
    );
  },
};
