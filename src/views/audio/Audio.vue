<template>
  <div class="media">
    <input type="file" name="" @change="getfilelist" ref="resource">
    <button @click="one">按钮</button>
    <button @click="two">按钮2</button>
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
            <div @click="paste">粘贴</div>
            <div @click="cut">剪切</div>
            <div @click="copy">复制</div>
            <div @click="del">删除</div>
            <div>往前</div>
            <div>往后</div>
            <div>保存</div>
            <div></div>
          </li>
        </ul>
        
      </div>
      <!-- <canvas id="canvas"></canvas>
      <div>test</div> -->
   </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import $ from "jquery";
import Editor from "../../utils/editor";
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
      screenHeight: document.body.clientHeight - 100,
      screenWidth: document.body.clientWidth,
      FileData: []
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
    audioPath() {
      // this.showWavesurfer();
    },
    screenHeight(val) {
      // console.log(val);
      this.screenHeight = val;
    },
    screenWidth(val) {
      this.screenWidth = val;
    }
  },
  methods: {
    showWavesurfer(url,flag) {
      let wavesurfer = WaveSurfer.create({
        container: "#waveform",
        cursorColor: "#999",
        audioRate: 1,
        scrollParent: true,
        backend: "WebAudio",
        barHeight: 1.5,
        waveColor: "#6983f4",
        progressColor: "#36a002",
        loaderColor: "#36a002",
        hideScrollbar: false,
        autoCenter: true,
        height: 228,
        plugins: [
          TimelinePlugin.create({
            container: "#waveform-timeline",
            fontSize: 14,
            primaryFontColor: "#9499df",
            secondaryFontColor: "#9499df",
            primaryColor: "#9499df",
            secondaryColor: "#9499df"
          }),
          RegionsPlugin.create({}),
          SpectrogramPlugin.create({
            
          })
        ]
      });
      wavesurfer.on("ready", percents => {
        this.wavesurfer.disableDragSelection();
        this.wavesurfer.enableDragSelection({ color: "rgba(0, 180, 0, 0.3)" });
      });
      wavesurfer.on("finish", function() {});

      document.querySelector("#waveform").addEventListener("mousedown", () => {
        this.wavesurfer.clearRegions();
      });

      this.wavesurfer = wavesurfer;

      this.btnInit();

if (flag) {
console.log('url')
  wavesurfer.load(url);
 } else {
   console.log('file/blob')
   wavesurfer.loadBlob(url);

 }


      this.e = Editor.Editor.init(this.wavesurfer);
    },
    //按钮初始化
    btnInit() {
      var that = this;
      var defaultRate = 1,
        perRate = 0.25,
        defaultVol = 0.5;
      // var wavesurfer=this.wavesurfer
      // var zoomValue=this.params.zoomValue
      //慢放
      $("#skipBackwardbutton").on("click", function() {
        var playBackwardRate = that.wavesurfer.getPlaybackRate();
        if (that.wavesurfer.getPlaybackRate() == 0.5) {
          that.$message({
            message: that.params.playRate + "倍",
            duration: 500
          });
          return;
        }
        // console.log(playBackwardRate - perRate)

        that.params.playRate = playBackwardRate - perRate;
        that.wavesurfer.setPlaybackRate(that.params.playRate);

        that.$message({
          message: that.params.playRate + "倍",
          duration: 500
        });
      });
      //快放
      $("#skipForwardbutton").on("click", function() {
        var playBackwardRate = that.wavesurfer.getPlaybackRate();
        // console.log(playBackwardRate + perRate)

        if (that.wavesurfer.getPlaybackRate() == 4) {
          that.$message({
            message: that.params.playRate + "倍",
            duration: 500
          });
          return;
        }

        that.params.playRate = playBackwardRate + perRate;
        that.wavesurfer.setPlaybackRate(that.params.playRate);

        that.$message({
          message: that.params.playRate + "倍",
          duration: 500
        });
      });
      //播放/暂停
      $("#playPausebutton").on("click", function() {
        // alert(2)
        that.wavePlay();
        //wavesurfer.playPause();
      });
      //停止
      $("#stopbutton").on("click", function() {
        // console.log("***************************===》stop");

        $("#playPausebutton").removeClass("on");
        that.wavesurfer.stop();
        that.wavesurfer.play(0, 0.01);
        that.initWavesurferStatus();
      });
      //静音开关
      $("#toggleMutebutton").on("click", function() {
        if ($(this).hasClass("on")) {
          $(this).removeClass("on");
          that.wavesurfer.setVolume(0);
          $("#volButton").val("0");
        } else {
          $(this).addClass("on");
          that.wavesurfer.setVolume(1);
          $("#volButton").val("1");
        }
      });

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
      // document.getElementById("waveform").onmousewheel = e => {
      //   // console.log(e)
      //   if (e.deltaY < 0) {
      //     document.getElementById("small").click();
      //   } else {
      //     document.getElementById("big").click();
      //   }
      // };
      //音量条
      this.volumeBar();
    },

    //获取合路音频
    //音量条
    volumeBar() {
      // var wavesurfer = this.wavesurfer
      var flag = false;
      var that = this;
      $("#volButton").on("mousedown", function() {
        flag = true;
      });
      $("#volButton").on("mousemove", function(e) {
        if (!flag) {
          return;
        }
        if (e.offsetX >= 0 && e.offsetX <= 80) {
          $("#toggleMutebutton").addClass("on");
          that.wavesurfer.setVolume(e.offsetX / 80);
        } else if (e.offsetX < 0) {
          $("#toggleMutebutton").removeClass("on");
          that.wavesurfer.setVolume(0);
        } else {
          that.wavesurfer.setVolume(1);
        }
      });
      $("#volButton").on("mouseup", function() {
        flag = false;
        // if(this.value == 0){
        // 	$("#toggleMutebutton").removeClass("on");
        // }else{
        // 	$("#toggleMutebutton").addClass("on");
        // }
        this.value == 0
          ? $("#toggleMutebutton").removeClass("on")
          : $("#toggleMutebutton").addClass("on");
        that.wavesurfer.setVolume($(this).val());
      });
    },
    initWavesurferStatus() {
      var wavesurfer = this.wavesurfer;
      if (wavesurfer.isMuted) {
        wavesurfer.toggleMute();
      }
    },

    toSecond(str) {
      var Temp = str.split(":");
      var Seconds =
        3600 * Number(Temp[0]) + 60 * Number(Temp[1]) + Number(Temp[2]);
      return Seconds;
    },

    //播放、暂停
    wavePlay(start, end) {
      var wavesurfer = this.wavesurfer;
      start == null ? wavesurfer.playPause() : wavesurfer.play(start, end);

      if (!wavesurfer.isPlaying()) {
        // console.log("***************************====》pause ");
        $("#playPausebutton").removeClass("on");
        //   if(this.params.displayTime){
        // 	clearInterval(this.params.displayTime)
        // }
      } else {
        // console.log("***************************===》play");
        $("#playPausebutton").addClass("on");
        // this.ifPlay()
        //同步显示功能
        // syncDisplay(data);
      }
    },
    //加色块
    waveRegion(start, end, color, clear) {
      if (!clear) {
        this.wavesurfer.clearRegions();
      }

      this.wavesurfer.addRegion({
        start: start,
        end: end,
        color: color,
        drag: false
      });
    },

    playRate() {
      this.$message({
        message: this.params.playRate + "倍",
        duration: 500
      });
    },
    uploadMessage() {
      this.$message({
        message: "上传成功",
        type: "success",
        duration: 2000
      });
    },
    cancelMessage() {
      this.$message({
        message: "取消上传",
        type: "warning",
        duration: 2000
      });
    },
    returnlist() {
      this.$router.push({ path: "/wave" });
    },
    //解除绑定
    unbindjq() {
      $("#skipBackwardbutton").unbind();
      $("#skipForwardbutton").unbind();
      $("#playPausebutton").unbind();
      $("#stopbutton").unbind();
      $("#playPausebutton").unbind();
      $("#toggleMutebutton").unbind();
      $("#volButton").unbind();
      $("#big").unbind();
      $("#small").unbind();
      $("#waveform").unbind();
      $("#vad").unbind();
    },

    cut() {
      this.e.cut();
      // this.wavesurfer.clearRegions()
      // console.log('this.e.clipboard')
      // console.log(this.e)
    },
    copy() {
      // this.wavesurfer.clearRegions()
      this.copyData = this.e.copy();
      console.log(this.copyData);
    },
    paste() {
      // this.wavesurfer.clearRegions()
      this.e.paste();
    },
    del() {
      // this.wavesurfer.clearRegions()
      this.e.del();
    },
    redo() {
      // this.wavesurfer.clearRegions()
      this.e.redo();
    },
    undo() {
      // this.wavesurfer.clearRegions()
      this.e.undo();
    },
    downLoad() {
      console.log("downLoad");
      // console.log(this.wavesurfer.backend.buffer)
      // var arraybuffer = this.wavesurfer.backend.buffer.getChannelData(0)
      // var blob = new Blob([arraybuffer]);

      // console.log(this.copyData)
      var blob = this.createWavBlob();

      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.innerHTML = "download";

      // 指定生成的文件名
      a.download = "demo";
      // document.body.appendChild(a)
      a.click();
      window.URL.revokeObjectURL(a.href);

      // this.wavesurfer.loadBlob(blob)
    },
    createWavBlob() {
      var buf = this.wavesurfer.backend.buffer;

      var data1 = buf.getChannelData(0);
      var data = this.copyData[0];
      console.log(data1.data);
      var wav = this.encodeWAV(data, buf.sampleRate);
      var blob = new Blob([wav], { type: "audio/wav" });
      return blob;
    },
    writeString(view, offset, string) {
      for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    },
    floatTo16BitPCM(output, offset, input) {
      for (var i = 0; i < input.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
    },
    encodeWAV(samples, sampleRate) {
      var writeString = this.writeString;
      var floatTo16BitPCM = this.floatTo16BitPCM;

      var buffer = new ArrayBuffer(44 + samples.length * 2);
      var view = new DataView(buffer);

      /* RIFF identifier */
      writeString(view, 0, "RIFF");
      /* file length */
      view.setUint32(4, 32 + samples.length * 2, true);
      /* RIFF type */
      writeString(view, 8, "WAVE");
      /* format chunk identifier */
      writeString(view, 12, "fmt ");
      /* format chunk length */
      view.setUint32(16, 16, true);
      /* sample format (raw) */
      view.setUint16(20, 1, true);
      /* channel count */
      view.setUint16(22, 1, true);
      /* sample rate */
      view.setUint32(24, sampleRate, true);
      /* byte rate (sample rate * block align) */
      view.setUint32(28, sampleRate * 2, true);
      /* block align (channel count * bytes per sample) */
      view.setUint16(32, 2, true);
      /* bits per sample */
      view.setUint16(34, 16, true);
      /* data chunk identifier */
      writeString(view, 36, "data");
      /* data chunk length */
      view.setUint32(40, samples.length * 2, true);

      floatTo16BitPCM(view, 44, samples);

      return view;
    },
    getfilelist () {
      let FileList = Array.prototype.slice.call(this.$refs.resource.files);
      FileList.map((file, index) => {
        if (index < 9) {
          this.FileData.push(file);
        } else {
          return;
        }
      });
      // console.log()
    },
    one() {
      // this.getfilelist()
      console.log(this.FileData);
      let file = this.FileData[0];
      this.showWavesurfer(file);
      return;
      let data = this.e.copy();
      let wavesurfer = this.wavesurfer;
      let audiobuffer = this.e.arrayBuf2audioBuf(data,wavesurfer);
      let wav = this.audioBuffer2Wav(data);
      var blob = new Blob([wav], { type: "audio/wav" });
      this.showWavesurfer(blob);
    },
    two() {
      this.showWavesurfer("static/audio/demo.wav",true);
    }
  },
  created() {},
  mounted() {
    // new Promise(() => this.showWavesurfer());
    // this.showWavesurfer("static/audio/demo.wav")
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.screenHeight = window.screenHeight;
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(100, 10, 800, 800);
  },
  activated() {
    this.showWavesurfer();
    this.btnInit();
  },
  deactivated() {
    console.log("destroyed");
    this.deactivatedflag = false;
    if (this.wavesurfer.destroy) {
      this.wavesurfer.destroy();
      console.log("this.wavesurfer.destroy()111");
    }
    this.unbindjq();
    console.log("this.unbindjq()");
    this.currentpage = 1;
  }
};
</script>
<style lang="scss" scoped>
.media {
  // margin-top: 10px;
  width: 100%;
  // height: 235px;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgba(55, 56, 66, 0.95);
    > span {
      color: #9395a2;
      &:nth-child(2n) {
        color: #eff0f6;
      }
      &:first-child {
        margin-left: 20px;
      }
      &:nth-child(3) {
        margin-left: 60px;
      }
    }
  }
  .wave {
    width: 100%;
    // height: 126px;
    background-color: #303036;
  }
  .wave-controll {
    width: 100%;
    height: 40px;
    background-color: #40414b;
    > ul {
      display: flex;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: space-between;
        > div {
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          margin-right: 1px;
          border-right: 1px solid #9395a2;
          border-left: 1px solid #9395a2;
          font-size: 12px;
          color: #9395a2;
          &:first-child {
            background: url("../../images/慢放0.png") no-repeat center;
            border-left: none;
          }
          &:first-child:hover {
            background: url("../../images/慢放1.png") no-repeat center;
          }
          &:nth-child(2) {
            background: url("../../images/暂停0.png") no-repeat center;
          }
          &:nth-child(2).on {
            background: url("../../images/播放0.png") no-repeat center;
          }
          &:nth-child(3) {
            background: url("../../images/快放0.png") no-repeat center;
          }
          &:nth-child(3):hover {
            background: url("../../images/快放1.png") no-repeat center;
          }
          &:nth-child(4) {
            background: url("../../images/停止0.png") no-repeat center;
          }
          &:nth-child(4):hover {
            background: url("../../images/停止1.png") no-repeat center;
          }
          &:nth-child(5) {
            background: url("../../images/静音0.png") no-repeat center;
            border-right: none;
          }
          &:nth-child(5):hover {
            background: url("../../images/静音1.png") no-repeat center;
          }
          &.sound.on {
            background: url("../../images/音量0.png") no-repeat center;
          }
          &.sound.on:hover {
            background: url("../../images/音量1.png") no-repeat center;
          }
          &:nth-child(6) {
            width: 100px;
            border-left: none;
            line-height: 35px;
            > input {
              -webkit-appearance: none;
              -moz-appearance: none;
              -ms-appearance: none;
              width: 80px;
              height: 2px;
              background-color: #bbbbbb;
              &::-webkit-slider-thumb {
                -webkit-appearance: none;
              }
              &::-moz-range-trackpseduo {
                -moz-appearance: none;
              }
              &::-ms-track {
                width: 100%;
                cursor: pointer;
                background: transparent; /* Hides the slider so custom styles can be added */
                border-color: transparent;
                color: transparent;
              }
              &:focus {
                outline: none;
              }
              &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 9px;
                width: 9px;
                margin-top: -1px;
                background: #bbb;
                border-radius: 50%;
                border: solid 0.125em rgba(205, 224, 230, 0.5);
              }
              &::-moz-range-thumb {
                -moz-appearance: none;
                height: 6px;
                width: 6px;
                margin-top: -1px;
                background: #bbb;
                border-radius: 50%;
                border: solid 0.125em rgba(205, 224, 230, 0.5);
              }
              &::-ms-track {
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
          &:nth-child(7) {
            background: url("../../images/lachang.png") no-repeat center;
          }
          &:nth-child(7):hover {
            background: url("../../images/音轨拉长1.png") no-repeat center;
          }
          &:nth-child(8) {
            background: url("../../images/suoduan.png") no-repeat center;
          }
          &:nth-child(8):hover {
            background: url("../../images/音轨缩短1.png") no-repeat center;
          }
          &:nth-child(10) {
            width: 50px;
          }
          &:nth-child(11) {
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
        > div {
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          margin-right: 1px;
          border-right: 1px solid #9395a2;
          border-left: 1px solid #9395a2;
          font-size: 12px;
          color: #9395a2;
          &:first-child {
            width: 100px;
          }
          &:first-child:hover {
            color: #fff;
          }
          &:nth-child(2) {
            width: 80px;
          }
          &:nth-child(2):hover {
            color: #fff;
          }
          &:nth-child(3) {
            width: 80px;
          }
          &:nth-child(3):hover {
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
