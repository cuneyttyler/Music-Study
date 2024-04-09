<template>
    <div class="wrapper">

        <!-- HEADER -->
        <my-header :page="'confirmation'" @register:show="showRegisterDialog=true"
                   @login:show="showLoginDialog=true"></my-header>

        <div class="core memory clearfix row">
            <div class="confirmation-block">
                <span>{{responseText}}</span>
            </div>
        </div>

        <!-- CUSTOM CONTEXT MENU MEMORY BOX-->

        <div class="footer"></div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import MyHeader from '@/components/MyHeader.vue'

    import axios from 'axios'


    export default {
        name: 'Memory',
        components: {MyHeader},
        data() {
            return {
                backendAddress:'http://localhost:8000/',
                responseText: 'Your account is being confirmed.',
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            }
        },
        computed: {},
        async created() {
            let searchParams = new URLSearchParams(window.location.search)
            let code = searchParams.get('code')

            axios.get(this.backendAddress + 'api/user/confirmation/' + code)
                .then((response) => {
                    this.responseText = 'Your account has been confirmed. You are being redirected to Home page in 5 seconds.'
                    setTimeout(function() {
                        window.location.href = '/'
                    }, 5000)
                },printError)
        },
        methods: {}
    }
</script>


<style lang="scss">
    #self {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

</style>
