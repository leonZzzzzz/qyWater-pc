<template>
  <div id="login" class="container">
    <section class="content">
      <!-- 登录 开始 -->
      <div>
        <div class="tabhead">
          <div class="tab" :class="{ 'theme-color': showTab == 1 }" @click="handleSelect(1)">
            <i class="iconfont icon-zhanghudenglu-hui"></i>
            <span>账号登录</span>
          </div>
        </div>
        <!-- 账号登陆 -->
        <el-form v-show="showTab == 1" :model="model" class="form" :rules="rules" ref="model">
          <el-form-item label prop="username">
            <el-input
              type="text"
              v-model="model.username"
              placeholder="请输入账号"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="password">
            <el-input
              type="password"
              v-model="model.password"
              placeholder="请输入密码"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="button" @click="login()" :loading="loading">登 录</el-button>
        </el-form>

        <!-- <p class="text-reg">
          没有账号？
          <span @click="jumpPage('/register')">立即注册</span>
        </p>-->
      </div>
      <!-- 登录 结束 -->
    </section>
    <!-- <footer class="footer">
      <p>Copyright 2013-{{ new Date().getFullYear() }} 企成科技 版权所有</p>
    </footer>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      showModel: 1,
      showTab: 1,
      isRemember: false,
      versionList: [],
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSelect(index) {
      this.showTab = index
    },
    jumpPage(url) {
      this.$router.push(url)
    },
    remember(val) {
      this.isRemember = val
    },
    apiLogin(data) {
      this.$http
        .login(data)
        .then(res => {
          // sessionStorage.setItem('USERINFO', JSON.stringify(res.data.username));
          // this.$router.push('/layout/user');
          this.$store.dispatch('init')
          localStorage.setItem('user', JSON.stringify(res.data.data))
          this.$router.replace('/main/index')
        })
        .catch(err => {
          this.loading = false
          this.$message.error(err.data.message)
          console.log('登陆接口失败', err)
        })
    },
    openTips(text) {
      this.$confirm(text, '提示', {
        confirmButtonText: '立即升级',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        closeOnClickModal: false,
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          this.toBuy()
        })
        .catch(() => {})
    },
    toBuy() {
      this.$router.push('/main/myServices/myOrder')
    },
    getApp(id) {
      this.$http.getApp({ id: id }).then(res => {
        console.log(res.data)
        if (res.data.data.name) this.base.setTitle(res.data.data.name)
        document.title = this.base.getTitle()
      })
    },
    login() {
      this.loading = true
      this.$refs.model.validate(valid => {
        if (valid) {
          this.apiLogin(this.model)
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
#login {
  position: absolute;
  width: 100%;
  height: 100%;
  // background: #ebeef2;
  background: #edf4fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  .login-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .content {
    position: relative;
    background: #fff;
    // width: 400px;
    // min-height: 480px;
    // margin-bottom: 100px;
    border-radius: 10px;
    box-shadow: 0px 1px 10px 0px #ccc;
    padding: 30px 50px;
    box-sizing: border-box;
    .tabhead {
      .tab {
        font-size: 24px;
        cursor: pointer;
        color: #000;
        padding: 5px;
      }
    }
    .form {
      width: 300px;
      padding: 30px 0 0;
      clear: both;
      .el-form-item .el-form-item__label {
        line-height: 40px;
      }
      .code-img {
        display: inline-block;
        width: 120px;
        height: 38px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        text-align: center;
        // float: right;
      }
      .get-code {
        display: inline-block;
        width: 120px;
        height: 36px;
        border-radius: 4px;
        text-align: center;
        border: 1px solid #2161ad;
        color: #2161ad;
        cursor: pointer;
      }
      .button {
        width: 100%;
        margin-top: 40px;
      }
    }
    .wechat {
      width: 300px;
      .qrcode {
        width: 230px;
        margin: 30px auto;
        img {
          width: 100%;
        }
      }
      p {
        color: #999;
        font-size: 14px;
        text-align: center;
        line-height: 2;
        margin: 0 auto;
      }
    }
    .text-reg {
      text-align: center;
      margin-top: 30px;
      color: #999;
      span {
        color: #2161ad;
        cursor: pointer;
      }
    }
  }
  .footer {
    // position: absolute;
    // bottom: 0;
    // width: 100%;
    padding: 20px 0;
    text-align: center;
    //  color: #fff;
    color: #2161ad;
    font-size: 14px;
  }
}
</style>
