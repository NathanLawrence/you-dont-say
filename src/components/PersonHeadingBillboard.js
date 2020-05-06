import {TopLevelDisplayBlock} from "./TopLevelDisplayBlock";
import {css} from "@emotion/core";
import Styling from "./Styling";
import React from "react";
import {CircleImage} from "./CircleImage";
import {EnforcedSquare} from "./EnforcedSquare";
import Img from "gatsby-image";

export const PersonHeadingBillboard = ({person}) => (
    <TopLevelDisplayBlock>
        <div css={css`
            padding: 1rem 2rem;
        `}>
            <div css={css`
            width: 150px;
        `}>
                <EnforcedSquare>
                    <Img
                        css={css`
                                border-radius: 50%;
                                margin: 10px;
                                object-fit: cover;
                                width: 90%;
                                height: 90%;
                                margin: auto;
                            `}
                        fluid={person.photo.childImageSharp.fluid} />
                </EnforcedSquare>
            </div>

            <h1 css={css`
            margin-top: 0;
            font-size: 3.3rem;
            font-weight: ${Styling.fonts.weightBold};
            text-align: left;
        `}>{person.name}</h1>
        </div>

    </TopLevelDisplayBlock>
)