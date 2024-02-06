import { h } from 'vue';

import { getDemoCode } from './demo-codes';

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
    };
  },
  mounted() {
    getDemoCode(this.name).then((res) => {
      this.code = res;
    });
  },
  computed: {
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
