# Installation
> `npm install --save @types/react-bootstrap-table2-paginator`

# Summary
This package contains type definitions for react-bootstrap-table2-paginator (https://github.com/react-bootstrap-table/react-bootstrap-table2#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-bootstrap-table2-paginator.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-bootstrap-table2-paginator/index.d.ts)
````ts
// documentation taken from https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html

import { BootstrapTableProps, PaginationOptions } from "react-bootstrap-table-next";

export interface PaginationCtxOptions {
    options?: PaginationOptions | undefined;
}

/**
 * declaration for table pagination sub module and factory
 */
declare function paginationFactory(options: PaginationOptions): PaginationCtxOptions;

export default paginationFactory;

interface PaginationChildProps extends PaginationOptions {
    tableId?: string | undefined;
    bootstrap4?: boolean | undefined;
}

/**
 * Pagination context provider
 */
export function PaginationProvider(props: {
    pagination?: PaginationCtxOptions | undefined;
    children: (childProps: {
        paginationProps: PaginationChildProps;
        paginationTableProps: BootstrapTableProps;
    }) => React.ReactElement | null;
}): React.ReactElement | null;

export const PaginationTotalStandalone: React.FC<PaginationChildProps>;
export const PaginationListStandalone: React.FC<PaginationChildProps>;

export interface SizePerPageDropdownStandaloneProps extends PaginationChildProps {
    open?: boolean | undefined;
    hidden?: boolean | undefined;
    btnContextual?: boolean | undefined;
    variation?: "dropdown" | "dropup" | undefined;
    className?: string | undefined;
}

export const SizePerPageDropdownStandalone: React.FC<SizePerPageDropdownStandaloneProps>;

````

### Additional Details
 * Last updated: Mon, 01 Jan 2024 19:06:42 GMT
 * Dependencies: [@types/react-bootstrap-table-next](https://npmjs.com/package/@types/react-bootstrap-table-next)

# Credits
These definitions were written by [Wlad Meixner](https://github.com/gosticks).
