<template>
  <div id="app">
    <nav
      class="navbar navbar-light bg-dark text-center"
      style="display: flex; justify-content: center"
    >
      <a class="navbar-brand text-center" href="#">
        <img src="./assets/nav-logo-white.png" width="130" height="30" alt="" />
      </a>
    </nav>
    <div class="container mt-5">
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
      <router-view />
    </div>

    <footer class="page-footer font-small blue bottom-absolute">
      <div class="footer-copyright text-center py-3">
        Challenge NewCombin 2022
      </div>
    </footer>
  </div>
</template>

<style>
.bottom-absolute {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
