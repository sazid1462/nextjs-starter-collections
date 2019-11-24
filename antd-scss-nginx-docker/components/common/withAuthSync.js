// Gets the display name of a JSX component for dev tools
import React from "react";
import nextCookie from "next-cookies";
import { LOGIN_PATH } from "../../constants/Routes";
import { redirectTo } from "./Redirect";

export const withAuthSync = (WrappedComponent) => {

    const Component = (props) => {

        return <WrappedComponent {...props} />;
    };

    Component.displayName = `AuthSyncHOC(${getDisplayName(WrappedComponent)})`;

    Component.getInitialProps = async (ctx) => {

        const { auth } = nextCookie(ctx);

        if (!auth) return redirectTo(LOGIN_PATH, ctx);

        const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

        return { ...componentProps };
    };

    return Component;
};

const getDisplayName = (Component) => Component.displayName || Component.name || "Component";
