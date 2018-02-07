<template>
  <div class="media">
    <button @click="play">按钮</button>
      <div class="title">
        <span>文件名：</span>
        <span class="filename">花婆婆</span>
        <span>播放速度：</span>
        <span class="speed">125%</span>
      </div>
      <div class="wave">
        <div id="waveform"></div>
        <div id="waveform-timeline"></div>
      </div>      
      <div class="wave-controll">
        <ul ref="btns">
          <li class="left">
            <!-- id="playPausebutton" :class="{ 'on' : params.playPausebutton }" title="播放/暂停" -->
            <div title="慢放" id="skipBackwardbutton"></div>
            <div :class="{ 'on' : params.playPausebutton }" title="播放/暂停" id="playPausebutton"></div>
            <div title="快放" id="skipForwardbutton"></div>
            <div :class="{ 'on' : params.stopbutton }" title="停止" id="stopbutton"></div>
            <div :class="{ 'on' : params.toggleMutebutton }" class="sound" id="toggleMutebutton"></div>
            <div>
              <input id="volButton" type="range" min="0" max="1" value="0.8" step="0.01" />
            </div>
            <div title="放大" id="big"></div>
            <div title="缩小" id="small"></div>
            <div>VAD</div>
            <div>Trans</div>
            <div>自动显示转写</div>
          </li>
          <li class="right">
            <div>对不同声纹上色</div>
            <div>选择绿色部分</div>
            <div>选择蓝色部分</div>
            <div>？？</div>
            <div>剪切</div>
            <div>？？</div>
            <div>删除</div>
            <div>往前</div>
            <div>往后</div>
            <div>保存</div>
            <div></div>
          </li>
        </ul>
        
      </div>
   </div>
</template>
<script>
import axios from "axios"
import {mapActions,mapGetters} from 'vuex'
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
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
      audioPath: ""
    };
  },
  // computed: {
  //   getAudioPath(){
  //     return this.$store.state.audioPath
  //   }
  // },
  // watch: {
  //   getAudioPath(){
  //     // this.audioPath = this.getaudioPath()
  //     // console.log("audioPath1111111111")
  //     // console.log(this.audioPath)
  //     // this.loadAudio(this.audioPath)
  //     this.loadAudio(this.$store.state.audioPath);
  //     // this.loadAudio(`http://${BASE_API}${this.audioPath}`)
  //     // new Promise(() => this.showWavesurfer());
  //   }
  // },
  watch: {
    audioPath(){
      // this.showWavesurfer();
    }
  },
  methods: {
    ...mapActions(['AUDIO_PATH']),
    ...mapGetters(['getaudioPath']),
    //wavesurfer初始化 flag:标记无效音
    showWavesurfer(flag = false) {
      console.log(this.audioPath);
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
        height: 100,
        plugins: [
          TimelinePlugin.create({
            container: "#waveform-timeline",
            fontSize: 14,
            primaryFontColor: "#9499df",
            secondaryFontColor: "#9499df",
            primaryColor: "#9499df",
            secondaryColor: "#9499df",
            height:26
          }),
          RegionsPlugin.create({
            // plugin options ...
          })
        ]
      });
      /* 将创建的实例绑定到wavesurfer上，以供外面通过this调用 */
      this.wavesurfer = wavesurfer;
      /* 调用存在store中的文件路径 加载音频 */
      // this.loadAudio(this.$store.state.audioPath);
      console.log(this.audioPath);
      this.loadAudio(this.audioPath);
      // this.wavesurfer.load("../../../static/audio/乔颖_G_1.wav");
      // this.loadAudio("http://192.168.1.65:8080/api/pcm/auto/20180126/f01秦燕_f-秦燕-17241734-16k-33.wav");
      // this.loadAudio(this.audioPath);
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
        // this.skipBackwardbutton();
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
      // this.playPausebutton();
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
      // this.wavesurfer.load(data);
    },
    downloadVoice() {},
    vad() {},
    play() {
      axios({
        url: "http://localhost:9000/api/getaudiopath"
      }).then(res => {
        // console.log(res.data);
        // this.isShow = true;
        this.audioPath = res.data.result;
        this.showWavesurfer();
        // console.log(this.audioPath);
        // this.AUDIO_PATH(res.data.result);
      })
    }
  },
  created() {
    axios({
        url: "http://localhost:9000/api/getaudiopath"
      }).then(res => {
        // console.log(res.data);
        // this.isShow = true;
        console.log(res.data.result);
        this.audioPath = res.data.result;
        console.log(this.audioPath);
        // this.AUDIO_PATH(res.data.result);
      })
  },
  mounted() {
  //  new Promise(() => this.showWavesurfer());
  }
};
</script>
<style lang="scss" scoped>
.media {
    margin-top: 10px;
    width: 100%;
    // height: 235px;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgba(55, 56, 66, 0.95);
    >span {
      color: #9395a2;
      &:nth-child(2n) {
        color: #eff0f6;
      }
      &:first-child {
        margin-left:20px;
      }
      &:nth-child(3) {
        margin-left:60px;
      }
    }
  }
  .wave {
      width: 100%;
      height: 126px;
      background-color: #303036;
  }
  .wave-controll{
      width: 100%;
      height: 40px;
      background-color: #40414b;
      >ul{
        display: flex;
        height: 40px;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          justify-content: space-between;
          >div {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin-right: 1px;
            border-right: 1px solid #9395a2;
            border-left: 1px solid #9395a2;
            font-size: 12px;
            color: #9395a2;
            &:first-child{
              background: url('../../images/慢放0.png') no-repeat center;
              border-left: none;
            }
            &:first-child:hover{
              background: url("../../images/慢放1.png") no-repeat center;
            }
            &:nth-child(2){
              background: url("../../images/暂停0.png") no-repeat center;
            }
            &:nth-child(2).on{
              background: url("../../images/播放0.png") no-repeat center;
            }
            &:nth-child(3){
              background: url("../../images/快放0.png") no-repeat center;
            }
            &:nth-child(3):hover{
              background: url("../../images/快放1.png") no-repeat center;
            }
            &:nth-child(4){
              background: url("../../images/停止0.png") no-repeat center;
            }
            &:nth-child(4):hover{
              background: url("../../images/停止1.png") no-repeat center;
            }
            &:nth-child(5){
              background: url("../../images/静音0.png") no-repeat center;
              border-right: none;
            }
            &:nth-child(5):hover{
              background: url("../../images/静音1.png") no-repeat center;
            }
            &.sound.on{
              background: url("../../images/音量0.png") no-repeat center;
            }
            &.sound.on:hover{
              background: url("../../images/音量1.png") no-repeat center;
            }
            &:nth-child(6){
              width: 100px;
              border-left: none;
              line-height: 35px;
              >input{
                -webkit-appearance: none;
                -moz-appearance: none;
                -ms-appearance: none;
                width: 80px;
                height: 2px;
                background-color: #bbbbbb;
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
            &:nth-child(7){
              background: url("../../images/lachang.png") no-repeat center;
            }
            &:nth-child(7):hover{
              background: url("../../images/音轨拉长1.png") no-repeat center;
            }
            &:nth-child(8){
              background: url("../../images/suoduan.png") no-repeat center;
            }
            &:nth-child(8):hover{
              background: url("../../images/音轨缩短1.png") no-repeat center;
            }
            &:nth-child(10){
              width: 50px;
            }
            &:nth-child(11){
              width: 100px;
            }
          }
            
            
          // &:nth-child(9){
          //   margin-right: 20px;
          //   background: url("../../images/下载0.png") no-repeat;
          //   background-size: 18px 18px;
          //   margin-left: auto;
          // }
          // &:nth-child(9):hover{
          //   background: url("../../images/下载1.png") no-repeat;
          //   background-size: 18px 18px;

          // }
          
          
        }
        .right {
          display: flex;
          justify-content: space-between;
          >div {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin-right: 1px;
            border-right: 1px solid #9395a2;
            border-left: 1px solid #9395a2;
            font-size: 12px;
            color: #9395a2;
            &:first-child{
              width: 100px;
            }
            &:first-child:hover{
              color: #fff;
            }
            &:nth-child(2){
              width: 80px;
            }
            &:nth-child(2):hover{
              color: #fff;
            }
            &:nth-child(3){
              width: 80px;
            }
            &:nth-child(3):hover{
              color: #fff;
            }
            &:last-child {
              background: url("../../images/下载0.png") no-repeat center;
            }
            &:last-child:hover {
              background: url("../../images/下载1.png") no-repeat center;
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
