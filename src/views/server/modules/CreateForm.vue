<template>
  <a-modal
    title="新建监控规则"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="名称">
          <a-input
            placeholder="最好是服务器的主机名或 FQDN"
            v-decorator="['name', {rules: [{required: true, min: 5, message: '最好是服务器的主机名或 FQDN'}]}]"
          />
        </a-form-item>

        <a-form-item label="监控类型">
          <a-select style="width: 100%" v-decorator="['type', {initialValue: '-1', rules: [ {required: true}]}]">
            <a-select-option key="-1" value="-1">请选择</a-select-option>
            <a-select-option
              v-for="item in monitors"
              :key="item.key"
              :disabled="item.disabled"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <!-- agent -->
        <template v-if="form.getFieldValue('type') === 'agent'">
          <a-form-item>
            <template slot="label">
              <a-checkbox @change="onChange">数据报丢失通知</a-checkbox>
            </template>
            <span>当数据在<b>3分钟</b>内丢失</span>
            <a-input-number
              style="margin: 0 16px"
              :min="1"
              :max="10"
              v-decorator="['loss_notification', {initialValue: 1, rules: [ {required: true}]}]"
            />
            <span>次后，发送警告通知</span>
            <a-checkbox style="margin-left: 16px" @change="onChange">额外的 Ping 检查</a-checkbox>
          </a-form-item>

          <a-form-item>
            <template slot="label">
              <a-checkbox @change="onChange">资源占用阈值通知</a-checkbox>
            </template>
            <a-card :bordered="false" style="background: rgba(239, 239, 239, 0.39);">
              <div class="load-wrapper">
                <span>系统负载：</span>
                <a-slider :min="1" :max="100" v-decorator="['systemLoad', {initialValue: mdl.systemLoad, rules: [ {required: true}]}]" />
                <span>{{ form && form.getFieldValue('systemLoad') || mdl.systemLoad }}%</span>
              </div>
              <div class="load-wrapper">
                <span>内存占用：</span>
                <a-slider :min="1" :max="100" v-model="mdl.ramUsage" />
                <span>{{ mdl.ramUsage }}%</span>
              </div>
              <div class="load-wrapper">
                <span>磁盘占用：</span>
                <a-slider :min="1" :max="100" v-model="mdl.diskUsage" />
                <span>{{ mdl.diskUsage }}%</span>
              </div>
            </a-card>
          </a-form-item>
        </template>

        <!-- cURL (HTTP/s) -->
        <template v-else-if="form.getFieldValue('type') === 'http'">
          <a-form-item label="请求地址">
            <a-input placeholder="http://" v-decorator="['host', {rules: [ {required: true}]}]" />
          </a-form-item>

          <a-form-item label="监控周期">
            <div class="interval-wrapper">
              <a-slider :min="5" :max="240" v-decorator="['interval', {initialValue: 5, rules: [ {required: true}]}]" />
              <span>每 {{ form && form.getFieldValue('interval') || 5 }} 分钟</span>
            </div>
          </a-form-item>
          <a-divider orientation="left">高级设置</a-divider>
          <a-form-item label="响应状态">
            <a-input placeholder="eq http.status=200" />
          </a-form-item>
        </template>

        <template v-else-if="form.getFieldValue('type') === 'ping'">
          <a-form-item label="域名或 IP">
            <a-input placeholder="example.com / 172.10.1.9" v-decorator="['host', {rules:[{required: true}]}]" />
          </a-form-item>

          <a-form-item label="监控阈值">
            <span>当 <b>Timeout</b></span>
            <a-input-number
              style="margin: 0 16px"
              :min="1"
              :max="10"
              v-decorator="['ping_loss_number', {initialValue: 3, rules: [ {required: true}]}]"
            />
            <span>次后，发送警告通知</span>
          </a-form-item>
        </template>

        <template v-else-if="form.getFieldValue('type') === 'port'">
          <a-form-item label="域名或 IP">
            <a-input placeholder="example.com / 172.10.1.9" v-decorator="['host', {rules:[{required: true}]}]" />
          </a-form-item>

          <a-form-item label="端口号">
            <a-select v-decorator="['portSelect', {initialValue: -1, rules:[{required: true}]}]" @change="(value) => form.setFieldsValue({ port: value })">
              <a-select-option key="-1" :value="-1">请选择</a-select-option>
              <a-select-opt-group key="service" label="服务端口">
                <a-select-option key="80" :value="80">HTTP (80)</a-select-option>
                <a-select-option key="443" :value="443">HTTPs (443)</a-select-option>
                <a-select-option key="21" :value="21">FTP (21)</a-select-option>
                <a-select-option key="22" :value="22">sFTP/SSH (22)</a-select-option>
                <a-select-option key="25" :value="25">SMTP (25)</a-select-option>
                <a-select-option key="110" :value="110">POP3 (110)</a-select-option>
                <a-select-option key="143" :value="143">IMAP (143)</a-select-option>
              </a-select-opt-group>
              <a-select-opt-group label="自定义">
                <a-select-option key="custom" :value="0">自定义端口</a-select-option>
              </a-select-opt-group>
            </a-select>
          </a-form-item>

          <a-form-item v-show="form.getFieldValue('portSelect') === 0" label="自定义端口号">
            <a-input v-decorator="['port', {initialValue: 22, rules:[{required: true}]}]" />
          </a-form-item>

        </template>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import monitors from '@/api/monitor_type'

export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,

      monitors,
      mdl: {
        systemLoad: 80,
        ramUsage: 80,
        diskUsage: 80
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    add () {
      this.visible = true
    },
    onChange () {

    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.load-wrapper {
  position: relative;
  height: 32px;
  padding: 0 80px;

  span {
    position: absolute;
    top: -2px;
    height: 16px;
    line-height: 1;
    font-size: 16px;

    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
  }
}
.interval-wrapper {
  position: relative;
  height: 32px;
  padding-right: 100px;

  span {
    position: absolute;
    top: -2px;
    height: 16px;
    line-height: 1;
    font-size: 16px;

    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
  }
}
</style>
