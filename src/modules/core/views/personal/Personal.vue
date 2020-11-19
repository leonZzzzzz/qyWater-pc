<template>
  <div class="personal">
    <h2>个人中心</h2>
    <div class="content">
      <h4>基本资料<span class="change" @click="onChangeData">修改</span></h4>
      <ul class="item">
        <li class="list"><span class="label">帐号：</span>{{userInfo.account}}</li>
        <li class="list"><span class="label">密码：</span>{{userInfo.password}}</li>
        <li class="list"><span class="label">昵称：</span>{{userInfo.nickName}}</li>
        <li class="list"><span class="label">邮箱：</span>{{userInfo.email}}</li>
        <li class="list"><span class="label">手机：</span>{{userInfo.mobile}}</li>
        <li class="list">
          <span class="label">类型：</span>
          {{userInfo.status === 1 ? "超级管理员" : "普通管理员"}}
        </li>
      </ul>
    </div>
    <change-userinfo-dig v-if="visible"
      :visible="visible"
      :values="values"
      @close="digClose"></change-userinfo-dig>
  </div>
</template>

<script>
import ChangeUserinfoDig from '@/views/common/ChangeUserinfoDig';

export default {
  data() {
    return {
      visible: false,
      userInfo: { },
      values: ''
    };
  },
  components: {
    ChangeUserinfoDig
  },
  created() {
    this.apiGetInfo(JSON.parse(sessionStorage.getItem('USERINFO')).id);
  },
  methods: {
    apiGetInfo(id) {
      this.$http.get('/account/get', { id })
        .then((res) => {
          this.userInfo = res.data.content0;
        });
    },
    onChangeData() {
      this.values = JSON.stringify(this.userInfo);
      this.visible = true;
    },
    digClose(e) {
      if (e === 1) {
        this.apiGetInfo(this.userInfo.id);
      }
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.personal {
  .content {
    padding: 25px 15px;
    margin-top: 10px;
    border-radius: 2px;
    background: #eee;
    box-shadow: 0 3px 0px #dadada;
    .change {
      padding: 2px 5px;
      margin-left: 10px;
      font-weight: normal;
      font-size: 12px;
      border-radius: 3px;
      background: #fff;
    }
    .item {
      .list {
        font-size: 14px;
        list-style: none;
        margin-top: 15px;
        .label{
          color: #828282;
        }
      }
    }
  }
}
</style>
