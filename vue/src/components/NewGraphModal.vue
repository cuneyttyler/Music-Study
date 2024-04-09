<template>
    <!-- Page Content #F5F5F5 -->
    <div class="pop-up new-graph-popup" style="">
        <!-- Simple Blocks -->
        <div class="shadow-wrapper">
            <div class="block mb-0">

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Create Graph</label>
                            <input type="text" class="form-control search-input" id="search-input" placeholder="Name"
                                   v-model="graphName">
                        </div>
                        <form class="form-inline">
                            <div class="form-group">
                                <input type="button" class="btn btn-default blue" value="Create"
                                       @click="save()">
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
        props: ['backendAddress', 'pageType'],
        data() {
            return {
                graphName: ""
            }
        },
        async created() {

        },
        methods: {
            save() {
                var type = this.pageType == 'artist' ? 1 : 2
                axios.post(this.backendAddress + 'api/createGraph', {name: this.graphName, type: type})
                    .then((response) => {
                        this.$emit("graph:saved", response.data)
                    }, function (err) {
                    });
            }
        }
    };
</script>