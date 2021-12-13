import ReactDOM from 'react-dom';
import React from 'react';

export default (editor) => {
  const domc = editor.Components;
  const defType = domc.getType('default');
  const defModel = defType.model;
  const wrpChld = 'data-chld';

  // Main React component
  domc.addType('react-component', {
    model: {
      toHTML(opts = {}) {
        return defModel.prototype.toHTML.call(this, {
          ...opts,
          tag: this.get('type')
        });
      }
    },
    view: {
      tagName: 'div',

      init() {
        const { model } = this;
        this.listenTo(model, 'change:attributes', this.render);
        this.listenTo(model.components(), 'add remove reset', this.__upRender);
      },

      getChildrenContainer() {
        const { childrenContainer } = this;
        if (childrenContainer) return childrenContainer;

        this.childrenContainer = document.createElement('childc');

        return this.childrenContainer;
      },

      /**
       * We need this container to understand if the React component is able
       * to render children
       */
      createReactChildWrap() {
        return React.createElement('span', { [wrpChld]: true });
      },

      createReactEl(cmp, props) {
        return React.createElement(cmp, props, this.createReactChildWrap());
      },

      mountReact(cmp, el) {
        ReactDOM.render(cmp, el);
      },

      render() {
        const { model, el } = this;
        this.updateAttributes();
        this.renderChildren();
        const reactEl = this.createReactEl(model.get('component'), {
          ...model.get('attributes')
        });
        this.mountReact(reactEl, el);
        const chld = el.querySelector(`span[${wrpChld}]`);

        // If the container is found, the react component is able to render children
        if (chld) {
          const chldCont = this.getChildrenContainer();
          while (chldCont.firstChild) {
            chld.appendChild(chldCont.firstChild);
          }
        }

        return this;
      },

      __upRender() {
        clearTimeout(this._upr);
        this._upr = setTimeout(() => this.render());
      }
    }
  });
};
