
<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ nickname() }}</div>
      <div>{{ userInfo.bio }}</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="监控数" content="56" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="正常" content="8/24" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="总流量" content="2223.00Gb" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="item.id" v-for="item in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :style="{ backgroundColor: activityColorType[item.status] }" :icon="item.icon" />
                  <div slot="title">
                    <span>{{ item.name }}</span>&nbsp;
                    在&nbsp;<a href="javascript:;">{{ item.time }}</a>&nbsp;
                    <span>{{ item.status | activity }}</span>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="快速开始 / 便捷导航" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a>节点 华中1</a>
              <a>监控</a>
              <a>开发平台</a>
              <a>告警</a>
              <a>用户信息</a>
              <a>已授权 API</a>
              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card>
        </a-col>
      </a-row>

    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapGetters } from 'vuex'

import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'

const activityStatus = {
  0: '磁盘占用过高',
  1: 'CPU 过高',
  2: '内存占用过高',
  3: '推送了数据',
  4: '超过资源监控阈值'
}

const activityColorType = {
  0: '#FFCC33',
  1: '#ff0000',
  2: '#ff0000',
  3: '#87d068',
  4: '#ff0000'
}

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo
  },
  data () {
    return {
      timeFix: timeFix(),
      user: {},

      activityColorType,
      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: []
    }
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
  },
  mounted () {
    this.getActivity()
  },
  filters: {
    activity (val) {
      return activityStatus[val]
    }
  },
  methods: {
    ...mapGetters(['nickname', 'welcome']),
    getActivity () {
      this.$http.get('/workplace/activity')
        .then(res => {
          this.activities = res.result
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>
