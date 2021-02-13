/**
 * render children only on client-side
 * @param {*} param0 
 */
export function FbClientSideContainer({ children, ...rest }) {
  if (window && window.navigator) {
    return (
      <div {...rest}>
        {children}
      </div>
    );
  }
  return null;
}
