import { Store } from 'vuex'
import { Property } from './types'

interface State {
  props: Property[]
  isEdit?: boolean
}

const calcDepth = (p: Property) => 1 + (!p.props || !p.props.length ? 0 : Math.max(...p.props.map(calcDepth)))

function create() {
  return new Store<State>({
    state: {
      props: [],
      isEdit: false
    },
    mutations: {
      addProp(state, prop: Property) {
        state.props = [...state.props, prop]
      },
      removeProp(state, id: number) {
        const index = state.props.findIndex(e => e.id === id)
        if (index >= 0) {
          const props = Array.from(state.props)
          props.splice(index, 1)
          state.props = props
        }
      },
      setEdit(state, value: boolean) {
        state.isEdit = value
      }
    },
    getters: {
      depth: state => (state.props && state.props.length ? Math.max(...state.props.map(calcDepth)) : 0)
    }
  })
}
namespace create {
  export type Type = Store<State>
  export function State(name?: string): PropertyDecorator {
    return (target, prop) => {
      const key = name || prop
      Object.defineProperty(target, prop, {
        get() {
          return this.store.state[key]
        },
        configurable: false,
        enumerable: false
      })
    }
  }
  export function Getter(name?: string): PropertyDecorator {
    return (target, prop) => {
      const key = name || prop
      Object.defineProperty(target, prop, {
        get() {
          return this.store.getters[key]
        },
        configurable: false,
        enumerable: false
      })
    }
  }
  export function Mutation(name?: string): PropertyDecorator {
    return (target, prop) => {
      const key = name || prop
      Object.defineProperty(target, prop, {
        // tslint:disable-next-line: object-literal-shorthand
        value: function(...args: any[]) {
          this.store.commit(key, ...args)
        },
        writable: false,
        configurable: false,
        enumerable: false
      })
    }
  }
}

export default create
