<template>
    <!-- Page Content #F5F5F5 -->
    <div class="pop-up new-graph-popup" style="">
        <!-- Simple Blocks -->
        <div class="shadow-wrapper">
            <div class="block mb-0">
                <span class="pop-up-title">Settings</span>
                <hr class="pop-up-title-seperator">

                <div class="row" style="width: 100%;">
                        <div class="col-md-12">
                            <form class="form-inline" style="margin: 0 auto;">
                                <div class="form-group">
                                    <input type="button" class="btn btn-default blue" value="Connect with Spotify"
                                           @click="connect()">
                                </div>
                            </form>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['backendAddress','frontendAddress', 'pageType'],
        data() {
            return {
            }
        },
        async created() {

        },
        methods: {
            connect() {
                var CLIENT_ID = 'bd2ab95c83ca4ff29004e7f82799a449'
                var scope = 'streaming user-read-private user-read-email user-modify-playback-state '
                window.location.href = 'https://accounts.spotify.com/en/authorize?client_id='
                    + CLIENT_ID + '&redirect_uri=' + this.frontendAddress + '/space' + '&scope=' + scope
                    + '&response_type=code'
            }
        }
    };
</script>

<style>
    .settings-dialog .vodal-dialog {
        height: 130px!important;
        background-color: #71a5df;
    }

    .settings-dialog input.btn {
        width: 150px;
    }

    .pop-up hr {
        padding-bottom: 10px;
    }
</style>
