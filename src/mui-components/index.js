import React from 'react';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { Button, Slider, SnackbarContent } from '@material-ui/core';

export default (editor) => {
  const { Blocks, Components } = editor;
  const sheetsManager = new Map();

  // Helper for MUI components
  const addCmp = ({ type, component, props }) => {
    Components.addType(type, {
      extend: 'react-component',
      model: {
        defaults: {
          ...props,
          component
        }
      },
      view: {
        /**
         * We need this in order to render MUI styles in the canvas
         */
        createReactEl(cmp, props) {
          const cmpMain = React.createElement(
            cmp,
            props,
            this.createReactChildWrap()
          );
          return React.createElement(
            StylesProvider,
            {
              sheetsManager,
              jss: create({
                plugins: [...jssPreset().plugins],
                insertionPoint: this.em.get('Canvas').getDocument().head
              })
            },
            cmpMain
          );
        }
      },
      isComponent: (el) => el.tagName === type.toUpperCase()
    });

    Blocks.add(type, {
      label: type,
      category: 'MUI',
      content: { type }
    });
  };

  addCmp({
    type: 'MuiButton',
    component: Button,
    props: {
      attributes: {
        color: 'primary',
        variant: 'contained'
      },
      components: 'Click me',
      traits: [
        {
          type: 'select',
          label: 'Variant',
          name: 'variant',
          options: [
            { value: 'contained', name: 'Contained' },
            { value: 'outlined', name: 'Outlined' }
          ]
        },

        {
          type: 'checkbox',
          label: 'Disabled',
          name: 'disabled'
        },
        {
          type: 'select',
          label: 'Color',
          name: 'color',
          options: [
            { value: 'primary', name: 'Primary' },
            { value: 'secondary', name: 'Secondary' }
          ]
        }
      ]
    }
  });

  addCmp({
    type: 'Slider',
    component: Slider,
    props: {
      stylable: false,
      editable: true,
      void: true,
      attributes: {
        min: 0,
        max: 100
      },
      traits: [
        {
          type: 'number',
          label: 'Min',
          name: 'min'
        },
        {
          type: 'number',
          label: 'Max',
          name: 'max'
        }
      ]
    }
  });

  addCmp({
    type: 'Snackbar',
    component: (props) =>
      React.createElement(SnackbarContent, {
        ...props,
        message: props.children
      }),
    props: {
      stylable: false,
      editable: true,
      traits: []
    }
  });
};
