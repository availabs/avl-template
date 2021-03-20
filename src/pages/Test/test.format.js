const TestFormat1 = {
  app: "dms",
  type: "dms-test-1",
  attributes: [
    { key: "test-1-4",
      type: "dms-format",
      format: "dms+dms-test-2"
    },
    { key: "test-1-1",
      type: "text",
      required: true
    },
    { key: "test-1-2",
      type: "text"
    },
    { key: "test-1-3",
      type: "number",
      default: "props:user.authLevel"
    },
  ]
}
const TestFormat2 = {
  app: "dms",
  type: "dms-test-2",
  attributes: [
    { key: "test-2-1",
      type: "text",
      default: "test-2-1-default-value"
    },
    { key: "test-2-2",
      type: "date",
      required: true
    },
    { key: "test-2-3",
      type: "text",
      isArray: true
    },
    { key: "test-2-4",
      type: "text",
      required: true
    }
  ]
}

const Doc = {
  app: "dms",
  type: "doc",
  attributes: [
    { key: "content",
      type: "richtext"
    },
    { key: "tags",
      type: "text",
      isArray: true
    }
  ]
}

const TestFormat3 = {
  app: "dms",
  type: "dms-test-3",
  attributes: [
    { key: "bool",
      type: "boolean"
    },
    { key: "test-3-1",
      type: "text",
      isArray: true,
      verify: "^tag-\\d+$"
    },
    { key: "test-3-2",
      type: "text",
      verify: "^text:\\w+"
    },
    { key: "test-3-3",
      type: "number",
      verify: "(0, 10]",
      isArray: true
    },
    { key: "test-3-4",
      type: "number",
      verify: "[-10, 10)",
      isArray: true
    },
    { key: "test-3-5",
      type: "number",
      verify: "> 10",
      isArray: true
    },
    { key: "test-3-6",
      type: "number",
      verify: "<= 10",
      isArray: true
    }
  ]
}

export default {
  app: "dms",
  type: "dms-test",

  registerFormats: [TestFormat1, TestFormat2, TestFormat3, Doc],

  sections: [
    { title: "Markdown",
      attributes: [
        { key: "test-markdown",
          type: "markdown"
        },
        { key: "text-input-1",
          type: "text"
        }
      ]
    },
    { title: "Tests",
      attributes: [
        { key: "test-bool",
          type: "boolean",
          default: true
        },
        { key: "test-1",
          type: "dms-format",
          format: "dms+dms-test-3"
        }
      ]
    },
    { title: "Editor",
      attributes: [
        { key: "text-editor",
          type: "richtext"
        }
      ]
    },
    { title: "Test Doc",
      attributes: [
        { key: "doc-page",
          type: "dms-format",
          format: "dms+doc",
          fullWidth: true,
          isArray: true
        }
      ]
    },
    { title: "Random",
      attributes: [
        { key: "test-date-array",
          type: 'date',
          isArray: true
        },
        { key: "test-object-input",
          type: "object"
        },
        { key: 'test-multi-select',
          type: "select",
          isArray: true,
          domain: "props:domain"
        },
        { key: 'test-select',
          type: "select",
          searchable: false,
          domain: "props:domain"
        },
      ]
    },
    { title: "Image",
      attributes: [
        { key: "test-image",
          type: "img"
        }
      ]
    },
    { title: "Numbers",
      attributes: [
        { key: "test-number",
          type: "number"
        },
        { key: "test-number-array",
          type: "number",
          isArray: true
        },
      ]
    },
    { title: "Info",
      attributes: [
        { key: "title",
          type: "text",
          required: true
        },
        { key: "creator",
          type: "text",
          default: "props:user.id",
          editable: false
        }
      ]
    },
    { title: "Format",
      attributes: [
        { key: "test-format-1",
          type: "dms-format",
          format: "dms+dms-test-1"
        },
        { key: "test-format-2",
          type: "dms-format",
          format: "dms+dms-test-2"
        },
        { key: "test-format-array",
          type: "dms-format",
          format: "dms+dms-test-2",
          isArray: true
        },
      ]
    },
  ]
}