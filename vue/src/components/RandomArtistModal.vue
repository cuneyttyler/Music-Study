<template>
    <!-- Page Content #F5F5F5 -->
    <div class="pop-up new-graph-popup" style="">
        <!-- Simple Blocks -->
        <div class="shadow-wrapper">
            <div class="block mb-0">
                <span class="pop-up-title">Find Random Artist</span>
                <hr class="pop-up-title-seperator">

                <div class="row" style="width: 100%;">
                        <div class="col-md-12">
                            <div class="form-group">
                                <select type="select" class="form-control" id="genre-input" 
                                       v-model="genre">
		                           	<option v-for="option in options" :value="option.value">
		                           		option.text
		                           	</option>
                               </select>
                            </div>

                            <div>
                                <span style="color: white">{{infoText}}</span>
                            </div>
                            <div>
                                <span style="color: red">{{warningText}}</span>
                            </div>

                            <form class="form-inline" style="margin: 0 auto;">
                                    <input type="button" style="width:100%;" class="btn btn-block blue" value="Find"
                                           @click="find()"/>
                            </form>
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
                infoText: '',
                genre: None,
                options: []
            }
        },
        async created() {
        	axios.get(this.backendAddress + 'api/genre')
        		.then((response) => {
        			for(var i in response.data) {
        				options.push({'text': response.data[i], 'value': response.data[i]})
        			}
        		})
        },
        methods: {
            find() {
            	if(!genre) {
            		return
            	}
            	axios.get(this.backendAddress + 'api/artist/random/' + genre)
            		.then((response) => {
            			this.$emit('randomArtistFetched', response.data)
            		})
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
