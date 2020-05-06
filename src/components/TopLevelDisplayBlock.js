import React from 'react'
import {css, jsx} from "@emotion/core";


export const TopLevelDisplayBlock = ({ children }) => (
    <div css={css`
        padding: 0 12px;
        `}>
        <div
            css={css`
            background-color: rgba(65, 71, 78, 0.5);
            max-width: 800;
            margin: 1.2rem auto;
            padding: 2rem;
            border-radius: 16px;
        `}>
            {children}
        </div>
    </div>
)