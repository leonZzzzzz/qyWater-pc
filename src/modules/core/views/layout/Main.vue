<template>
  <el-container>
    <el-header>
      <header class="logo" style="margin-left: 15px">
        <img class="logo-img" src="../login/logo.png" />
      </header>
      <div class="user">
        <el-dropdown class="el-dropdown" :hide-on-click="false">
          <span>
            欢迎，{{ user.username }}
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item @click.native="digShow = true">修改密码</el-dropdown-item> -->

            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="position: fixed; top: 60px; bottom: 0; width: 100%">
      <el-aside style="user-select: none">
        <ul class="nav-items" :style="`width: ${open ? 120 : 50}px`">
          <li
            v-for="(item, index) in menuTree"
            :key="item.id"
            :class="{ 'nav-item--active': index == selectTreeIndex }"
            class="nav-item"
            @click="selectTreeIndex = index"
          >
            <img
              v-if="item.activateIcon || item.icon"
              style="
                vertical-align: text-top;
                width: 18px;
                display: inline-block;
                height: 18px;
              "
              :src="`${imgHost}${
                index == selectTreeIndex ? item.activateIcon : item.icon
              }`"
              :title="item.name"
            />
            <span style="margin-left: 15px">{{ item.name }}</span>
          </li>
          <li
            class="nav-item"
            @click="open = !open"
            style="
              text-align: center;
              position: absolute;
              bottom: 60px;
              width: 100%;
              padding: 0;
            "
          >
            <span
              :class="`${
                open ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'
              }`"
            ></span>
          </li>
        </ul>
        <el-menu
          :unique-opened="true"
          :router="true"
          :default-active="$route.path"
          :style="`border: none;margin-left: ${
            open ? 120 : 50
          }px;width: 130px;transition: all 0.5s;`"
        >
          <el-submenu
            v-for="(item, index) in menuTree[selectTreeIndex].childs"
            :index="index + '-'"
            :key="index"
          >
            <template slot="title">{{ item.name }}</template>
            <el-menu-item
              v-for="list in item.childs"
              :key="list.id"
              :index="list.url"
              >{{ list.name }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      open: true,
      selectTreeIndex: 0,
      menuTree: [{ childs: [] }],
      user: {
        username: ''
      }
    }
  },
  created() {
    console.log(this.$route)
    this.user = JSON.parse(localStorage.getItem('user')) || {}
    this.getMenuTree()
    this.getApplist()
    // user字段表：
    // app: {
      // appId: "ba7a061a3d494a8992d070180d62ac25"
      // code: "kingsuer_test"
      // createTime: 1563363065000
      // customerName: "备孕记录"
      // endDate: 1878825600000
      // id: "ba7a061a3d494a8992d070180d62ac25"
      // isDeleted: false
      // logUrl: ""
      // name: "备孕记录"
      // remark: "测试app"
      // status: 1
      // updateTime: 1563363065000
    // }
    // username: "admin"
  },
  methods: {
    getApplist() {
      let appTypeList = []
      this.$http.pageWxApp().then(res => {
        if (res.data.data && res.data.data.list) {
          appTypeList = res.data.data.list.filter(item => item.serviceType).map(item => item.serviceType)
          this.$store.commit('updateAppTypeList', appTypeList)
          localStorage.setItem('appTypeList', JSON.stringify(appTypeList))
          console.log('getApplist', appTypeList)
        }
      })
    },
    getMenuTree() {
      this.$http.getMenuTree().then(res => {
        this.menuTree = res.data.data
        // let list = [
        //   { name: '用户管理', id: '用户管理', 
        //     childs: [
        //       {name: '用户列表', id: '用户列表', url: '/main/user/list'}
        //     ]
        //   }
        // ]
        // this.menuTree[0].childs.push(...list)
      })
    },
    logout() {
      this.$confirm('确定退出当前账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.logout().then(() => {
            this.$router.replace('/login')
            localStorage.removeItem('user')
          })
        })
        .catch(() => {
          return
        })
    },
    jumpPage() {
      this.$router.push('/layout/personal');
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  .el-header {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 1px 2px 3px rgba(218, 218, 218, 0.88);
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      &-img {
        height: 45px;
      }
    }
    .user {
      margin: 20px 0;
    }
  }
  .el-aside {
    position: relative;
    width: auto !important;
    height: 100vh;
    &::-webkit-scrollbar {
      display: none;
    }
    .nav-items {
      font-size: 14px;
      color: #fff;
      position: absolute;
      left: 0;
      height: 100vh;
      background: $--color-primary;
      transition: all 0.5s;
      .nav-item {
        height: 54px;
        line-height: 54px;
        padding: 0 15px;
        overflow: hidden;
        cursor: pointer;
        &--active {
          background: #fff;
          color: $--color-primary;
        }
      }
    }
  }

  .el-main {
    background: #f5f5f5;
  }
}
</style>
