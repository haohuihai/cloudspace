<template>
  <div>
    <div class="article-link" v-for="(item, index) in articItem" :key="index" @click="toPreview(item)">
      <div class="article-item">
        <div class="article-item-left">
          <div class="article-item-left-top">
            <span>{{item.nickname}}</span><span class="dot">·</span><span>{{ item.createdAt
            }}</span><span class="dot">·</span><span>{{ articleType.filter((it) => it.id ==
              item.articleTypeId)[0].name }}</span>
          </div>
          <div class="title-box">
            <div class="title">{{ item.articleTitle }}</div>
            <div class="content">
              {{item.abstract}}
            </div>
          </div>
          <div class="operate">
            <ul>
              <li>
                <span class="iconfont icon-dianzan"></span>
                <span class="number">{{ item.likesNum }}</span>
              </li>
              <li>
                <i class="el-icon-view"></i>
                <span class="number">{{ item.previewNumber }}</span>
              </li>
              <li>
                <span class="iconfont icon-fenxiang"></span><span class="number">{{ item.shareNum }}</span>
              </li>
            </ul>
          </div>
        </div>
        <img class="artic-item-right"
          src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7de3f9db0dbc492bacd35874b648591f~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:120:120.awebp"
          alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElInput } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, ref, onMounted } from 'vue'
interface Article {

}
export default defineComponent({
  props: {
    articItem: {
      type: Array,
      default: () => []
    }
  },
  emits: ['toPreview'],
  setup(props, { slots, expose, emit }) {
    console.log('props.articItem', props.articItem)
    const articleType = ref([
      {
        id: '1',
        name: '前端'
      },
      {
        id: '2',
        name: '后端'
      },
      {
        id: '3',
        name: 'Android'
      },
      {
        id: '4',
        name: '云服务'
      },
      {
        id: '5',
        name: '智能'
      }
    ])
  const toPreview = (item) => {
    emit('toPreview', item)
  }
  return {
    articleType,
    toPreview
  }
}

})
</script>

<style lang="less" scoped>
.article-link {
  cursor: pointer;
  border-bottom: 0.1rem solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }

  .article-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;

    .article-item-left {
      display: flex;
      overflow: hidden;
      align-items: baseline;
      white-space: nowrap;
      flex-direction: column;

      .article-item-left-top {
        font-size: 1rem;
        color: #b2bac2;

        .dot {
          padding: 0 0.4rem;
        }
      }

      .operate ul {
        display: flex;

        .number {
          color: #b2bac2;
          margin-left: 0.2em;
          font-weight: 700;
        }

        li {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 0.8rem;
          height: 2.5rem;
          font-size: 1.083rem;
          line-height: 1;
          white-space: nowrap;
          color: #b2bac2;
          border-radius: 1px;
          border: 1px solid #edeeef;

          &:nth-child(n + 2) {
            margin-left: -1px;
          }

          &:last-child {
            visibility: hidden;
          }
        }
      }

      .title-box {
        margin: 0.5rem 0 1rem;
        width: 100%;

        .title {
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 1.2;
          color: #2e3135;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 14px;
          margin-bottom: 12px;

          &:hover {
            text-decoration: underline;
          }
        }

        .content {
          margin-bottom: 14px;
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          color: #4e5969;
          display: block;
        }
      }
    }

    .artic-item-right {
      flex: 0 0 auto;
      width: 5rem;
      height: 5rem;
      margin-left: 2rem;
      background-color: #fff;
      border-radius: 2px;
    }
  }
}

.article-link:hover .article-item-left .operate ul li:last-child {
  visibility: visible;
}
</style>
