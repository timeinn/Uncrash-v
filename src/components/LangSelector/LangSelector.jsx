import { Icon } from 'ant-design-vue'
import { mapState } from 'vuex'

export default {
  name: 'LangSelector',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-lang-selector'
    },
    langList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      currentLang: state => state.app.lang
    })
  },
  methods: {
    switchLang (row) {
      this.$store.dispatch('SetLang', row.key)
    }
  },
  render () {
    const { $props } = this
    const prefixCls = $props.prefixCls

    const langItems = $props.langList.map(lang => {
      return (
        <a-menu-item key={lang.key} style={this.currentLang === lang.key ? 'background: #e6f7ff;' : null}>
          <a rel={'noopener noreferrer'}>
            <span role="img" aria-label={lang.name}>{ lang.icon }</span> { lang.name }
          </a>
        </a-menu-item>
      )
    })

    return (
      <div class={prefixCls}>
        <a-dropdown trigger={['click']}>
          <a class="ant-dropdown-link" href="#">
            <Icon type={'global'} />
          </a>
          <a-menu slot="overlay" onClick={this.switchLang}>
            {langItems}
          </a-menu>
        </a-dropdown>
      </div>
    )
  }
}
