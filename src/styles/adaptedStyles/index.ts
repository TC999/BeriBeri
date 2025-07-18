import './common'
import './shadowDom'
import './thirdParties'

import { settings } from '~/logic/storage'
import { isHomePage, isInIframe } from '~/utils/main'

async function setupStyles() {
  const currentUrl = document.URL

  // homepage 首页
  if (isHomePage()) {
    await import('./pages/homePage.scss')
    document.documentElement.classList.add('homePage')
  }

  // notifications page 消息页
  else if (/https?:\/\/message\.bilibili\.com\.*/.test(currentUrl)) {
    await import('./pages/notificationsPage.scss')
    document.documentElement.classList.add('notificationsPage')

    if (isInIframe() && settings.value.openNotificationsPageAsDrawer) {
      document.documentElement.classList.add('drawer')
    }
  }

  // moments page, new articles page 动态页, 新版专栏页
  else if (
    // moments
    /https?:\/\/t\.bilibili\.com\.*/.test(currentUrl)
    // moment detail, new articles page
    || /https?:\/\/www\.bilibili\.com\/opus\/.*/.test(currentUrl)) {
    await import('./pages/momentsPage.scss')
    document.documentElement.classList.add('momentsPage')
  }

  // history page 历史记录页
  else if (
    /https?:\/\/(?:www\.)?bilibili\.com\/account\/history.*/.test(currentUrl)
    || /https?:\/\/(?:www\.)?bilibili\.com\/history.*/.test(currentUrl)
  ) {
    await import('./pages/historyPage.scss')
    document.documentElement.classList.add('historyPage')
  }

  // watch later page 稍候再看页
  else if (
    /https?:\/\/(?:www\.)?bilibili\.com\/watchlater\/list.*/.test(currentUrl)
    || /https?:\/\/(?:www\.)?bilibili\.com\/watchlater\/#\/list.*/.test(currentUrl)
  ) {
    await import('./pages/watchLaterPage.scss')
    document.documentElement.classList.add('watchLaterPage')
  }

  // user note page 笔记页
  else if (/https?:\/\/space.bilibili\.com\.*\/v\/note-list/.test(currentUrl)) {
    await import('./pages/notePage.scss')
    document.documentElement.classList.add('notePage')
  }

  // user space page 空间页
  else if (/https?:\/\/space.bilibili\.com\.*/.test(currentUrl)) {
    await import('./pages/userSpacePage.scss')
    document.documentElement.classList.add('userSpacePage')
  }

  // search page 搜索结果页
  else if (/https?:\/\/search.bilibili\.com\.*/.test(currentUrl)) {
    await import('./pages/searchPage.scss')
    document.documentElement.classList.add('searchPage')
  }

  // video page 视频页
  else if (
    /https?:\/\/(?:www\.)?bilibili\.com\/video\/.*/.test(currentUrl)
    // watch later playlist 稍候再看播放页
    || /https?:\/\/(?:www\.)?bilibili\.com\/list\/watchlater.*/.test(currentUrl)
    // favorite playlist 收藏播放页
    || /https?:\/\/(?:www\.)?bilibili\.com\/list\/ml.*/.test(currentUrl)
    // 视频合集
    || /https?:\/\/(?:www\.)?bilibili\.com\/list\/.*/.test(currentUrl)
    // 节日活动页面
    || /https?:\/\/(?:www\.)?bilibili\.com\/festival\/.*/.test(currentUrl)
  ) {
    await import('./pages/videoPage.scss')
    document.documentElement.classList.add('videoPage')
  }

  // cheese video page 课堂影片播放页面
  else if (/^https?:\/\/(?:www\.)?bilibili\.com\/cheese\/play\/.*$/.test(currentUrl)) {
    await import('./pages/cheeseVideoPage.scss')
    document.documentElement.classList.add('cheeseVideoPage')
  }

  // cheese mine page 课堂个人页面
  else if (/^https?:\/\/(?:www\.)?bilibili\.com\/cheese\/mine\/.*$/.test(currentUrl)) {
    await import('./pages/cheeseminePage.scss')
    document.documentElement.classList.add('cheeseminePage')
  }

  else if (
    // anime playback & movie page 番剧播放页与电影播放页
    /https?:\/\/(?:www\.)?bilibili\.com\/bangumi\/play\/.*/.test(currentUrl)
  ) {
    await import('./pages/animePlayback&MoviePage.scss')
    document.documentElement.classList.add('animePlaybackAndMoviePage')
  }

  // anime page & chinese anime page 番剧页 与 国创动漫
  else if (
    /https?:\/\/(?:www\.)?bilibili\.com\/(?:anime|guochuang).*/.test(currentUrl)) {
    await import('./pages/animePage.scss')
    document.documentElement.classList.add('animePage')
  }

  // channel page e.g. tv shows, movie, variety shows & mooc pages 分区页
  else if (
    /https?:\/\/(?:www\.)?bilibili\.com\/(?:tv|movie|variety|mooc|documentary).*/.test(currentUrl)) {
    await import('./pages/channelPage.scss')
    document.documentElement.classList.add('channelPage')
  }

  // articles, articles list & articles ranking pages 专栏页, 专栏列表页, 专栏排行榜页
  else if (/https?:\/\/(?:www\.)?bilibili\.com\/read.*/.test(currentUrl)) {
    await import('./pages/articlesPage.scss')
    document.documentElement.classList.add('articlesPage')
  }

  // topic page 话题页
  else if (/https?:\/\/(?:www\.)?bilibili\.com\/v\/topic\/detail\/.*/.test(currentUrl)) {
    await import('./pages/topicPage.scss')
    document.documentElement.classList.add('topicPage')
  }

  // 404 page 404页
  else if (/^https?:\/\/(?:www\.)?bilibili\.com\/404.*$/.test(currentUrl)) {
    await import('./pages/error404Page.scss')
    document.documentElement.classList.add('error404Page')
  }

  // creative center page 创作中心页
  else if (/^https?:\/\/member\.bilibili\.com\/platform.*$/.test(currentUrl)) {
    await import('./forceDark.scss')
    document.documentElement.classList.add('forceDark')
    await import('./pages/creativeCenterPage.scss')
    document.documentElement.classList.add('creativeCenterPage')
  }

  // account settings page 帳戶設定頁，除了大會員頁
  else if (/^https?:\/\/account\.bilibili\.com\/(?!big).*$/.test(currentUrl)) {
    await import('./pages/accountSettingsPage.scss')
    document.documentElement.classList.add('accountSettingsPage')
  }

  // premium page bilibili 大會員頁
  else if (/^https?:\/\/account\.bilibili\.com\/big.*$/.test(currentUrl)) {
    await import('./pages/premiumPage.scss')
    document.documentElement.classList.add('premiumPage')
  }

  // login page 登入頁
  else if (/^https?:\/\/passport\.bilibili\.com\/.*$/.test(currentUrl)) {
    await import('./pages/loginPage.scss')
    document.documentElement.classList.add('loginPage')
  }

  // blackboard page 社区页面
  else if (/^https?:\/\/(?:www\.)?bilibili\.com\/blackboard.*$/.test(currentUrl)) {
    await import('./pages/blackboardPage.scss')
    document.documentElement.classList.add('blackboardPage')
  }

  // cheese page 课堂页面
  else if (/^https?:\/\/(?:www\.)?bilibili\.com\/cheese.*$/.test(currentUrl)) {
    await import('./pages/cheesePage.scss')
    document.documentElement.classList.add('cheesePage')
  }
}

setupStyles()
