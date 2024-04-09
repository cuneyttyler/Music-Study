<template>
    <!-- Page Content #F5F5F5 -->
    <div class="pop-up new-graph-popup" style="">
        <!-- Simple Blocks -->
        <div class="shadow-wrapper">
            <div class="block mb-0">
                <span class="pop-up-title">Login</span>
                <hr class="pop-up-title-seperator">

                <div class="row" style="width: 100%;">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control" id="search-input" placeholder="Username"
                                       v-model="user.username">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="search-input" placeholder="Password"
                                       v-model="user.password">
                            </div>

                            <div>
                                <span style="color: white">{{infoText}}</span>
                            </div>
                            <div>
                                <span style="color: red">{{warningText}}</span>
                            </div>

                            <form class="form-inline" style="margin: 0 auto;">
                                    <input type="button" style="width:100%;" class="btn btn-block blue" value="Login"
                                           @click="login()"/>
                            </form>
                            <!-- <div class="social-separator">
                              <hr>
                              <span>&nbsp;or Sign In with&nbsp;</span>
                              <hr>
                            </div>
                            <form class="form-inline" style="margin: 0 auto;">
                              <button @click="registerWithGoogle" class="btn btn-block btn-success">
                                Google Signup
                              </button>
                            </form> -->
                        </div>
                    </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['backendAddress', 'pageType'],
        data() {
            return {
                user: {},
                warningText: '',
                infoText: ''
            }
        },
        async created() {

        },
        methods: {
            login() {
                if (!this.user.username || this.user.username == '' ||
                    !this.user.password || this.user.password == '') {
                    this.warningText = 'All fields must be filled.'
                    return
                }

                axios.post(this.backendAddress + 'api/user/login', this.user)
                    .then((response) => {
                        sessionStorage.setItem('token', response.data.token)
                        document.cookie = 'apitoken=' + response.data.token
                        window.location.href = '/space'
                    }, function (err) {
                        printError(err)
                    })
            },
            registerWithGoogle() {
              gapi.auth2.getAuthInstance().signIn()
                .then(
                  user => {
                    axios.post(this.backendAddress + 'api/user/login/google', user)
                      .then((response) => {
                        sessionStorage.setItem('token', response.data.token)
                        document.cookie = 'apitoken=' + response.data.token
                        window.location.href = '/'
                      }, printError)
                  },
                  err => {
                    console.log('Google login error')
                  }
                )
            }
        }
    };
</script>

<style>
    .login-dialog .vodal-dialog {
        height: 200px!important;
        background-color: #71a5df;
    }

    .login-dialog input.btn {
        width: 75px;
    }

    .pop-up hr {
        padding-bottom: 10px;
    }

    .login-dialog .social-separator span {
      color:white;
      margin-left: 30%;
    }

    .pop-up .new-graph-popup {
      margin: 0;
    }

    .login-dialog .social-separator hr {
      width: 100%;
      margin-top: 10px;
    }
</style>
