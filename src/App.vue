<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/hamburguesas">Hamburguesas</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  /* Utilizar todo el alto de la ventana si el contenido es más pequeño (útil para empujar el footer) */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 30px;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
