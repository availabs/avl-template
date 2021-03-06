export default {
  app: "docs",
  type: "page",
  attributes: [
    { key: "title",
      type: "text",
      required: true
    },
    { key: "body",
      type: "richtext",
      required: true
    },
    { key: "userId",
      name: "User",
      type: "text",
      default: "props:user.id", // default value will be pulled from props.user.id
      editable: false
    }
  ]
}