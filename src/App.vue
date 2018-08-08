<template>
  <div id="app" class="container-fluid  mt-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-11 col-xs-10 col-sm-8 col-md-6 col-lg-4">
        <Navigation/>
        <div id="view">
          <transition name="component-slide" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";
  export default {
    components: {
      Navigation
    }
  };
</script>


<style lang="scss">
  .component-slide-enter-active, .component-slide-leave-active {
  transition: opacity .3s ease-in-out;
}
.component-slide-enter, .component-slide-leave-to
/* .component-slide-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
