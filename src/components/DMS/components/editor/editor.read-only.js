import React from "react"

import { ScalableLoading } from "components/avl-components/components/Loading/LoadingPage"

import deepequal from "deep-equal"
import get from "lodash.get"
import debounce from "lodash.debounce"
import throttle from "lodash.throttle"

import { useTheme } from "components/avl-components/wrappers/with-theme"

import {
  EditorState,
  // ContentState,
  // convertToRaw,
  convertFromRaw
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import 'draft-js/dist/Draft.css';
import './styles.css'

import makeImagePlugin from "./image"
import makeLinkItPlugin from "./linkify-it"
import makeSuperSubScriptPlugin from "./super-sub-script"
import makePositionablePlugin from "./positionable"
import makeStuffPlugin from "./stuff"

const positionablePlugin = makePositionablePlugin(),
  { positionable } = positionablePlugin;

const imagePlugin = makeImagePlugin({ wrapper: positionable }),
  { addImage } = imagePlugin;

const plugins = [
  imagePlugin,
  makeLinkItPlugin(),
  makeSuperSubScriptPlugin(),
  positionablePlugin,
  makeStuffPlugin()
];

class MyEditor extends React.Component {
  static defaultProps = {
    spellCheck: true
  }
  state = {
    editorState: EditorState.createEmpty(),
    loadedFromSavedState: false
  }
  componentDidMount() {
    if (this.props.value) {
      this.loadFromSavedState(this.props.value);
    }
  }
  componentDidUpdate() {
    if (!this.state.loadedFromSavedState && this.props.value) {
      this.loadFromSavedState(this.props.value);
    }
  }
  loadFromSavedState(content) {
    const editorState = EditorState.createWithContent(convertFromRaw(content));
    this.setState({ loadedFromSavedState: true, editorState });
  }

  handleChange(editorState) {
    this.setState(state => ({ editorState }));
  }
  render() {
    const { editorState } = this.state;

    return (
      <Editor placeholder="Type a value..."
        editorState={ editorState }
        onChange={ editorState => this.handleChange(editorState) }
        plugins={ plugins }
        readOnly={ true }
        spellCheck={ this.props.spellCheck }/>
    );
  }
}
export default MyEditor;
