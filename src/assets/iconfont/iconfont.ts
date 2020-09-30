import {createGlobalStyle} from 'styled-components';
export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1601289669494'); /* IE9 */
  src: url('iconfont.eot?t=1601289669494#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1601289669494') format('woff'),
  url('iconfont.ttf?t=1601289669494') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1601289669494#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-delete:before {
  content: "\e60e";
}

.icon-ic_chat_bubble_outline:before {
  content: "\e970";
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
}`
