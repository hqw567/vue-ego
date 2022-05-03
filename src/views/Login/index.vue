<template>
  <div class="container">
    <el-card class="login">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item required label="账号" prop="user">
          <el-input v-model.number="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item required label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
import { mapMutations } from 'vuex'
export default {
  name: 'My-Login',
  data() {
    const checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '123',
        user: 'admin'
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        user: [{ validator: checkUser, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations('loginModule', ['setUser']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .getLogin({
              username: this.ruleForm.user,
              password: this.ruleForm.pass
            })
            .then(res => {
              if (res.data.status === 200) {
                console.log(jwt(res.data.data))
                const obj = {
                  user: jwt(res.data.data).username,
                  token: res.data.data
                }
                this.setUser(obj)
                localStorage.setItem('user', JSON.stringify(obj))
                this.$router.push('/')
              } else {
                this.$message.error(`登录失败，${res.data.msg}`)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  padding: 0px 20px;
}
</style>
