import React from "react"

import DMS_DOCS from "./dms-docs.type"

import DocsPage from "./docs-page"

const domain = [
  "Text 1", "Text 2", "Text 3",
  '???????? ????????',
  '????????? ??????????',
  "!!!!!!!!", "###### #####",
  "!!! !!!!! !!!", "######## #######",
  '????????? ?????? ???',
  '???? ?????? ????????????',
  "!!! !!!!!!", "####### ######",
  "!!!!!!!! !!!!!", "########## ########",
  '????????? ???? ?????',
  '?? ????????? ??????? ?? ??',
  "!!!! !!!!!! !!!!", "####### #####",
  "!!!!!!!!! !!!!", "######### #######",
  '????????? ????? ??? ???',
  '?????????? ???? ????????????',
  "!!!!! !!!! !!!!", "####### #######",
  "!!!!!!!! !!!!!!!!", "########### ########"
]

export default ({
  type: ({ children }) => <div className="flex"><div className="mt-20 pt-8 flex-1 w-full mx-auto max-w-7xl mb-10">{ children }</div></div>,
  wrappers: [
// wrapper order is important
// from index zero to i, higher index wrappers send props into lower index wrappers
// higher index wrappers do not see props from lower index wrappers
    "dms-manager",
    { type: "dms-provider",
      options: {
        buttonThemes: {
          home: "buttonInfo",
          // create: "buttonSuccess",
          // edit: "buttonPrimary"
        }
      }
    },
    "dms-router",
    "show-loading", // receives loading prop
    "dms-falcor", // generates loading prop and passes to children
    "with-auth"
  ],
  props: {
    format: DMS_DOCS,
    authRules: {
      create: {
        args: ["props:user.authLevel"],
        comparator: al => +al === 10
      },
      edit: {
        args: ["props:user.authLevel"],
        comparator: al => +al === 10
      },
      delete: {
        args: ["props:user.authLevel"],
        comparator: al => +al === 10
      }
    }
  },
  children: [
    { type: "dms-header",
      props: { title: "Dms Docs" }
    },
// dms-manager children are special
// they are only shown when the dms-manager state.stack.top.action === child.props.dmsAction
    { type: "dms-list", // generic dms component for viewing multiple data items
      props: {
        dmsAction: "list",

        // sortBy: "data.chapter",
        // sortOrder: "asc",

        sort: {
          accessor: "self:data.chapter",
          comparator: (a, b) => {
            const av = +a.replace(".", ""),
              bv = +b.replace(".", "");
            return av - bv;
          }
        },

        // filter: d => !d.data.chapter.includes("."),

        filter: {
          args: ["self:data.chapter"],
          comparator: arg => !arg.includes(".")
        },

        columns: [
          "title", "chapter",
          "dms:edit", "dms:delete",
          { action: "api:delete",
            label: "API delete",
            showConfirm: true }
        ]
      },
      wrappers: ["with-theme"]
    },

    { type: DocsPage, // generic dms component for viewing a single data item
      props: {
        dmsAction: "view"
      },
      wrappers: [
        { type: "dms-view",
          options: {
            actions: [
              ["dms:edit", "dms:delete"],
              ["dms:create"]
            ],
            mapDataToProps: {
              // $preserveKeys: true,
// mapDataToProps is used by dms-view to map data items to wrapped component props
// prop: [...attributes]
// in this case, the dms-card is expecting title and body props.
              title: "item:data.title",
              chapter: "item:data.chapter",
              body: "item:data.body",
              updated_at: "item:updated_at"
            }
          }
        },
        "with-auth"
      ],
      children: [
        { type: "dms-list",
          props: {
            columns: ["title", "chapter", "dms:edit", "dms:delete"],
            className: "mt-5",
            sortBy: "data.chapter",
            sortOrder: "asc",
          },
          wrappers: [{
            type: "dms-falcor",
            options: {
              filter: {
                args: ["props:dms-docs.data.chapter", "self:data.chapter"],
                comparator: (arg1, arg2) => {
                  const regex = new RegExp(`^${ arg1 }[.]\\d+$`)
                  return regex.test(arg2);
                }
              }
            }
          }]
        }
      ]
    },

    { type: "dms-create",
      props: { dmsAction: "create", domain },
      wrappers: ["with-auth"]
    },

    { type: "dms-edit",
      props: { dmsAction: "edit", domain },
      wrappers: ["with-auth"]
    },

    { type: DocsPage,
      props: { dmsAction: "delete" },
      wrappers: [
        { type: "dms-view",
          options: {
            mapDataToProps: {
              title: "item:data.title",
              chapter: "item:data.chapter",
              body: "item:data.body",
              updated_at: "item:updated_at"
            },
            actions: ["api:delete"]
          }
        }
      ]
    }
  ]
})
