<template>
    <Layout>
        <template #title>
            <div class="teleport-title">
                <span style="font-family: genshin">椰羊 · 圣遗物</span>
            </div>
        </template>
        <template #actions>
            <div class="actions">
                <div class="a-line">
                    <el-button class="import-button" size="default" plain @click="openImport">
                        <fa-icon icon="arrow-up-from-bracket" /> 导入
                    </el-button>
                </div>
                <div class="a-line">
                    <div class="dropdown">
                        <el-dropdown class="header-plain-dropdown" split-button @click="doExport">
                            {{ selectedIds.length > 0 ? '导出选中' : '导出' }}
                            <template #dropdown>
                                <el-dropdown-menu class="el-dropdown-menu--small">
                                    <el-dropdown-item disabled class="export-title"> 莫娜占卜铺 </el-dropdown-item>
                                    <el-dropdown-item @click="doExport('Mona', false)">复制</el-dropdown-item>
                                    <el-dropdown-item @click="doExport('Mona', true)">到文件</el-dropdown-item>
                                    <el-dropdown-item divided disabled class="export-title">
                                        Mingyulab
                                    </el-dropdown-item>
                                    <el-dropdown-item @click="doExport('Mingyulab', false)">复制</el-dropdown-item>
                                    <el-dropdown-item @click="doExport('Mingyulab', true)">到文件</el-dropdown-item>
                                    <el-dropdown-item divided disabled class="export-title">
                                        Genshin Optimizer
                                    </el-dropdown-item>
                                    <el-dropdown-item @click="doExport('GO', false)">复制</el-dropdown-item>
                                    <el-dropdown-item @click="doExport('GO', true)">到文件</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div class="a-line">
                    <el-button size="default" type="primary" disabled plain style="margin-left: 10px">
                        <fa-icon icon="crosshairs" /> 识别
                    </el-button>
                </div>
            </div>
        </template>
        <el-empty description="施工中" />
    </Layout>
</template>

<script lang="ts">
import '@/styles/actions.scss'
import { ref, defineComponent } from 'vue'
import { faCrosshairs, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faCrosshairs, faArrowUpFromBracket)
export default defineComponent({
    name: 'ArtifactIndex',
    components: {},
    setup() {
        const selectedIds = ref<string[]>([])
        const isFiltering = ref(false)
        return {
            isFiltering,
            selectedIds,
            openImport() {
                console.log('openImport')
            },
            doExport(to: string, file: boolean) {
                console.log(to, file)
                // do nothing
            },
        }
    },
})
</script>
<style lang="scss" module></style>
