<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"> Web APIs </a>
      <div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
