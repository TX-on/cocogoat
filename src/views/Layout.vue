<template>
    <header class="cc-header"></header>
    <div class="cc-user-corner">
        <user-selector />
    </div>
    <aside class="cc-menu">
        <div class="logo">
            <icon-cocogoat class="v-icon cocogoat" />
        </div>
        <div class="nav">
            <router-link active-class="" exact-active-class="router-link-active" :to="{ name: 'home' }">
                <fa-icon icon="house" />
                <span class="txt"> 首页 </span>
            </router-link>
            <!--router-link :to="{ name: 'artifact.index' }">
                <icon-artifact class="v-icon artifact" />
                <span class="txt">圣遗物</span>
            </router-link-->
            <router-link :to="{ name: 'achievement.index' }">
                <icon-achievement class="v-icon achievement" />
                <span class="txt">成就</span>
            </router-link>
            <router-link :class="!isMobile ? 'pc-user' : ''" :to="{ name: 'options.basic' }">
                <fa-icon icon="gear" />
                <span class="txt">设置</span>
            </router-link>
        </div>
    </aside>
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
</template>

<script>
import IconCocogoat from '@/components/Icons/cocogoat.vue'
import IconArtifact from '@/components/Icons/artifact.vue'
import IconAchievement from '@/components/Icons/achievement.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faGear, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faInternetExplorer } from '@fortawesome/free-brands-svg-icons'
library.add(faHouse, faGear, faTriangleExclamation, faInternetExplorer)

import UserSelector from '@/components/UserSelector.vue'

import bus from '@/bus'
import './layout.scss'
export default {
    components: {
        IconCocogoat,
        IconArtifact,
        IconAchievement,
        UserSelector,
    },
    data() {
        return {
            transitionName: '',
            isMobile: false,
            pcUserShown: false,
        }
    },
    computed: {
        current() {
            return this.$route.path.split('/')[2] || '/'
        },
        user() {
            return {}
        },
    },
    created() {
        document.body.classList.add('layout')
        this.$k = function () {
            this.isMobile = document.body.offsetWidth < 640
            bus().isMobile = this.isMobile
            if (this.isMobile) {
                document.body.classList.remove('pc')
                document.body.classList.add('m')
            } else {
                document.body.classList.remove('m')
                document.body.classList.add('pc')
            }
        }.bind(this)
        window.addEventListener('resize', this.$k)
        this.$k()
    },
    unmounted() {
        window.removeEventListener('resize', this.$k)
    },
    methods: {},
}
</script>
