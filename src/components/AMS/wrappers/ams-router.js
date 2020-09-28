import React from "react"

// import { RouterContext } from "../contexts"

import {
  useRouteMatch, useParams,
  useHistory, useLocation,
  Switch, Route
} from "react-router-dom"

const RouterContext = React.createContext({});

const GetParams = ({ Component, ...others }) => {
  const params = useParams();
  return <Component { ...others } params={ { ...params } }/>;
}

export default (Component, options = {}) => {
  return ({ ...props }) => {
    const { path } = useRouteMatch(),
      alt1 = `${ path }/:action/`,
      alt2 = `${ path }/:action/:id/`,
      location = useLocation(),
      history = useHistory(),
      routerProps = React.useMemo(() => ({
        basePath: path,
        useRouter: true,
        location,
        history
      }), [path, location, history]);
    return (
      <RouterContext.Provider value={ routerProps }>
        <Switch>
          <Route exact path={ path }>
            <Component { ...props } { ...routerProps }/>
          </Route>
          <Route exact path={ [alt1, alt2] }>
            <GetParams { ...props } { ...routerProps } Component={ Component }/>
          </Route>
        </Switch>
      </RouterContext.Provider>
    )
  }
}
