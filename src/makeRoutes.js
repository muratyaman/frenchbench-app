import * as pages from './pages';

export function makeRoutes() {
  return [
    { path: '/app/my/:section/posts-by-tag/:tag', component: pages.AppMySectionPostsByTagPage },
    { path: '/app/my/:section',                   component: pages.AppMySectionPage },

    { path: '/app/user/:username/post/:post_ref', component: pages.AppUserPostPage },
    { path: '/app/user/:username/posts',          component: pages.AppUserPostsPage },
    { path: '/app/user/:username',                component: pages.AppUserIndexPage },

    { path: '/app', component: pages.AppMySectionPage }, // defaults to '/app/my/home'

    { path: '/info/article/:slug', component: pages.InfoArticlePage, ssr: 'InfoArticlePage' },
    { path: '/info/i-can-help',    component: pages.InfoICanHelpPage },
    { path: '/info/i-need-help',   component: pages.InfoINeedHelpPage },
    { path: '/info/sign-in',       component: pages.InfoSignInPage },
    { path: '/info/sign-up',       component: pages.InfoSignUpPage },

    { path: '/info', component: pages.IndexPage, ssr: 'IndexPage' },
    { path: '/',     component: pages.IndexPage, ssr: 'IndexPage' },
    { path: '*',     component: pages.ErrorPage },
  ];
}
