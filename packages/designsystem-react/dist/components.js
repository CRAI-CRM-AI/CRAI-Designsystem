'use client';
import { createComponent } from '@stencil/react-output-target/runtime';
import { MyComponent as MyComponentElement, defineCustomElement as defineMyComponent } from "designsystem-core/dist/components/my-component.js";
import React from 'react';
export const MyComponent = createComponent({
    tagName: 'my-component',
    elementClass: MyComponentElement,
    react: React,
    events: {},
    defineCustomElement: defineMyComponent
});
//# sourceMappingURL=components.js.map