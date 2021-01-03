import * as privatePages from './privatePages';
import * as publicPages from './publicPages';

export const makeAppLink           = () => '/app';
export const makeAppHomeLink       = () => '/app/home';
export const makeAppPostsLink      = () => '/app/posts';
export const makeAppAdvertsLink    = () => '/app/adverts';
export const makeAppNeighboursLink = () => '/app/neighbours';

export const makeMyLink           = () => '/app/my';
export const makeMyHomeLink       = () => '/app/my/home';
export const makeMyAdvertsLink    = () => '/app/my/adverts';
export const makeMyNewAdvertLink  = () => '/app/my/new-advert';
export const makeMyPostsLink      = () => '/app/my/posts';
export const makeMyNewPostLink    = () => '/app/my/new-post';

export const makeMyArticlesLink    = ()         => '/app/my/articles';
export const makeMyArticleEditLink = ({ id })   => id ? `/app/my/article/${id}` : null;

export const makeArticleLink     = ({ slug }) => slug ? `/info/article/${slug}` : null;

export const makeUserProfileLink = ({ username }) => username ? `/app/user/${username}` : null;
export const makeUserAdvertsLink = ({ username }) => username ? `/app/user/${username}/adverts` : null;
export const makeUserPostsLink   = ({ username }) => username ? `/app/user/${username}/posts` : null;

export const makeAdvertLink      = ({ username, advert_ref }) => username && advert_ref ? `/app/user/${username}/advert/${advert_ref}` : null;
export const makePostLink        = ({ username, post_ref })   => username && post_ref ? `/app/user/${username}/post/${post_ref}` : null;

export function makeRoutes() {
  return [
    { path: '/app/my/article/:articleId', component: privatePages.AppMyArticleEditPage },
    { path: makeMyArticlesLink(),         component: privatePages.AppMyArticlesPage },
    { path: makeMyAdvertsLink(),   component: privatePages.AppMyAdvertsPage },
    { path: makeMyNewAdvertLink(), component: privatePages.AppMyNewAdvertPage },
    { path: makeMyPostsLink(),     component: privatePages.AppMyPostsPage },
    { path: makeMyNewPostLink(),   component: privatePages.AppMyNewPostPage },
    { path: makeMyHomeLink(),      component: privatePages.AppMyIndexPage },
    { path: makeMyLink(),          component: privatePages.AppMyIndexPage },

    { path: '/app/user/:username/post/:post_ref',     component: privatePages.AppUserPostPage },
    { path: '/app/user/:username/posts',              component: privatePages.AppUserPostsPage },
    { path: '/app/user/:username/advert/:advert_ref', component: privatePages.AppUserAdvertPage },
    { path: '/app/user/:username/adverts',            component: privatePages.AppUserAdvertsPage },
    { path: '/app/user/:username',                    component: privatePages.AppUserIndexPage },

    { path: '/app/posts/tag/:tag',   component: privatePages.AppPostsByTagPage },
    { path: makeAppPostsLink(),      component: privatePages.AppPostsPage },
    { path: makeAppAdvertsLink(),    component: privatePages.AppAdvertsPage },
    { path: makeAppNeighboursLink(), component: privatePages.AppNeighboursPage },
    { path: makeAppHomeLink(),       component: privatePages.AppIndexPage },
    { path: makeAppLink(),           component: privatePages.AppIndexPage },

    { path: '/info/article/:slug', component: publicPages.InfoArticlePage, ssr: 'InfoArticlePage' },
    { path: '/info/i-can-help',    component: publicPages.InfoICanHelpPage },
    { path: '/info/i-need-help',   component: publicPages.InfoINeedHelpPage },
    { path: '/info/sign-in',       component: publicPages.InfoSignInPage },
    { path: '/info/sign-up',       component: publicPages.InfoSignUpPage },

    { path: '/info', component: publicPages.IndexPage, ssr: 'IndexPage' },
    { path: '/',     component: publicPages.IndexPage, ssr: 'IndexPage' },
    { path: '*',     component: publicPages.ErrorPage },
  ];
}
