//import React from "react"

import Immutable from "draft-js/node_modules/immutable"

import makeBlockDataButton from "./makeBlockDataButton"
import makeDataRangeButton from "./makeDataRangeButton"
import makeBlockStyleButton from "./makeBlockStyleButton"
import makeInlineStyleButton from "./makeInlineStyleButton"

export default () => {
  const store = {
    blockMap: Immutable.OrderedMap()
  };

  const getBlockMap = editorState => {
    const selection = editorState.getSelection(),
      startKey = selection.getStartKey(),
      endKey = selection.getEndKey();
    let found = false;
    return editorState.getCurrentContent()
      .getBlockMap()
      .reduce((a, block) => {
        const key = block.getKey();
        if (key === startKey) {
          found = true;
        }
        if (found) {
          a = a.set(key, block);
        }
        if (key === endKey) {
          found = false;
        }
        return a;
      }, Immutable.OrderedMap())
  }

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
      store.blockMap = getBlockMap(getEditorState());
    },
    onChange: editorState => {
      store.blockMap = getBlockMap(editorState);
      return editorState;
    },
    blockStyleFn: block => {
      const textAlign = block.getData().get("textAlign"),
        textIndent = block.getData().get("textIndent");

      const styles = [
        textIndent ? `indent-${ textIndent }` : "",
        textAlign || ""
      ]
      
      const type = block.getType();
      switch (type) {
        case "header-one":
          styles.push("text-3xl font-extrabold");
          break;
        case "header-two":
          styles.push("text-2xl font-bold");
          break;
        case "header-three":
          styles.push("text-xl font-semibold");
          break;
        case "header-four":
          styles.push("text-base font-medium");
          break;
        case "header-five":
          styles.push("text-sm font-medium");
          break;
        case "header-six":
          styles.push("text-xs font-medium");
          break;
      }
      return styles.filter(Boolean).join(" ");
    },
    BlockQuoteButton: makeBlockStyleButton("blockquote", store),
    CodeBlockButton: makeBlockStyleButton("code-block", store),
    HeaderOneButton: makeBlockStyleButton("header-one", store),
    HeaderTwoButton: makeBlockStyleButton("header-two", store),
    HeaderThreeButton: makeBlockStyleButton("header-three", store),
    OrderedListButton: makeBlockStyleButton("ordered-list-item", store),
    UnorderedListButton: makeBlockStyleButton("unordered-list-item", store),

    BoldButton: makeInlineStyleButton("BOLD", store),
    CodeButton: makeInlineStyleButton("CODE", store),
    ItalicButton: makeInlineStyleButton("ITALIC", store),
    StrikeThroughButton: makeInlineStyleButton("STRIKETHROUGH", store),
    SubScriptButton: makeInlineStyleButton("SUBSCRIPT", store),
    SuperScriptButton: makeInlineStyleButton("SUPERSCRIPT", store),
    UnderlineButton: makeInlineStyleButton("UNDERLINE", store),

    LeftAlignButton: makeBlockDataButton("textAlign", "text-left", store),
    CenterAlignButton: makeBlockDataButton("textAlign", "text-center", store),
    RightAlignButton: makeBlockDataButton("textAlign", "text-right", store),
    JustifyAlignButton: makeBlockDataButton("textAlign", "text-justify", store),

    TextIndentButton: makeDataRangeButton("textIndent", "indent", store, 1, 4),
    TextOutdentButton: makeDataRangeButton("textIndent", "outdent", store, -1, 4)
  }
}
