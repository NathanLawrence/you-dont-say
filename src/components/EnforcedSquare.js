import React from 'react'
import {css, jsx} from "@emotion/core";


export const EnforcedSquare= ({ children }) => (
    <div
        css={css`
            width: 100%;
            padding-top: 100%;
            position: relative;
        `}>
        <div
            css={css`
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
            `}>
            {children}
        </div>
    </div>
)