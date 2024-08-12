<script setup lang="ts">
import router from '@/router';
import { ElMessage, type FormRules } from 'element-plus';
import { ref } from 'vue';


type ruleForms = {
  name: string,
  password: string
}
const ruleForm = ref({
  name: '12345',
  password: '123456'
})
const showLogin = ref(true)
const showEnroll = ref(true)

const rules = ref<FormRules<ruleForms>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'blur',
    },
  ],
})

const generateRandomToken = () => {
  // 生成一个随机的 32 位字符串作为 token
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
};

const login = () => {
  const storedName = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (ruleForm.value.name === storedName && ruleForm.value.password === storedPassword) {
    const token = generateRandomToken();
    localStorage.setItem('user-token', token);
    router.push('test1');
  } else {
    ElMessage({type:'error',message:'用户名或密码错误'})
  }
};

const enroll = () => {
  localStorage.setItem('username', ruleForm.value.name);
  localStorage.setItem('password', ruleForm.value.password);
  ElMessage({type:'success',message:'注册成功'})
  goLogin();
};
const goEnroll = () =>{
  showLogin.value = false
  showEnroll.value = true
}
const goLogin = () =>{
  showLogin.value = true
  showEnroll.value = false
}
const enrollRule = ref()
</script>

<template>
  <div class="login" v-show="showLogin">
    <el-card class="card">
      <h3>登陆页面</h3>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="right" label-width="70px"
        style="padding-right: 10px; margin-top: 30px;">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
        <el-button type="primary" @click="goEnroll">去注册</el-button>
      </el-form>
    </el-card>
  </div>
  <div class="enroll" v-show="showEnroll">
    <el-card class="card">
      <h3>注册页面</h3>
      <el-form :model="enrollRule" :rules="rules" label-position="right" label-width="70px"
        style="padding-right: 10px; margin-top: 30px;">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-button type="primary" @click="enroll">注册</el-button>
        <el-button type="primary" @click="goLogin">去登陆</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.card {
  max-width: 480px;
  margin: 0 auto;
  margin-top: 300px;
  text-align: center;
}

.el-form-item {
  margin-top: 50px;
}

.el-button {
  margin-top: 20px;
}
</style>
