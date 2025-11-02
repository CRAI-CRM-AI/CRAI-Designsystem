import * as clientComponents from 'designsystem-core/client';
import { createComponent, } from '@stencil/react-output-target/ssr';
export const serializeShadowRoot = {
    default: 'declarative-shadow-dom',
};
export const MyComponent = createComponent({
    tagName: 'my-component',
    properties: {
        first: 'first',
        middle: 'middle',
        last: 'last',
    },
    hydrateModule: import('designsystem-core/hydrate'),
    clientModule: clientComponents.MyComponent,
    serializeShadowRoot,
});
//# sourceMappingURL=components.server.js.map