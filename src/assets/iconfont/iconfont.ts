import {createGlobalStyle} from'styled-components';
export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1598521947781'); /* IE9 */
  src: url('iconfont.eot?t=1598521947781#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1598521947781') format('woff'),
  url('iconfont.ttf?t=1598521947781') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1598521947781#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
