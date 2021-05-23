import { FbLoadingParagraph } from '../components';
import { FbUserProfile } from './FbUserProfile';

export function FbMyUserProfileLoader({ api, currentUserState = null }) {
  const { data: user, loading = false, error = null, reload } = currentUserState ?? {};
  const { username, first_name } = user ?? {};
  const greet = first_name ?? username;
  return (
    <div className='fb-user-profile'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading profile</p>}
      {!user && <p>no user info</p>}
      { user && (
        <div>
          <p>Hi {greet}! This is your profile page.</p>
          <FbUserProfile user={user} api={api} editable={true} afterEdit={() => reload()} />
        </div>
      )}
    </div>
  );
}
