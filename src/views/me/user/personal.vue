<template>
  <div class="personal">
    <csheader>个人资料 <div slot="right" @click="finsh">完成</div></csheader>
    <!-- <div class="finsh"></div> -->
    <field class="head" placeholder="修改头像">
      <div class="flex">
        <div class="headImg" slot="label"><div class="box"><img v-if="userInfo.imageurl" :src="`${userInfo.imageurl}?imageMogr2/auto-orient`" width="60" height="60"><i v-else class="bg"></i></div></div>
        <div class="btn" @click="uploadImg">修改头像
          <input ref="upload" id="upload" type="file" class="realfilebt" style="display: none;">
        </div>
      </div>
    </field>
    <field label="昵称" placeholder="请输入昵称" v-model="userInfo.nickname" disableClear :font-size="14"></field>
    <!-- <field label="性别" placeholder="" v-model="sex" disabled @click.native="sexClick" :font-size="14"></field> -->
    <field label="手机号" placeholder="" v-model="phone" disabled :font-size="14"></field>
    <Actionsheet :actions="action" v-model="sexVisible" cancel-text="" :font-size="14"></Actionsheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Toast, Actionsheet} from 'mint-ui'
import {getUserInfo, updateCsUsers, getQiniuToken} from '@/api/user'
import csheader from '@/components/header'
import axios from 'axios'
import field from 'components/field'
// import {} from '@/api/' headers:{'Content-Type':'multipart/form-data'}
const axiosInstance = axios.create({
  'Content-Type': 'multipart/form-data'
})
export default {
  data () {
    return {
      userInfo: {
        id: null,
        nickname: null,
        imageurl: '',
        sex: null
      },
      sex: '',
      phone: null,
      sexVisible: false,
      token: '',
      action: []
    }
  },
  created () {
    this._getUserInfo()
  },
  mounted () {
    const self = this
    this.initActions()
    getQiniuToken().then(res => {
      if (res.code === 1) {
        // console.log(res)
        this.token = res.data
      }
    })
    this.$refs.upload.addEventListener('change', function () {
      console.log(this.files)
      var data = new FormData()
      data.append('token', self.token)
      data.append('file', this.files[0])
      // data.
      axiosInstance({
        method: 'POST',
        url: 'http://upload-z2.qiniup.com/',
        data: data,
        onUploadProgress: function (progressEvent) {
          // var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total)
          console.log(progressEvent)
          // 对应上传进度条
          // self.progress = percentCompleted
        }
      }).then(function (res) {
        console.log(res)
        self.userInfo.imageurl = `https://img.chengsu.vip/${res.data.key}`
        console.log('res', res)
      })
        .catch(function (err) {
          console.log('err', err)
        })
    })
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    _getUserInfo () {
      getUserInfo().then(res => {
        console.log(res)
        if (res.code === 1) {
          this.userInfo.id = res.data.id
          this.userInfo.sex = res.data.sex
          this.sex = this.mysex(res.data.sex)
          this.userInfo.imageurl = res.data.imageurl
          this.userInfo.nickname = res.data.nickname
          this.phone = res.data.phone
          this.setSex()
        } else if (res.code === 2) {
          this.$router.push('/login')
        }
      })
    },
    _updateCsUsers () {
      updateCsUsers(this.userInfo).then(res => {
        console.log(res)
        if (res.code === 1) {
          Toast('个人资料修改成功')
          let data = JSON.parse(JSON.stringify(this.userData))
          Object.assign(data, this.userInfo)
          this.$store.dispatch('setUser', data)
        }
      })
    },
    mysex (val) {
      let value = ''
      switch (val) {
        case 1:
          value = '男'
          break
        case 2:
          value = '女'
          break
        default:
          // value = '保密'
          break
      }
      return value
    },
    uploadImg () {
      console.log('sss')
      this.$refs.upload.click()
    },
    finsh () {
      console.log('ssssa')
      this._updateCsUsers()
    },
    setSex () {
      let value = ''
      switch (this.userInfo.sex) {
        case 1:
          value = '男'
          break
        case 2:
          value = '女'
          break
        default:
          value = '保密'
          break
      }
      this.sex = value
    },
    sexClick () {
      if (this.userData.auditing === 0) {
        this.sexVisible = true
      }
    },
    setMale () {
      this.sex = '男'
      this.userInfo.sex = 1
    },
    setFemale () {
      this.sex = '女'
      this.userInfo.sex = 2
    },
    initActions () {
      this.action = [{
        name: '男',
        method: this.setMale
      }, {
        name: '女',
        method: this.setFemale
      }]
    }
  },
  components: {
    field, Toast, Actionsheet, csheader
  }
}
</script>

<style lang="less" scoped>
.personal {
  position: relative;
  .finsh {
    position: absolute;
    z-index: 1;
    top: -45px;
    right: 0;
    padding: 15px;
  }
  .box{
    float: left;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 4px 16px 0px rgba(232, 232, 232, 0.61);
    text-align: center;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .bg{
      display: inline-block;
      width: 34px;
      height: 50px;
      background-image: url(../img/icon_logo@2x.png);
      background-size: contain;
      background-repeat: no-repeat;
      margin-top: 7px;
    }
  }
  .flex{
    display: flex;
    .headImg{
      margin-top: 50px;
      flex: 0 0 100px;
      margin-bottom: 15px;
    }
    .btn{
      flex: 1;
      margin-top: 50px;
      padding-top: 20px;
      font-size: 14px;
      color: #848484;
    }
  }
}
</style>
