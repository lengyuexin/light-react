import { h, init } from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
const reconcile = init([propsModule]);
const createElement = (type, props = {}, ...children) => {

    children=children.flat(Infinity)

    let dataProps = {};
    let eventProps = {};
    for (let propKey in props) {
        // event 属性总是以 `on` 开头
        if (propKey.startsWith('on')) {
            const event = propKey.substring(2).toLowerCase();
            eventProps[event] = props[propKey];
        } else {
            dataProps[propKey] = props[propKey];
        }
    }

    if (typeof type === 'function' && type.prototype && type.prototype.isClassComponent) {
        const componentInstance = new type(props);
        componentInstance.__vNode = componentInstance.render();
        //增加钩子函数(当虚拟DOM被添加到真实DOM节点上时)
        componentInstance.__vNode.data.hook = {
            create: () => {
                componentInstance.componentDidMount()
            }
        }
        return componentInstance.__vNode;
    }
    if (typeof type === 'function') {
        return type(props);//function func(props){}
    }
    return h(type, { props: dataProps, on: eventProps }, children);
};
class Component {
    constructor() { }

    componentDidMount() { }

    setState(partialState) {
        this.state = {
            ...this.state,
            ...partialState

        }
        React.updater(this);
    }

    render() { }
}

    Component.prototype.isClassComponent=true

const React = {
    createElement,
    Component
};


React.updater = function (componentInstance) {
    //获取在 __vNode 上存储的 oldVNode
    const oldVNode = componentInstance.__vNode;
    //获取 newVNode
    const newVNode = componentInstance.render();
    //更新 __vNode
    componentInstance.__vNode = reconcile(oldVNode, newVNode);
}
export default React;
