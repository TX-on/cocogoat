<template>
    <div :class="$style.intro">
        <el-button class="start-btn start-gray" @click="$emit('request-capture')">
            <div class="l">
                <fa-icon icon="video" />
            </div>
            <div class="m">
                <div class="t">开始扫描</div>
                <div class="d">点击开始后请选择原神窗口（如下图）</div>
            </div>
            <div class="r">
                <fa-icon icon="angle-right" />
            </div>
        </el-button>
        <img :src="img('openscreenshare')" alt="请参照图片开始抓屏" />
        <footer-component />
    </div>
</template>

<script lang="ts">
import img from '@/assets/images'
import Footer from './Footer.vue'
import { defineComponent } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVideo, faAngleRight } from '@fortawesome/free-solid-svg-icons'
library.add(faVideo, faAngleRight)
export default defineComponent({
    components: {
        FooterComponent: Footer,
    },
    emits: ['request-capture'],
    setup() {
        return {
            img,
        }
    },
})
</script>

<style module lang="scss">
.intro {
    padding-top: 10vh;
    :global {
        img {
            display: block;
            margin: 0 auto;
            margin-top: 30px;
            margin-bottom: 25px;
            width: 490px;
            max-width: 95%;
            border-radius: var(--el-border-radius-base);
            box-sizing: border-box;
            border: 1px solid var(--el-border-color-base);
        }
    }
}
</style>
