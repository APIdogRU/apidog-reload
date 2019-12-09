import * as React from 'react';

/* eslint-disable no-unused-vars */
export enum TLogoColor {
    DEFAULT = '#6e90ce',
    WHITE = '#ffffff',
    BLACK = '#000000'
}
/* eslint-enable no-unused-vars */

export interface ILogoProps {
    width: number;
    color?: TLogoColor | string;
}

const WIDTH = 1029;
const HEIGHT = 259;

export default function Logo({ width, color = TLogoColor.DEFAULT }: ILogoProps) {
    const height = HEIGHT / (WIDTH / width);

    return (
        <svg
            className="logo"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            width={width}
            height={height}
            viewBox="0 0 1029 259"
            style={{ display: 'block', fill: color }}>
            <path
                d="M950 259C931 259 900 259 900 259L900 229C900 229 933 229 950 229 980 229 991 217 991 194 979 199 967 202 954 202 910 202 887 177 887 129 887 79 913 57 965 57 983 57 1004 56 1029 60L1029 193C1029 237 1002 259 950 259ZM991 88C985 86 976 85 964 85 938 85 925 99 925 128 925 156 936 170 959 170 970 170 980 168 991 162L991 88ZM490 126C490 78 514 54 562 54 572 54 582 57 593 61L593 0 630 0 630 195C608 201 585 204 563 204 515 204 490 178 490 126ZM593 168L593 94C585 88 575 86 563 86 540 86 528 99 528 125 528 157 540 172 565 172 574 172 584 171 593 168ZM420 0L458 0 458 204 420 204 420 0ZM310 133L304 100C339 93 356 80 356 59 356 42 347 33 330 33L279 33 279 204 241 204 241 0 333 0C374 0 395 19 395 58 395 99 367 124 310 133ZM152 149L84 149 97 116 138 116 106 39 39 204 0 204 87 0 128 0 216 204 175 204 152 149Z" />
            <path
                d="M863 174C863 145 863 102 863 73 863 43 863 43 838 43 798 43 721 43 681 43 657 43 657 43 657 73 657 93 657 145 657 175 657 205 657 205 681 205 721 205 798 205 838 205 863 205 863 205 863 174ZM759 116L707 73 809 73 759 116ZM681 175L681 81C681 81 719 113 742 133 759 148 759 148 778 133 801 113 838 81 838 81L838 175 681 175Z" />
        </svg>
    );
}