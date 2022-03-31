<template>
    <section :class="$style.webCapturer">
        <c-intro v-if="step === 1" @request-capture="requestCapture" />
        <c-client v-else-if="step === 2" :control="control" @done="afterClient" />
        <video ref="video" style="display: none" />
        <float-window
            v-if="hasPictureInPicture && popup"
            :width="250"
            :height="100"
            :class="$style.floatwindow"
            @exit="$emit('exit')"
        >
            <slot />
        </float-window>
    </section>
</template>

<script lang="ts">
import { ref, watch, onBeforeUnmount, defineComponent } from 'vue'
import CIntro from './Intro.vue'
import CClient from './Client.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { IMatFromImageData } from '@/utils/IMat'
import FloatWindow from '@/components/FloatWindow2.vue'
import { CocogoatWebControl } from '@/modules/webcontrol'
import { hasPictureInPicture } from '@/utils/compatibility'

export default defineComponent({
    components: {
        CIntro,
        CClient,
        FloatWindow,
    },
    props: {
        popup: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['ready', 'exit'],
    setup(props, { emit }) {
        const step = ref(1)
        const video = ref(null as HTMLVideoElement | null)
        const stream = ref(null as MediaStream | null)
        const control = new CocogoatWebControl()
        const windowId = ref(0)
        const requestCapture = async () => {
            if (!video.value) return
            try {
                stream.value = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: false,
                })
                video.value.srcObject = stream.value
                video.value.play()
                step.value++
            } catch (err) {
                console.error(err)
                ElMessage.error({
                    message: (err as Error).toString(),
                })
            }
        }
        const afterClient = (wid: number) => {
            windowId.value = wid
            step.value++
            emit('ready')
        }
        const tempCanvas = document.createElement('canvas')
        const tempCtx = tempCanvas.getContext('2d')
        const capture = ({ x = 0, y = 0, w = 0, h = 0 }) => {
            if (!video.value) throw new Error('No video')
            if (!tempCtx) throw new Error('No canvas context')
            let imageData = null as ImageData | null
            if (w > 0 && h > 0) {
                if (tempCanvas.width !== w || tempCanvas.height !== h) {
                    tempCanvas.width = w
                    tempCanvas.height = h
                }
            } else {
                if (tempCanvas.width !== video.value.videoWidth || tempCanvas.height !== video.value.videoHeight) {
                    tempCanvas.width = video.value.videoWidth
                    tempCanvas.height = video.value.videoHeight
                }
            }
            while (!imageData) {
                if (w > 0 && h > 0) {
                    tempCtx.drawImage(video.value, x, y, w, h, 0, 0, tempCanvas.width, tempCanvas.height)
                } else {
                    tempCtx.drawImage(video.value, 0, 0, tempCanvas.width, tempCanvas.height)
                }
                imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
                if (!imageData) {
                    console.warn('->capture FAILD')
                }
            }
            return IMatFromImageData(imageData)
        }
        const stop = () => {
            stream.value && stream.value.getTracks().forEach((t) => t.stop())
            stream.value = null
            video.value && video.value.pause()
            video.value && (video.value.srcObject = null)
        }
        const reset = () => {
            stop()
            step.value = 1
        }
        watch(stream, (stream) => {
            stream &&
                stream.getVideoTracks()[0]?.addEventListener('ended', () => {
                    stop()
                    emit('exit')
                })
        })
        onBeforeUnmount(() => {
            stop()
        })
        return {
            step,
            video,
            stream,
            control,
            windowId,
            requestCapture,
            afterClient,
            capture,
            stop,
            reset,
            hasPictureInPicture,
        }
    },
})
</script>

<style lang="scss" module>
.floatwindow {
    opacity: 0;
    position: absolute;
    top: -9999px;
    left: -9999px;
}
.web-capturer {
    text-align: center;
    :global {
        .start-btn {
            margin-top: 10px;
            height: 60px;
            text-align: left;
            font-size: 16px;
            transition: all 0.3s;
            width: 490px;
            max-width: 95%;
            box-sizing: border-box;
            &:hover {
                transform: translateY(-5px);
            }
            &.start-gray {
                --el-button-hover-text-color: #333;
                --el-button-hover-border-color: #aaa;
                --el-button-hover-bg-color: #fafafa;
            }
            & > span {
                display: flex;
                width: 100%;
                height: 100%;
                justify-content: flex-start;
            }

            .r {
                opacity: 0.8;
            }

            .m {
                flex-grow: 1;
            }

            .l svg {
                width: 40px;
                height: 24px;
                padding-right: 10px;
            }

            .d {
                font-size: 12px;
                margin-top: 3px;
                opacity: 0.8;
            }
        }
    }
}
</style>