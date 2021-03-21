import { Link } from 'react-router-dom';

export const FbLink = ({ children, ...rest }) => <Link {...rest}>{children}</Link>;
