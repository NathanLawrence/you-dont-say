import React from 'react'
import {css, jsx} from "@emotion/core";
import { AspectRatio } from 'theme-ui';


export const EnforcedSquare= ({ children }) => (
    <AspectRatio
        ratio={1}>
        {children}
    </AspectRatio>
)