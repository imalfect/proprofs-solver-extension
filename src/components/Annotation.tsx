import React from 'react';
import {RadixColors} from '../types/radix.ts';
import {Callout} from '@radix-ui/themes';
interface ICalloutProps {
    color: RadixColors;
    size?: '1' | '2' | '3';
    children: React.ReactNode;
    icon: React.ReactNode;
}
export default function Annotation(props: ICalloutProps) {
  return (
    <div style={{maxWidth: 350, marginLeft: 'auto', marginRight: 'auto'}}>
      <Callout.Root color={props.color} size={props.size || '1'}>
        <Callout.Icon>
          {props.icon}
        </Callout.Icon>
        <Callout.Text>
          {props.children}
        </Callout.Text>
      </Callout.Root>
    </div>
  );
}
