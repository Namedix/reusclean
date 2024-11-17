import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 */

export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
  className,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
  className?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resoucesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div className={className}>
            <PreviousLink>
              {isLoading ? 'Ładowanie...' : <span>↑ Załaduj poprzednie</span>}
            </PreviousLink>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resoucesMarkup}</div>
            ) : (
              resoucesMarkup
            )}
            <NextLink>
              {isLoading ? 'Ładowanie...' : <span>Załaduj więcej ↓</span>}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
