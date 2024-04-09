<template>
    <!-- Page Content #F5F5F5 -->
    <div class="pop-up new-graph-popup" style="">
        <!-- Simple Blocks -->
        <div class="shadow-wrapper">
            <div class="block mb-0">
                <span class="pop-up-title">Register</span>
                <hr class="pop-up-title-seperator">

                <div class="row" style="width: 100%">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control" id="search-input" placeholder="First Name"
                                       v-model="user.firstName">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="search-input" placeholder="Last Name"
                                       v-model="user.lastName">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="search-input" placeholder="Username"
                                       v-model="user.username">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="search-input" placeholder="E-mail"
                                       v-model="user.email">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="search-input" placeholder="Password"
                                       v-model="user.password">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="search-input"
                                       placeholder="Password (Repeat)"
                                       v-model="passwordRepeat">
                            </div>

                            <div>
                                <span style="color: white">{{infoText}}</span>
                            </div>
                            <div>
                                <span style="color: red">{{warningText}}</span>
                            </div>

                            <form class="form-inline" style="margin: 0 auto;">
                              <button class="btn btn-block blue" value="Login"
                                     @click="register()">Register</button>
                            </form>

                            <!-- <div class="social-separator">
                              <hr>
                                <span>&nbsp;or Sign Up with&nbsp;</span>
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
                passwordRepeat: null,
                warningText: '',
                infoText: ''
            }
        },
        async created() {

        },
        methods: {
            register() {
                if (!this.user.username || this.user.username == '' || !this.user.email || this.user.email == '' ||
                    !this.user.password || this.user.password == '' || !this.passwordRepeat || this.passwordRepeat == '' ||
                    !this.user.firstName || this.user.firstName == '' || !this.user.lastName || this.user.lastName == '') {
                    this.warningText = 'All fields must be filled.'
                    return
                }

                if (this.user.password.length < 6) {
                    this.warningText = 'Password length should be at least 6.'
                }

                if (this.user.password != this.passwordRepeat) {
                    this.warningText = 'Passwords do not match.'
                    return
                }

                axios.post(this.backendAddress + 'api/user/signup', this.user)
                    .then((response) => {
                        this.infoText = 'Your account has been created.'
                        setTimeout(()=>{
                        window.location.href = ''
                      }, 2000)
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
    .register-dialog .vodal-dialog {
        height: 350px!important;
        background-color: #71a5df;
    }

    .register-dialog input.btn {
        width: 100px;
    }

    .pop-up hr {
        padding-bottom: 10px;
    }

    .register-dialog .social-separator hr {
      width: 100%;
      margin-top: 10px;
    }


    .register-dialog .social-separator span {
      color:white;
      margin-left: 30%;
    }

    .pop-up .new-graph-popup {
      margin: 0;
    }

    .register-dialog .social-separator hr {
      width: 100%;
      margin-top: 10px;
    }
</style>
