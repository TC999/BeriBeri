<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import { useBewlyApp } from '~/composables/useAppProvider'
import { settings } from '~/logic'
import type { List as VideoItem, WatchLaterResult } from '~/models/video/watchLater'
import { useMainStore } from '~/stores/mainStore'
import api from '~/utils/api'
import { calcCurrentTime } from '~/utils/dataFormatter'
import { getCSRF, openLinkToNewTab, removeHttpFromUrl } from '~/utils/main'

const { t } = useI18n()
const { openIframeDrawer } = useBewlyApp()
const { setActivatedCover } = useMainStore()

const isLoading = ref<boolean>()
const noMoreContent = ref<boolean>()
const allWatchLaterList = ref<VideoItem[]>([])
const currentWatchLaterList = ref<VideoItem[]>([])
const watchLaterCount = ref<number>(0)
const { handlePageRefresh, handleReachBottom, haveScrollbar } = useBewlyApp()
const pageNum = ref<number>(1)

onMounted(() => {
  initPageAction()
  initData()
})

async function initData() {
  isLoading.value = false
  noMoreContent.value = false
  allWatchLaterList.value.length = 0
  currentWatchLaterList.value.length = 0
  pageNum.value = 1
  await getAllWatchLaterList()
  getData()
}

function getData() {
  getCurrentWatchLaterList()
}

function initPageAction() {
  handlePageRefresh.value = async () => {
    if (isLoading.value)
      return

    initData()
  }

  handleReachBottom.value = async () => {
    getData()
  }
}

/**
 * Get watch later list
 */
async function getAllWatchLaterList() {
  isLoading.value = true
  currentWatchLaterList.value.length = 0
  try {
    const res: WatchLaterResult = await api.watchlater.getAllWatchLaterList()
    if (res.code === 0) {
      allWatchLaterList.value = res.data.list
      watchLaterCount.value = allWatchLaterList.value.length
    }
  }
  finally {
    isLoading.value = false
  }
}

function getCurrentWatchLaterList() {
  const allWatchLaterListCopy = JSON.parse(JSON.stringify(allWatchLaterList.value))
  const currentList = allWatchLaterListCopy.slice((pageNum.value - 1) * 10, pageNum.value * 10)

  if (currentList.length === 0) {
    noMoreContent.value = true
    return
  }
  pageNum.value++
  currentWatchLaterList.value.push(...currentList)

  if (!haveScrollbar() && !noMoreContent.value) {
    getCurrentWatchLaterList()
  }
}

function deleteWatchLaterItem(index: number, aid: number) {
  api.watchlater.removeFromWatchLater({
    aid,
    csrf: getCSRF(),
  })
    .then((res) => {
      if (res.code === 0) {
        currentWatchLaterList.value.splice(index, 1)
        watchLaterCount.value--
      }
    })
}

function handleClearAllWatchLater() {
  const result = confirm(
    t('watch_later.clear_all_confirm'),
  )
  if (result) {
    isLoading.value = true
    api.watchlater.clearAllWatchLater({
      csrf: getCSRF(),
    }).then((res) => {
      if (res.code === 0)
        initData()
    }).finally(() => {
      isLoading.value = false
    })
  }
}

function handleRemoveWatchedVideos() {
  const result = confirm(
    t('watch_later.remove_watched_videos_confirm'),
  )
  if (result) {
    api.watchlater.removeFromWatchLater({
      viewed: true,
      csrf: getCSRF(),
    })
      .then((res) => {
        if (res.code === 0)
          initData()
      })
  }
}

function handlePlayAll() {
  openLinkToNewTab('https://www.bilibili.com/list/watchlater')
}

function handleLinkClick(url: string) {
  if (settings.value.videoCardLinkOpenMode === 'drawer') {
    openIframeDrawer(url) // 在抽屉打开
  }
  else if (settings.value.videoCardLinkOpenMode === 'currentTab') {
    window.open(url, '_self') // 在当前标签页打开
  }
  else {
    openLinkToNewTab(url) // 在新标签页打开
  }
}

function jumpToLoginPage() {
  location.href = 'https://passport.bilibili.com/login'
}

function handleMouseEnter(item: VideoItem) {
  setActivatedCover(`${removeHttpFromUrl(item.pic)}@480w_270h_1c`)
}
</script>

<template>
  <div v-if="getCSRF()" flex="~ col md:row lg:row" gap-4>
    <main w="full md:60% lg:70% xl:75%" order="2 md:1 lg:1" mb-6>
      <h3 text="3xl $bew-text-1" font-bold mb-6>
        {{ t('watch_later.title') }} ({{ watchLaterCount }})
      </h3>
      <Empty v-if="watchLaterCount === 0 && !isLoading" />
      <template v-else>
        <!-- watcher later list -->
        <TransitionGroup name="list">
          <ALink
            v-for="(item, index) in currentWatchLaterList"
            :key="item.aid"
            :href="`https://www.bilibili.com/list/watchlater?bvid=${item.bvid}`"
            type="videoCard"
            class="group"
            flex cursor-pointer
            @mouseenter="handleMouseEnter(item)"
          >
            <section
              rounded="$bew-radius"
              flex="~ gap-6 col md:col lg:row items-start"
              relative
              group-hover:bg="$bew-fill-2"
              duration-300 w-full
              p-2 m-1
              content-visibility-auto
            >
              <!-- Cover -->
              <div
                pos="relative"
                bg="$bew-skeleton"
                w="full md:full lg:250px"
                flex="shrink-0"
                rounded="$bew-radius"
                overflow-hidden
                aspect-video
              >
                <img
                  w="full"
                  aspect-video
                  :src="removeHttpFromUrl(`${item.pic}@480w_270h_1c`)"
                  :alt="item.title"
                  object-cover
                >

                <!-- <div
                  pos="absolute bottom-0 right-0"
                  bg="black opacity-60"
                  m="2"
                  p="x-2 y-1"
                  text="white xs"
                  rounded-8
                >
                  {{ calcCurrentTime(item.duration) }}
                </div> -->
                <div

                  pos="absolute bottom-0 right-0"
                  bg="black opacity-60"
                  m="2"
                  p="x-2 y-1"
                  text="white xs"
                  rounded-8
                >
                  <!--  When progress = -1 means that the user watched the full video -->
                  {{
                    `${
                      item.progress === -1
                        ? calcCurrentTime(item.duration)
                        : calcCurrentTime(item.progress)
                    } /
                      ${calcCurrentTime(item.duration)}`
                  }}
                </div>
                <div w-full pos="absolute bottom-0" bg="white opacity-60">
                  <Progress
                    :percentage="
                      (item.progress / item.duration) * 100
                    "
                  />
                </div>
              </div>

              <!-- Description -->
              <div flex justify-between w-full h-full>
                <div flex="~ col">
                  <a
                    class="keep-two-lines"
                    overflow="hidden"
                    un-text="lg overflow-ellipsis"
                    @click.stop.prevent="handleLinkClick(`https://www.bilibili.com/list/watchlater?bvid=${item.bvid}`)"
                  >
                    {{ item.title }}
                  </a>
                  <a
                    un-text="$bew-text-2 sm"
                    m="t-4 b-2"
                    flex="~"
                    items-center
                    cursor-pointer
                    w-fit
                    rounded="$bew-radius"
                    hover:color="$bew-theme-color"
                    hover:bg="$bew-theme-color-10"
                    duration-300
                    pr-2
                    :href="`//space.bilibili.com/${item.owner.mid}`" target="_blank"
                    @click.stop
                  >
                    <img
                      :src="removeHttpFromUrl(`${item.owner.face}@40w_40h_1c`)"
                      w-30px
                      aspect-square
                      object-cover
                      alt=""
                      rounded="1/2"
                      mr-2
                    >
                    {{ item.owner.name }}
                  </a>
                  <p display="block xl:none" text="$bew-text-3 sm" mt-auto mb-2>
                    {{
                      useDateFormat(item.pubdate * 1000, 'YYYY-MM-DD HH:mm:ss')
                        .value
                    }}
                  </p>
                </div>

                <div flex items-center>
                  <!-- <span>{{ item.progress === -1 ? $t('watch_later.watched') : '' }}</span> -->

                  <button
                    text="2xl $bew-text-3"
                    hover:color="$bew-theme-color"
                    opacity-0 group-hover:opacity-100
                    p-2
                    duration-300
                    @click.prevent.stop="deleteWatchLaterItem(index, item.aid)"
                  >
                    <div i-tabler:trash />
                  </button>
                </div>
              </div>
            </section>
          </ALink>
        </TransitionGroup>
        <!-- loading -->
        <Transition name="fade">
          <loading
            v-if="isLoading && currentWatchLaterList.length !== 0 && !noMoreContent"
            m="-t-4"
          />
        </Transition>
      </template>
    </main>

    <aside relative w="full md:40% lg:30% xl:25%" order="1 md:2 lg:2">
      <div
        pos="sticky top-120px"
        w-full h="230px md:[calc(100vh-160px)]"
        my-10
        rounded="$bew-radius"
        overflow-hidden
      >
        <!-- Frosted Glass Cover -->
        <div
          pos="absolute top-0 left-0" w-full h-inherit
          z--1
        >
          <div
            absolute w-full h-inherit
            bg="$bew-fill-4"
          />
          <img
            v-if="currentWatchLaterList[0]"
            :src="removeHttpFromUrl(`${currentWatchLaterList[0].pic}@480w_270h_1c`)"
            w-full h-full object="cover center" blur-40px
            relative z--1
          >
        </div>

        <!-- Content -->
        <main
          pos="absolute top-0 left-0"
          w-full h-inherit
          overflow-overlay
          flex="~ col gap-4 justify-start"
          p-6
        >
          <picture
            class="hidden md:block"
            rounded="$bew-radius" style="box-shadow: 0 16px 24px -12px rgba(0, 0, 0, .36)"
            aspect-video mb-4 bg="$bew-skeleton"
          >
            <img
              v-if="currentWatchLaterList[0]" :src="removeHttpFromUrl(`${currentWatchLaterList[0].pic}@480w_270h_1c`)"
              rounded="$bew-radius" aspect-video w-full
            >
          </picture>

          <h3 text="3xl white" fw-600 style="text-shadow: 0 0 12px rgba(0,0,0,.3)">
            {{ t('watch_later.title') }} ({{ watchLaterCount }})
          </h3>
          <p v-if="watchLaterCount > 0" flex="~ col" gap-4>
            <Button
              color="rgba(255,255,255,.35)" block text-color="white" strong flex-1
              @click="handlePlayAll"
            >
              <template #left>
                <div i-tabler:player-play />
              </template>
              {{ t('common.play_all') }}
            </Button>
            <Button
              color="rgba(255,255,255,.35)" block text-color="white" strong flex-1
              @click="handleClearAllWatchLater"
            >
              <template #left>
                <div i-tabler:trash />
              </template>
              {{ t('watch_later.clear_all') }}
            </Button>
            <Button
              color="rgba(255,255,255,.35)" block text-color="white" strong flex-1
              @click="handleRemoveWatchedVideos"
            >
              <template #left>
                <div i-tabler:circle-minus />
              </template>
              {{ t('watch_later.remove_watched_videos') }}
            </Button>
          </p>
        </main>
      </div>
    </aside>
  </div>
  <Empty v-else mt-6 :description="t('common.please_log_in_first')">
    <Button type="primary" @click="jumpToLoginPage()">
      {{ $t('common.login') }}
    </Button>
  </Empty>
</template>

<style lang="scss" scoped>
</style>
