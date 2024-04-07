import { Children } from 'react';

export default function Show(props: any) {
    let when: any;
    let otherwise: any;

    Children.forEach(props.children, (children) => {
        if (children.props.isTrue === undefined) {
            otherwise = children;
        } else if (!when && children.props.isTrue === true) {
            when = children;
        }
    });

    return when || otherwise;
}

Show.When = ({ isTrue, children }: { isTrue: boolean; children: any }) =>
    isTrue && children;
Show.Else = ({ render, children }: any) => render && children;
