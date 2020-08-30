import {createGlobalStyle} from'styled-components';
export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1598763765341'); /* IE9 */
  src: url('iconfont.eot?t=1598763765341#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1598763765341') format('woff'),
  url('iconfont.ttf?t=1598763765341') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1598763765341#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-random:before {
  content: "\e963";
}

.icon-tupian:before {
  content: "\e61a";
}

.icon-pause-mini:before {
  content: "\e957";
}

.icon-play-mini:before {
  content: "\e95d";
}

.icon-netease-music:before {
  content: "\e650";
}

.icon-accesspoint:before {
  content: "\e602";
}

.icon-thumb-up-outline:before {
  content: "\e8e6";
}

.icon-favorite-off:before {
  content: "\e8f9";
}

.icon-favorite:before {
  content: "\e8fa";
}

.icon-history:before {
  content: "\e903";
}

.icon-good:before {
  content: "\e935";
}

.icon-ic_fast_rewind:before {
  content: "\e94c";
}

.icon-ic_fast_forward:before {
  content: "\e94d";
}

.icon-ic_pause_circle_filled:before {
  content: "\e958";
}

.icon-ic_play_circle_filled:before {
  content: "\e959";
}

.icon-playlist-menu:before {
  content: "\e95f";
}

.icon-loop:before {
  content: "\e960";
}

.icon-loop-one:before {
  content: "\e961";
}

.icon-ic_replay:before {
  content: "\e962";
}

.icon-next:before {
  content: "\e964";
}

.icon-prev:before {
  content: "\e965";
}

.icon-volume-off:before {
  content: "\e96a";
}

.icon-volume:before {
  content: "\e96b";
}

.icon-arrow-down:before {
  content: "\e9e7";
}

.icon-arrow-left:before {
  content: "\e9e8";
}

.icon-arrow-right:before {
  content: "\e9e9";
}

.icon-arrow-up:before {
  content: "\e9ea";
}

.icon-ic_arrow_back:before {
  content: "\ea63";
}

.icon-ic_arrow_downward:before {
  content: "\ea66";
}

.icon-ic_arrow_forward:before {
  content: "\ea68";
}

.icon-ic_arrow_upward:before {
  content: "\ea69";
}

.icon-search:before {
  content: "\e6d1";
}

.icon-icon_Music:before {
  content: "\e62d";
}
`
