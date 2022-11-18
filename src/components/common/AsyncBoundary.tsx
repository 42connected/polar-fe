import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ComponentProps, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

interface Props extends Omit<ErrorBoundaryProps, 'FallbackComponent'> {
  rejectedFallback: ErrorBoundaryProps['FallbackComponent'];
  pendingFallback: NonNullable<ReactNode>;
}

// TODO: typescript 문제 해결 필요

function AsyncBoundary({ children, rejectedFallback, pendingFallback }: Props) {
  const { reset } = useQueryErrorResetBoundary();

  if (rejectedFallback === undefined) {
    return <Suspense fallback={pendingFallback}>{children}</Suspense>;
  }

  return (
    <ErrorBoundary FallbackComponent={rejectedFallback} onReset={reset}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
