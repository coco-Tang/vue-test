<template>
  <div class="media">
      <div class="wave">
        <div id="waveform"></div>
        <div id="waveform-timeline"></div>
      </div>      
      <div class="wave-controll">
        <ul ref="btns">
          <li id="skipBackwardbutton"  title="慢放"></li>
          <li id="playPausebutton" :class="{ 'on' : params.playPausebutton }" title="播放/暂停"></li>
          <li id="skipForwardbutton"  title="快放"></li>
          <li id="stopbutton" :class="{ 'on' : params.stopbutton }" title="停止"></li>
          <li id="toggleMutebutton" :class="{ 'on' : params.toggleMutebutton }" class="sound"></li>
          <li id="sound">
            <input id="volButton" type="range" min="0" max="1" value="0.8" step="0.01" />
          </li>
          <li id="big" title="放大"></li>
          <li id="small" title="缩小"></li>
          <li id="downLoad"  @click="downloadVoice()"></li>
        </ul>
        
      </div>
   </div>
</template>
<script>
// import {mapActions,mapGetters} from 'vuex'
import WaveSurfer from "wavesurfer.js";
// import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
// import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
// import HtmlInit from "wavesurfer.js/dist/wavesurfer-html-init.min.js"

export default {
  data() {
    return {
      params: {
        vad: false,
        playPausebutton: false,
        stopbutton: false,
        toggleMutebutton: true,
        zoomValue: 0
      },
    };
  },
  computed: {
    getAudioPath(){
      return this.$store.state.audioPath
    }
  },
  watch: {
    getAudioPath(){
      // this.audioPath = this.getaudioPath()
      // console.log("audioPath1111111111")
      // console.log(this.audioPath)
      // this.loadAudio(this.audioPath)
      this.loadAudio(this.$store.state.audioPath);
      // this.loadAudio(`http://${BASE_API}${this.audioPath}`)
      // new Promise(() => this.showWavesurfer());
    }
  },
  methods: {
    // ...mapActions(['AUDIO_PATH']),
    // ...mapGetters(['getaudioPath']),
    //wavesurfer初始化 flag:标记无效音
    showWavesurfer(flag = false) {
      //创建wavesurfer实例
      let wavesurfer = WaveSurfer.create({
        container: "#waveform",
        cursorColor: "#999",
        audioRate: 1,
        scrollParent: true,
        backend: "MediaElement",
        barHeight: 1.5,
        waveColor: "#6983f4",
        progressColor: "#36a002",
        loaderColor: "#36a002",
        hideScrollbar: false,
        autoCenter: true,
        height: 130,
        // plugins: [
        //   TimelinePlugin.create({
        //     container: "#waveform-timeline",
        //     fontSize: 14,
        //     primaryFontColor: "#9499df",
        //     secondaryFontColor: "#9499df",
        //     primaryColor: "#9499df",
        //     secondaryColor: "#9499df",
        //     height:30
        //   }),
        //   RegionsPlugin.create({
        //     // plugin options ...
        //   })
        // ]
      });
      /* 将创建的实例绑定到wavesurfer上，以供外面通过this调用 */
      this.wavesurfer = wavesurfer;
      /* 调用存在store中的文件路径 加载音频 */
      // this.loadAudio(this.$store.state.audioPath);
      // this.loadAudio();
      this.wavesurfer.load("http://music.163.com/#/playlist?id=2055039835");
      // 初始化按钮
      this.btnInit();
      //无效音跳过
      if (!flag) {
        
      }
      //加载完成即刻播放
      wavesurfer.on("ready", () => {
        // this.wavePlay()自动播放
        this.wavesurfer.zoom(0);
      });
    },
    // 初始化按钮
    btnInit() {
        const defaultRate = 1,
        perRate = 0.25,
        defaultVol = 0.5;

      //慢放
      document.getElementById("skipBackwardbutton").onclick = () => {
        let playBackwardRate = this.wavesurfer.getPlaybackRate();
        if (this.wavesurfer.getPlaybackRate() == 0.5) {
          this.$message({
            message: this.params.playRate + "倍",
            duration: 500
          });
          return;
        }
        this.params.playRate = playBackwardRate - perRate;
        this.wavesurfer.setPlaybackRate(this.params.playRate);
        this.$message({
          message: this.params.playRate + "倍",
          duration: 500
        });
      };

      //快放
      document.getElementById("skipForwardbutton").onclick = () => {
        let playBackwardRate = this.wavesurfer.getPlaybackRate();
        if (this.wavesurfer.getPlaybackRate() == 4) {
          this.$message({
            message: this.params.playRate + "倍",
            duration: 500
          });
          return;
        }
        this.params.playRate = playBackwardRate + perRate;
        this.wavesurfer.setPlaybackRate(this.params.playRate);
        this.$message({
          message: this.params.playRate + "倍",
          duration: 500
        });
      };

      //播放/暂停
      document.getElementById("playPausebutton").onclick = () => {
        this.wavePlay();
      };

      //停止
      document.getElementById("stopbutton").onclick = () => {
        this.params.playPausebutton = false;
        this.wavesurfer.stop();
        this.wavesurfer.play(0, 0.01);
        this.initWavesurferStatus();
      };

      //静音开关
      document.getElementById("toggleMutebutton").onclick = () => {
        if (this.params.toggleMutebutton) {
          this.wavesurfer.setVolume(0);
          this.params.toggleMutebutton = false;
          document.getElementById("volButton").value = 0;
        } else {
          this.wavesurfer.setVolume(1);
          this.params.toggleMutebutton = true;
          document.getElementById("volButton").value = 1;
        }
      };
      //放大 缩小
      document.getElementById("big").onclick = () => {
        if (this.params.zoomValue >= 100) {
          return;
        }
        this.params.zoomValue += 10;
        this.wavesurfer.zoom(this.params.zoomValue);
      };

      document.getElementById("small").onclick = () => {
        if (this.params.zoomValue <= 0) {
          return;
        }
        this.params.zoomValue -= 10;
        this.wavesurfer.zoom(this.params.zoomValue);
      };

      //滚轮控制放大、缩小功能
      document.getElementById("waveform").onmousewheel = e => {
        // console.log(e)
        if (e.deltaY < 0) {
          document.getElementById("small").click();
        } else {
          document.getElementById("big").click();
        }
      };
      //音量条
      this.volumeBar();
    },
    // 播放/暂停
    wavePlay(start, end) {
      let wavesurfer = this.wavesurfer;
      wavesurfer.on("finish", () => {
        this.params.playPausebutton = false;
      });
      start == null ? wavesurfer.playPause() : wavesurfer.play(start, end);
      if (!wavesurfer.isPlaying()) {
        this.params.playPausebutton = false;
        // this.ISPLAY(this.isplay)
        // if(this.params.displayTime){
        //   clearInterval(this.params.displayTime)
        // }
      } else {
        this.params.playPausebutton = true;
        // this.ifPlay()

        this.isplay = true;
        // this.ISPLAY(this.isplay)
      }
    },
    initWavesurferStatus() {
      let wavesurfer = this.wavesurfer;
      if (wavesurfer.isMuted) {
        wavesurfer.toggleMute();
      }
    },
    // 音量条
    volumeBar() {
      let flag = false;
      let volButton = document.getElementById("volButton");
      volButton.onmousedown = () => {
        flag = true;
      };
      volButton.onmousemove = e => {
        if (!flag) {
          return;
        }
        if (e.offsetX >= 0 && e.offsetX <= 80) {
          this.params.toggleMutebutton = true;
          this.wavesurfer.setVolume(e.offsetX / 80);
        } else if (e.offsetX < 0) {
          this.params.toggleMutebutton = false;
          this.wavesurfer.setVolume(0);
        } else {
          this.wavesurfer.setVolume(1);
        }
      };
    },
    loadAudio(data) {
      // console.log("loadAudio");
      console.log(data);
      
    },
    downloadVoice() {},
    vad() {}
  },
  mounted() {
   new Promise(() => this.showWavesurfer());
  }
};
</script>
<style lang="scss" scoped>
ul,li {
  list-style: none;
}
.media {
    margin-top: 10px;
    width: 100%;
    height: 235px;
  .wave {
      width: 100%;
      // height: 160px;
      // flex-basis:128px;
      background-color: #303036;
      flex-shrink: 0;
  }
  .wave-controll{
      width: 100%;
      height: 45px;
      background-color: #40414b;
      flex-shrink: 0;
      ul{
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        flex-direction: row;
        height: 45px;
        li{
          width: 18px;
          height: 18px;
          margin-top: 15px;
          &.sound.on{
            background: url("../../images/音量0.png") no-repeat;
            background-size: 18px 18px;
          }

          &.sound.on:hover{
           background: url("../../images/音量1.png") no-repeat;
           background-size: 18px 18px;
          }
          &:nth-child(1){
            margin-left: 28px;
            background: url('../../images/慢放0.png') no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(1):hover{
            background: url("../../images/慢放1.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(2){
            margin-left: 30px;
            background: url("../../images/暂停0.png") no-repeat;
            background-size: 18px 18px;
          }

          &:nth-child(2).on{
            background: url("../../images/播放0.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(2):hover::after{

            display: block;
            content: "";
            width: 0.1px;
            height: 0.1px;
            border-radius: .05px;
            box-shadow: 0 0 16px 10px #fff;
            position: relative;
            top: 08px;
            right: -09px;
            background-color: #fff;
          }
          &:nth-child(3){
            margin-left: 30px;
            background: url("../../images/快放0.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(3):hover{
            background: url("../../images/快放1.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(4){
            margin-left: 20px;
            background: url("../../images/停止0.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(4):hover{
            background: url("../../images/停止1.png") no-repeat;
            background-size: 18px 18px;
          }

          &:nth-child(5){
            margin-left:30px;
            background: url("../../images/静音0.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(5):hover{
            background: url("../../images/静音1.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(6){
            margin-left: 14px;
            width: 80px;
            margin-top: 23px;
            position: relative;
          }
          &:nth-child(6) div{
          }
          &:nth-child(6) div span{
          }

          &:nth-child(7){
            margin-left: 30px;
            background: url("../../images/lachang.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(7):hover{
            background: url("../../images/音轨拉长1.png") no-repeat;
            background-size: 18px 18px;
          }

          &:nth-child(8){
            margin-left: 14px;
            background: url("../../images/suoduan.png") no-repeat;
            background-size: 18px 18px;
          }
          &:nth-child(8):hover{
            background: url("../../images/音轨缩短1.png") no-repeat;
            background-size: 18px 18px;
          }
          
          &:nth-child(9){
            margin-right: 20px;
            background: url("../../images/下载0.png") no-repeat;
            background-size: 18px 18px;
            margin-left: auto;
          }
          &:nth-child(9):hover{
            background: url("../../images/下载1.png") no-repeat;
            background-size: 18px 18px;

          }
          
          input{
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            width: 80px;
            height: 2px;
            background-color: #bbbbbb;
            position: absolute;
            left: 0;

            &::-webkit-slider-thumb{
              -webkit-appearance: none;
            }
            &::-moz-range-trackpseduo{
              -moz-appearance: none;
            }
            &::-ms-track {
              width: 100%;
              cursor: pointer;
              background: transparent; /* Hides the slider so custom styles can be added */
              border-color: transparent; color: transparent;
            }
            &:focus{
              outline: none;
            }
            &::-webkit-slider-thumb{
                -webkit-appearance: none;
                height: 9px;
                width: 9px;
                margin-top: -1px;
                background: #bbb;
                border-radius: 50%;
                border: solid 0.125em rgba(205, 224, 230, 0.5);
            }
            &::-moz-range-thumb{
                -moz-appearance: none;
                height: 6px;
                width: 6px;
                margin-top: -1px;
                background: #bbb;
                border-radius: 50%;
                border: solid 0.125em rgba(205, 224, 230, 0.5);
            }
            &::-ms-track{
                -moz-appearance: none;
                height: 6px;
                width: 6px;
                margin-top: -1px;
                background: #bbb;
                border-radius: 50%;
                border: solid 0.125em rgba(205, 224, 230, 0.5);
            }
          }
        }

      }
    }
}
#waveform {
  background-color: rgba(0, 0, 0, 0.9);
}

</style>
