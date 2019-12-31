import {init} from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
const reconcile = init([propsModule,eventlistenersModule]);

let rootVNode;
const render = (el, rootDomElement) => {
    if (rootVNode == null) {
        //第一次调用 render 时
        rootVNode = rootDomElement;
    }
    rootVNode = reconcile(rootVNode, el);
}

const ReactDOM = {
    render
}
export default ReactDOM;
