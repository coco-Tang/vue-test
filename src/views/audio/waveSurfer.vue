<template>
  <div class="container">
      这是wavesurfer测试页面
    <div id="waveform"></div>
    <div id="waveform-timeline"></div>
    <!-- <pre>
        <code v-highlight>
        <div id="waveform"></div>
        <div id="waveform-timeline"></div>
        </code>
    </pre> -->
    <!-- <input v-focus> -->
  </div>
</template>
<script>
// import hljs from "highlight.js"
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
export default {
  data() {
    return {

    }
  },
  directives: {
    highlight: {
      inserted: function (el) {
        hljs.highlightBlock(el);
      }
    },
    focus: {
    // 指令的定义
        inserted: function (el) {
        el.focus()
        }
    }
  },
  methods: {
    afterRender() {

        let wavesurfer = WaveSurfer.create({
            container: '#waveform',
            renderer: 'MultiCanvas',
            waveColor: '#337AB7',   // CoolEdit颜色 #4BF3A7
            progressColor: '#23527C',
            // backend       : 'diaElent',
            height: 74
        });

        if (enableDragSelection) {
            wavesurfer.enableDragSelection({
                color: 'rgba(0, 255, 0, 0.3)'
            });
        }

        /* 将创建的实例绑定到wavesurfer上，以供外面通过this调用 */
        this.wavesurfer = wavesurfer;

        wavesurfer.on('loading', function(progress) {
            this.wavesurfer.onLoading(progress);
        });
        wavesurfer.on('ready', function () {
            this.wavesurfer.onReady();
        });
        wavesurfer.on('error', function (msg) {
            this.wavesurfer.onError(msg);
        });
        wavesurfer.on('play', function () {
            this.wavesurfer.onPlay();
        });
        wavesurfer.on('pause', function () {
            this.wavesurfer.onPause();
        });
        wavesurfer.on('seek', function () {
            this.wavesurfer.onSeek();
        });
        wavesurfer.on('finish', function () {
            this.wavesurfer.onFinish();
        });

        // wavesurfer.on('audioprocess', function (ti) {
        //     this.wavesurfer.fireEvent('audioprocess', , ti);
        // });

        // wavesurfer.on('range', function (data, e, rangeIndex, rangeLength) {
        //     this.wavesurfer.rangeIndex = rangeIndex;
        //     var prevRangeButton = this.wavesurfer.down("#prevRange");
        //     var nextRangeButton = this.wavesurfer.down("#nextRange");
        //     prevRangeButton.setDisabled(rangeIndex <= 0);
        //     nextRangeButton.setDisabled(rangeIndex >= rangeLength - 1);
        //     prevRangeButton.setTooltip( "上一段(" + (this.wavesurfer.rangeIndex) + "/" + rangeLength + ")");
        //     nextRangeButton.setTooltip( "下一段(" + (this.wavesurfer.rangeIndex + 2) + "/" + rangeLength + ")");
        //     if(rangeLength <= 1 ) {
        //         this.wavesurfer.down("#prevRange").hide();
        //         this.wavesurfer.down("#nextRange").hide();
        //     } else {
        //         this.wavesurfer.down("#prevRange").show();
        //         this.wavesurfer.down("#nextRange").show();
        //     }
        // });

        // wavesurfer.on('resize', this.wavesurfer.onResize);

        // 快捷键支持
        // this.wavesurfer.el.set({
        //     tabIndex: -1
        // });
        // this.wavesurfer.keyMap = Ext.create('Ext.util.KeyMap', {
        //     target: this.wavesurfer.el,
        //     binding: [{
        //         key: Ext.EventObject.SPACE,
        //         fn: function () {
        //             wavesurfer.playPause();            // 播放暂停
        //         },
        //         defaultEventAction: 'preventDefault'
        //     }, {
        //         key: Ext.EventObject.LEFT,
        //         ctrl: true,
        //         fn: function () {
        //             if (this.wavesurfer.curRecord) {
        //                 this.wavesurfer.fireEvent('previous', , this.wavesurfer.curRecord);  // 上一个
        //             }
        //         }
        //     }, {
        //         key: Ext.EventObject.RIGHT,
        //         ctrl: true,
        //         fn: function () {
        //             if (this.wavesurfer.curRecord) {
        //                 this.wavesurfer.fireEvent('next', , this.wavesurfer.curRecord);     // 下一个
        //             }
        //         }
        //     }, {
        //         key: Ext.EventObject.LEFT,
        //         fn: function () {
        //             wavesurfer.skipBackward(5);        // 快退
        //         }
        //     }, {
        //         key: Ext.EventObject.RIGHT,
        //         fn: function () {
        //             wavesurfer.skipForward(5);         // 快进
        //         }
        //     }, {
        //         key: Ext.EventObject.X,
        //         ctrl: true,
        //         fn: function () {
        //             if (!.hideEditButtons) {
        //                 wavesurfer.editor.cut();       // 剪切
        //             }
        //         }
        //     }, {
        //         key: Ext.EventObject.C,
        //         ctrl: true,
        //         fn: function () {
        //             if (!.hideEditButtons) {
        //                 wavesurfer.editor.copy();      // 复制
        //             }
        //         }
        //     }, {
        //         key: Ext.EventObject.V,
        //         ctrl: true,
        //         fn: function () {
        //             if (!.hideEditButtons) {
        //                 wavesurfer.editor.paste();     // 粘贴
        //             }
        //         }
        //     }, {
        //         key: Ext.EventObject.DELETE,
        //         fn: function () {
        //             if (!.hideEditButtons) {
        //                 wavesurfer.editor.del();     // 删除
        //             }
        //         }
        //     }, {
        //         key: Ext.EventObject.Z,
        //         ctrl: true,
        //         fn: function () {
        //             if (!.hideEditButtons) {
        //                 wavesurfer.editor.undo();      // 撤销
        //             }
        //         }
        //     }, {
        //         key: Ext.EventObject.R,
        //         ctrl: true,
        //         fn: function () {
        //             if (!.hideEditButtons) {
        //                 wavesurfer.editor.redo();      // 重做
        //             }
        //         },
        //         defaultEventAction: 'preventDefault'
        //     }, {
        //         key: Ext.EventObject.S,
        //         ctrl: true,
        //         fn: function () {
        //             var saveBtn = .down('button#save');
        //             saveBtn.handler.call();
        //         },
        //         defaultEventAction: 'preventDefault'
        //     }, {
        //         key: "0123456789",
        //         alt: true,
        //         fn: function (key) {
        //             var parentWidth = wavesurfer.drawer.getWidth();
        //             var defaultPxPerSec = parentWidth / (wavesurfer.getDuration() * wavesurfer.params.pixelRatio);
        //             var pxPerSec = defaultPxPerSec * (1 + (key - 48));

        //             wavesurfer.zoom(pxPerSec);
        //         }
        //     }]
        // });

        // .callParent();
    },
  },
  mounted() {
      this.afterRender();
  }
}
</script>
<style>

</style>

