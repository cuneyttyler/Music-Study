<template>
    <div class="top-menu" oncontextmenu="return false;">
      <div class="top-menu-item-wrapper">
          <div class="top-menu-item" v-bind:class="{selected : pageType == 'artist'}">
              <label>
                  <a href="#" @click="showPage($event,'artist')">Artists</a>
              </label>
          </div>
      </div>
      <div class="top-menu-item-wrapper">
          <div class="top-menu-item" v-bind:class="{selected : pageType == 'album'}">
              <label>
                  <a href="#" @click="showPage($event,'album')">Albums</a>
              </label>
          </div>
      </div>
      <div class="top-menu-item-wrapper">
          <div class="top-menu-item" v-bind:class="{selected : pageType == 'track'}">
              <label>
                  <a href="#" @click="showPage($event,'track')">Tracks</a>
              </label>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        props: ['pageType'],
        data() {
            return {
            }
        },
        async created() {
            let self = this;
        },
        methods: {
            showPage(e,pageType) {
                this.$emit('pageType:switch', pageType)
            }
        }
    };

</script>

<style>
.top-menu {
    margin-left: 42.5%;
    margin-top: -1px;
    display: flex;
    position: absolute;
}

.top-menu-item {
    display: flex;
    text-align: center;
    padding: 3px 0px 3px 0px;
    /*margin: 10px 0px 10px 0px;*/
    /*border-top-right-radius: 30%;*/
    /*border-bottom-right-radius: 30%;*/
    border-radius: 30%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-right: 5px;
    margin-top: -8px;
}

.top-menu-item label {
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 15px;
}

.top-menu-item {
    background-color: #779ce8;
    box-shadow: 0 0 5px 3px #779ce8;
}

.top-menu-item.selected {
    padding: 6px;
    margin-top: -8px;
    /* background-color: #648ee3; */
    /* box-shadow: 0 0 5px 3px #779ce8; */
}

.top-menu-item.selected label {
    margin-left: 0px;
}

.top-menu-item-wrapper {
    display: inline-block;
}

.top-menu-item.selected a {
  color: #f6f328;
}

.top-menu-item:hover {
  background-color: #779ccc;
}

.top-menu-item a {
    display: table-cell;
    vertical-align: middle;
    white-space: nowrap;
    color: white;
}

.top-menu-item a:hover {
  text-decoration: none;
}

.top-menu-item.add-subcategory a:hover {
    text-decoration: none;
}



</style>
