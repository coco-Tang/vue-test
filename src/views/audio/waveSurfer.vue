<template>
  <div class="container">
    <div id="waveform"></div>
    <div id="waveform-timeline"></div>
    <pre>
        <code v-highlight>
        <div id="waveform"></div>
        <div id="waveform-timeline"></div>
        </code>
    </pre>
    <input v-focus>
  </div>
</template>
<script>
import hljs from "highlight.js"
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
        var _this = this;

        _this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            renderer: 'MultiCanvas',
            waveColor: '#337AB7',   // CoolEdit颜色 #4BF3A7
            progressColor: '#23527C',
            // backend       : '_thisdiaEle_thisnt',
            splitChannels: _this.splitChannels,
            height: 74
        });

        if (_this.enableDragSelection) {
            _this.wavesurfer.enableDragSelection({
                color: 'rgba(0, 255, 0, 0.3)'
            });
        }

        _this.wavesurfer.on('loading', function(progress) {
            _this.onLoading(progress);
        });
        _this.wavesurfer.on('ready', function () {
            _this.onReady();
        });
        _this.wavesurfer.on('error', function (msg) {
            _this.onError(msg);
        });
        _this.wavesurfer.on('play', function () {
            _this.onPlay();
        });
        _this.wavesurfer.on('pause', function () {
            _this.onPause();
        });
        _this.wavesurfer.on('seek', function () {
            _this.onSeek();
        });
        _this.wavesurfer.on('finish', function () {
            _this.onFinish();
        });

        _this.wavesurfer.on('audioprocess', function (ti_this) {
            _this.fireEvent('audioprocess', _this, ti_this);
        });

        _this.wavesurfer.on('range', function (data, e, rangeIndex, rangeLength) {
            _this.rangeIndex = rangeIndex;
            var prevRangeButton = _this.down("#prevRange");
            var nextRangeButton = _this.down("#nextRange");
            prevRangeButton.setDisabled(rangeIndex <= 0);
            nextRangeButton.setDisabled(rangeIndex >= rangeLength - 1);
            prevRangeButton.setTooltip( "上一段(" + (_this.rangeIndex) + "/" + rangeLength + ")");
            nextRangeButton.setTooltip( "下一段(" + (_this.rangeIndex + 2) + "/" + rangeLength + ")");
            if(rangeLength <= 1 ) {
                _this.down("#prevRange").hide();
                _this.down("#nextRange").hide();
            } else {
                _this.down("#prevRange").show();
                _this.down("#nextRange").show();
            }
        });

        _this.on('resize', _this.onResize);

        // 快捷键支持
        _this.el.set({
            tabIndex: -1
        });
        _this.keyMap = Ext.create('Ext.util.KeyMap', {
            target: _this.el,
            binding: [{
                key: Ext.EventObject.SPACE,
                fn: function () {
                    _this.wavesurfer.playPause();            // 播放暂停
                },
                defaultEventAction: 'preventDefault'
            }, {
                key: Ext.EventObject.LEFT,
                ctrl: true,
                fn: function () {
                    if (_this.curRecord) {
                        _this.fireEvent('previous', _this, _this.curRecord);  // 上一个
                    }
                }
            }, {
                key: Ext.EventObject.RIGHT,
                ctrl: true,
                fn: function () {
                    if (_this.curRecord) {
                        _this.fireEvent('next', _this, _this.curRecord);     // 下一个
                    }
                }
            }, {
                key: Ext.EventObject.LEFT,
                fn: function () {
                    _this.wavesurfer.skipBackward(5);        // 快退
                }
            }, {
                key: Ext.EventObject.RIGHT,
                fn: function () {
                    _this.wavesurfer.skipForward(5);         // 快进
                }
            }, {
                key: Ext.EventObject.X,
                ctrl: true,
                fn: function () {
                    if (!_this.hideEditButtons) {
                        _this.wavesurfer.editor.cut();       // 剪切
                    }
                }
            }, {
                key: Ext.EventObject.C,
                ctrl: true,
                fn: function () {
                    if (!_this.hideEditButtons) {
                        _this.wavesurfer.editor.copy();      // 复制
                    }
                }
            }, {
                key: Ext.EventObject.V,
                ctrl: true,
                fn: function () {
                    if (!_this.hideEditButtons) {
                        _this.wavesurfer.editor.paste();     // 粘贴
                    }
                }
            }, {
                key: Ext.EventObject.DELETE,
                fn: function () {
                    if (!_this.hideEditButtons) {
                        _this.wavesurfer.editor.del();     // 删除
                    }
                }
            }, {
                key: Ext.EventObject.Z,
                ctrl: true,
                fn: function () {
                    if (!_this.hideEditButtons) {
                        _this.wavesurfer.editor.undo();      // 撤销
                    }
                }
            }, {
                key: Ext.EventObject.R,
                ctrl: true,
                fn: function () {
                    if (!_this.hideEditButtons) {
                        _this.wavesurfer.editor.redo();      // 重做
                    }
                },
                defaultEventAction: 'preventDefault'
            }, {
                key: Ext.EventObject.S,
                ctrl: true,
                fn: function () {
                    var saveBtn = _this.down('button#save');
                    saveBtn.handler.call(_this);
                },
                defaultEventAction: 'preventDefault'
            }, {
                key: "0123456789",
                alt: true,
                fn: function (key) {
                    var parentWidth = _this.wavesurfer.drawer.getWidth();
                    var defaultPxPerSec = parentWidth / (_this.wavesurfer.getDuration() * _this.wavesurfer.params.pixelRatio);
                    var pxPerSec = defaultPxPerSec * (1 + (key - 48));

                    _this.wavesurfer.zoom(pxPerSec);
                }
            }]
        });

        // _this.callParent();
    },
  }
}
</script>
<style>

</style>

