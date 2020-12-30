import * as privatePages from './privatePages';
import * as publicPages from './publicPages';

export function makeRoutes() {
  return [
    { path: '/app/my/:section/posts-by-tag/:tag',  component: privatePages.AppMySectionPostsByTagPage },
    { path: '/app/my/:section/article/:articleId', component: privatePages.AppMySectionPage },
    { path: '/app/my/:section',                    component: privatePages.AppMySectionPage },

    { path: '/app/user/:username/post/:post_ref',     component: privatePages.AppUserPostPage },
    { path: '/app/user/:username/posts',              component: privatePages.AppUserPostsPage },
    { path: '/app/user/:username/advert/:advert_ref', component: privatePages.AppUserAdvertPage },
    { path: '/app/user/:username/adverts',            component: privatePages.AppUserAdvertsPage },
    { path: '/app/user/:username',                    component: privatePages.AppUserIndexPage },

    { path: '/app', component: privatePages.AppMySectionPage }, // defaults to '/app/my/home'

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
