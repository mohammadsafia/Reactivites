import React from 'react';
import { useStore } from "app/stores/store";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps  {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Component, ...rest}) => {
  const {userStore: {isLoggedIn}} = useStore();
  return (
    <Route {...rest} render={(props)=> isLoggedIn ? <Component {...props}/>: <Redirect to='/' /> } />
  );
};

export default PrivateRoute;