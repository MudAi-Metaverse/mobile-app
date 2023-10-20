export const loadingCss = `


.comp {
  position: relative;
  display: block;
  width: 375px;
  height: 375px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: perspective(1000px) rotateY(45deg) rotateX(45deg);
  transform: perspective(1000px) rotateY(45deg) rotateX(45deg);
}

.circleWrap {
  position: absolute;
  -webkit-animation-name: spin;
  animation-name: spin;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  linear-easing-function: linear;
}

.circleWrap:nth-child(0) {
  left: 0px;
  top: 0px;
  width: 375px;
  height: 375px;
  -webkit-animation-duration: Infinitys;
  animation-duration: Infinitys;
}
.circleWrap:nth-child(0) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(0) {
  -webkit-animation-iteration-count: 0;
  animation-iteration-count: 0;
}

.circleWrap:nth-child(1) {
  left: 11.71875px;
  top: 11.71875px;
  width: 351.5625px;
  height: 351.5625px;
  -webkit-animation-duration: 12s;
  animation-duration: 12s;
}
.stopAnim .circleWrap:nth-child(1) {
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

.circleWrap:nth-child(2) {
  left: 23.4375px;
  top: 23.4375px;
  width: 328.125px;
  height: 328.125px;
  -webkit-animation-duration: 6s;
  animation-duration: 6s;
}
.circleWrap:nth-child(2) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(2) {
  -webkit-animation-iteration-count: 2;
  animation-iteration-count: 2;
}

.circleWrap:nth-child(3) {
  left: 35.15625px;
  top: 35.15625px;
  width: 304.6875px;
  height: 304.6875px;
  -webkit-animation-duration: 4s;
  animation-duration: 4s;
}
.stopAnim .circleWrap:nth-child(3) {
  -webkit-animation-iteration-count: 3;
  animation-iteration-count: 3;
}

.circleWrap:nth-child(4) {
  left: 46.875px;
  top: 46.875px;
  width: 281.25px;
  height: 281.25px;
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
}
.circleWrap:nth-child(4) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(4) {
  -webkit-animation-iteration-count: 4;
  animation-iteration-count: 4;
}

.circleWrap:nth-child(5) {
  left: 58.59375px;
  top: 58.59375px;
  width: 257.8125px;
  height: 257.8125px;
  -webkit-animation-duration: 2.4s;
  animation-duration: 2.4s;
}
.stopAnim .circleWrap:nth-child(5) {
  -webkit-animation-iteration-count: 5;
  animation-iteration-count: 5;
}

.circleWrap:nth-child(6) {
  left: 70.3125px;
  top: 70.3125px;
  width: 234.375px;
  height: 234.375px;
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}
.circleWrap:nth-child(6) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(6) {
  -webkit-animation-iteration-count: 6;
  animation-iteration-count: 6;
}

.circleWrap:nth-child(7) {
  left: 82.03125px;
  top: 82.03125px;
  width: 210.9375px;
  height: 210.9375px;
  -webkit-animation-duration: 1.7142857143s;
  animation-duration: 1.7142857143s;
}
.stopAnim .circleWrap:nth-child(7) {
  -webkit-animation-iteration-count: 7;
  animation-iteration-count: 7;
}

.circleWrap:nth-child(8) {
  left: 93.75px;
  top: 93.75px;
  width: 187.5px;
  height: 187.5px;
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
}
.circleWrap:nth-child(8) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(8) {
  -webkit-animation-iteration-count: 8;
  animation-iteration-count: 8;
}

.circleWrap:nth-child(9) {
  left: 105.46875px;
  top: 105.46875px;
  width: 164.0625px;
  height: 164.0625px;
  -webkit-animation-duration: 1.3333333333s;
  animation-duration: 1.3333333333s;
}
.stopAnim .circleWrap:nth-child(9) {
  -webkit-animation-iteration-count: 9;
  animation-iteration-count: 9;
}

.circleWrap:nth-child(10) {
  left: 117.1875px;
  top: 117.1875px;
  width: 140.625px;
  height: 140.625px;
  -webkit-animation-duration: 1.2s;
  animation-duration: 1.2s;
}
.circleWrap:nth-child(10) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(10) {
  -webkit-animation-iteration-count: 10;
  animation-iteration-count: 10;
}

.circleWrap:nth-child(11) {
  left: 128.90625px;
  top: 128.90625px;
  width: 117.1875px;
  height: 117.1875px;
  -webkit-animation-duration: 1.0909090909s;
  animation-duration: 1.0909090909s;
}
.stopAnim .circleWrap:nth-child(11) {
  -webkit-animation-iteration-count: 11;
  animation-iteration-count: 11;
}

.circleWrap:nth-child(12) {
  left: 140.625px;
  top: 140.625px;
  width: 93.75px;
  height: 93.75px;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}
.circleWrap:nth-child(12) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(12) {
  -webkit-animation-iteration-count: 12;
  animation-iteration-count: 12;
}

.circleWrap:nth-child(13) {
  left: 152.34375px;
  top: 152.34375px;
  width: 70.3125px;
  height: 70.3125px;
  -webkit-animation-duration: 0.9230769231s;
  animation-duration: 0.9230769231s;
}
.stopAnim .circleWrap:nth-child(13) {
  -webkit-animation-iteration-count: 13;
  animation-iteration-count: 13;
}

.circleWrap:nth-child(14) {
  left: 164.0625px;
  top: 164.0625px;
  width: 46.875px;
  height: 46.875px;
  -webkit-animation-duration: 0.8571428571s;
  animation-duration: 0.8571428571s;
}
.circleWrap:nth-child(14) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(14) {
  -webkit-animation-iteration-count: 14;
  animation-iteration-count: 14;
}

.circleWrap:nth-child(15) {
  left: 175.78125px;
  top: 175.78125px;
  width: 23.4375px;
  height: 23.4375px;
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
}
.stopAnim .circleWrap:nth-child(15) {
  -webkit-animation-iteration-count: 15;
  animation-iteration-count: 15;
}

.circleWrap:nth-child(16) {
  left: 187.5px;
  top: 187.5px;
  width: 0px;
  height: 0px;
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
}
.circleWrap:nth-child(16) .circle {
  border: 2px dashed #000;
}
.stopAnim .circleWrap:nth-child(16) {
  -webkit-animation-iteration-count: 16;
  animation-iteration-count: 16;
}

.circle {
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 50%;
  -webkit-mask: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff)) content-box, -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  background: linear-gradient(#fff 0 0) padding-box, linear-gradient(259.45deg, #57e4ff -4.54%, #8b95f2 26.9%, #8b72ee 49.6%, #8556ea 68.49%, #4138e5 116.24%) border-box;
}

.circleWrap:last-child {
  display: none;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg);
    transform: rotateX(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg);
    transform: rotateX(360deg);
  }
}
`;
