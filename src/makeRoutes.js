import * as privatePages from './privatePages';
import * as publicPages from './publicPages';

export const makeMyHomeLink       = () => '/app/my/home';
export const makeMyAdvertsLink    = () => '/app/my/adverts';
export const makeMyNewAdvertLink  = () => '/app/my/new-advert';
export const makeMyPostsLink      = () => '/app/my/posts';
export const makeMyNewPostLink    = () => '/app/my/new-post';
export const makeMyNeighboursLink = () => '/app/my/neighbours';

export const makeArticlesLink    = ()         => '/app/articles';
export const makeArticleEditLink = ({ id })   => id ? `/app/article/${id}` : null;
export const makeArticleLink     = ({ slug }) => slug ? `/info/article/${slug}` : null;

export const makeUserProfileLink = ({ username }) => username ? `/app/user/${username}` : null;
export const makeAdvertLink      = ({ username, advert_ref }) => username && advert_ref ? `/app/user/${username}/advert/${advert_ref}` : null;
export const makePostLink        = ({ username, post_ref })   => username && post_ref ? `/app/user/${username}/post/${post_ref}` : null;

export function makeRoutes() {
  return [
    { path: makeArticlesLink(),        component: privatePages.AppArticlesPage },
    { path: '/app/article/:articleId', component: privatePages.AppArticleEditPage },

    { path: '/app/posts/tag/:tag', component: privatePages.AppPostsByTagPage },

    { path: makeMyHomeLink(),      component: privatePages.AppMyIndexPage },
    { path: makeMyAdvertsLink(),   component: privatePages.AppMyAdvertsPage },
    { path: makeMyNewAdvertLink(), component: privatePages.AppMyNewAdvertPage },
    { path: makeMyPostsLink(),     component: privatePages.AppMyPostsPage },
    { path: makeMyNewPostLink(),   component: privatePages.AppMyNewPostPage },

    { path: '/app/user/:username/post/:post_ref',     component: privatePages.AppUserPostPage },
    { path: '/app/user/:username/posts',              component: privatePages.AppUserPostsPage },
    { path: '/app/user/:username/advert/:advert_ref', component: privatePages.AppUserAdvertPage },
    { path: '/app/user/:username/adverts',            component: privatePages.AppUserAdvertsPage },
    { path: '/app/user/:username',                    component: privatePages.AppUserIndexPage },

    { path: '/app', component: privatePages.AppMyIndexPage }, // defaults to '/app/my/home'

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
