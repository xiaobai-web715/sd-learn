<template>
    <div>
        <div>登录页面</div>
        <div>
            <form>
                <input v-model="formData.user"><br>
                <input
                    v-model="formData.password"
                    type="password"
                >
            </form>
            <button @click="submit">
                登录
            </button>
        </div>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import axios from '@/http/index';
import {useStore} from 'vuex';
import {SET_AUTH} from '@/store/actionsTypes';
const store = useStore();
const router = useRouter();
const formData = ref({
    user:'',
    password:'',
});
const submit = () => {
    axios(
        '/sytUser/login',
        'post',
        formData.value
    ).then(res => {
        console.log('res', res);
        if (res.code === 200) {
            store.dispatch(SET_AUTH, {token: true});
            sessionStorage.setItem('token', true);
            router.push('/');
        }
    });
};
</script>