import { h } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { data } from './demo-codes.data';

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
  computed: {
    code() {
      return data[this.name];
    },
    componentName() {
      return this.name.replaceAll('/', '-');
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
        style: 'background:transparent;border-color:var(--vp-c-divider)',
      },
      [
        h('p', { class: 'custom-block-title' }, this.title),
        // vue3 || vue2
        h(
          this.$?.appContext?.components?.[this.componentName] ||
            this.componentName,
          { style: 'font-size: 16px' },
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
