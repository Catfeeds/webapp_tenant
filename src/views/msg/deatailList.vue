<template>
  <div class="detail">
    <!-- <div class="header">
      <div class="left"></div>
      <div class="center">系统消息</div>
      <div class="right"></div>
    </div> -->
    <csheader>系统消息 <span ref="edit" class="edit" slot="right" @click="edit">编辑</span></csheader>
    <div class="content">
    <div class="list" v-for="item in list" :key="item.id" :class="{read: item.status==1}">
      <div class="time">{{item.addTime}}</div>
      <div class="title">{{item.fileTitle}}</div>
      <div class="label">{{item.content}}</div>
      <Cell title="查看详情" is-link @click.native="goDetail(item)"></Cell>
    </div>
    <nodata v-if="list.length===0" imgSrc="wuxiaoxitongzhi" text="暂无消息"></nodata>
    </div>
    <Popup v-model="pupvisible" popup-transition="popup-fade" class="pop" :style="{ top: buttonBottom + 0 + 'px' }">
      <div class="item" @click="allRead">
        <img src="./icon/icon_yidu@2x.png" alt="" width="19" height="19"><span class="txt">全部已读</span>
      </div>
      <div class="item" style="border-top: 1px solid #f1f1f1;" @click="empty">
        <img src="./icon/icon_qingkong@2x.png" alt="" width="19" height="19"><span class="txt">清空</span>
      </div>
    </Popup>
  </div>
</template>

<script>
import {queryUsersMessageDetails, usersReadMessage, usersDelMessage} from '@/api/message'
import csheader from '@/components/header'
import {Cell, Popup} from 'mint-ui'
import mypop from '@/components/myPopup'
import nodata from 'components/nodata/index'
export default {
  data () {
    return {
      buttonBottom: 0,
      pupvisible: false,
      list: [],
      detail: {},
      detailVisible: false
    }
  },
  methods: {
    getDetailiList () {
      queryUsersMessageDetails(this.$route.params.type).then(res => {
        // console.log(res)
        if (res.code === 1) {
          this.list = res.data
        }
      })
    },
    readMessage (item) {
      usersReadMessage(item.id).then(res => {
        if (res.code === 1) {
          // console.log(res, '读取成功')
          // let idx = this.list.indexOf(item)
          item.status = 1
        }
      })
    },
    goDetail (item) {
      // this.detail = item
      // this.readMessage(item)
      // this.detailVisible = true
      this.$store.dispatch('setMsg', item)
      this.$router.push(`/msgdetails/${item.id}`)
    },
    delMessage (id) {
      usersDelMessage(id).then(res => {
        if (res.code === 1) {
          this.list = []
        }
      })
    },
    edit () {
      console.log('edit')
      this.pupvisible = true
    },
    allRead () {
      console.log('read')
      this.pupvisible = false
      for (let item of this.list) {
        this.readMessage(item)
      }
    },
    empty () {
      console.log('ennn')
      this.pupvisible = false
      for (let item of this.list) {
        this.delMessage(item.id)
      }
    }
  },
  mounted () {
    if (this.$refs.edit) {
      this.buttonBottom = this.$refs.edit.getBoundingClientRect().bottom
    }
    this.getDetailiList()
  },
  components: {
    csheader, Cell, Popup, mypop, nodata
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.header {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
  background-color: #ffffff;
  box-shadow: 0px 1px 0px 0px#f1f1f1;
  .edit {
    display: inline-block;
  }
}
.content {
  height: calc(100vh - 44px);
  overflow: scroll;
}
.list {
  background-color: #ffffff;
  &.read{
    // color: @gray;
    opacity: .5;
  }
  .time{
    padding: 15px;
    color: @gray;
    text-align: center;
  }
  .title{
    font-size: 14px;
    padding: 0 15px;
  }
  .label{
    line-height: 18px;
    padding: 15px;
    color: @gray;
    max-height: 90px;
  }
  .de {
    .label{
      max-height: none;
    }
  }
}
.pop{
  width: 100px;
  border-radius: 8px;
  // padding: 0 10px;
  right: -12%;
  left: inherit;
  transform: translate(-50%, 0);
  &::before {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -20px;
    right: 10px;
  }
  .item {
    padding: 10px;
    .txt{
      line-height: 19px;
      vertical-align: top;
      margin-left: 8px;
      &+.txt{
        border-top: 1px solid #f1f1f1;
      }
    }
  }
}
.nomsg {
  text-align: center;
  padding-top: 60px;
  color: @gray;
}
</style>
