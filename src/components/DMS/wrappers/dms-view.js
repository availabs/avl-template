import React from "react"

import {
  Button,
  DmsButton,
  ActionButton,
  Title
} from "../components/parts"

import deepequal from "deep-equal"
import get from "lodash.get"

const SEED_PROPS = () => ({});

const ViewRow = ({ name, value }) =>
  <div className="grid grid-cols-4 my-2">
    <div className="col-span-1 font-bold">{ name }</div>
    <div className="col-span-3">{ value }</div>
  </div>

export default (Component, options = {}) => {
  return class Wrapper extends React.Component {
    static defaultProps = {
      dmsAction: "view",
      actions: [],
      interact: () => {},
      mapDataToProps: {},
      seedProps: props => ({})
    }
    renderChildren() {
      const { seedProps = SEED_PROPS, ...props } = this.props;
      return React.Children.map(this.props.children, child =>
        React.cloneElement(child,
          { ...props,
            ...child.props,
            ...seedProps(props)
          }
        )
      )
    }
    renderItem(path, item) {
      let { format } = this.props,
        key = path.split(".").pop(),
        attributes = get(format, "attributes", []),
        attribute = attributes.reduce((a, c) => c.key === key ? c: a, {}),
        name = attribute.name || key,
        type = attribute.type,
        value = get(item, path, null);

      if (key === "updated_at") {
        name = "Updated At";
        value = (new Date(value)).toLocaleString();
      }
      if (/^array:/.test(type)) {
        if (!value) return null;
        value = value.map(v => <div key={ v }>{ v }</div>)
      }

      return <ViewRow key={ path } name={ name } value={ value }/>;
    }
    renderRow(path, item) {
      const regex = /^(item|props):(.+)$/,
        match = regex.exec(path);

      if (!match) return null;

      const [, from, p] = match;

      if (match[1] === "item") {
        return this.renderItem(p, item);
      }

      const value = get(this.props, p, null);
      return <ViewRow key={ p } name={ p } value={ value }/>;
    }
    getValue(path, item) {
      const regex = /^(item|props):(.+)$/,
        match = regex.exec(path);

      if (!match) return null;

      const [, from, p] = match;

      if (from === "item") {
        return get(item, p, null)
      }
      return get(this.props, p, null);
    }
    render() {
      const {
        actions, interact,
        type, format,
        mapDataToProps
      } = { ...this.props, ...options };

      const item = get(this, ["props", type], null);

      if (!item) return null;

      const props = {};

      for (const key in mapDataToProps) {
        if (typeof mapDataToProps[key] === "string") {
          props[key] = this.getValue(mapDataToProps[key], item);
        }
        else {
          props[key] = mapDataToProps[key].map(path => {
            return this.renderRow(path, item)
          })
        }
      }

      return (
        <div>
          <Component { ...props }/>
          { !actions.length ? null :
            <div className="mt-2">
              { actions.map(a => <DmsButton key={ a } item={ item } action={ a }/>) }
            </div>
          }
          <div>{ this.renderChildren() }</div>
        </div>

      )
    }
  }
}

// export default class DmsView extends React.Component {
//   static defaultProps = {
//     dmsAction: "view",
//     title: "",
//     content: "",
//     actions: [],
//     interact: () => {},
//     data: {},
//     mapDataToProps: {},
//     seedProps: props => ({})
//   }
//   render() {
//     const {
//       actions, interact,
//       type, format,
//       mapDataToProps
//     } = this.props;
//
//     const item = get(this, ["props", type], null);
//
//     if (!item) return null;
//
//     const data = get(item, "data", {});
//
//     const mapped = {
//       title: this.props.title,
//       content: this.props.content
//     };
//
//     for (const key in mapDataToProps) {
//       const v = data[key],
//         k = mapDataToProps[key];
//       mapped[k] = v;
//     }
//     const { title, content } = mapped;
//
//     return (
//       <div>{ title }</div>
//     )
//   }
// }