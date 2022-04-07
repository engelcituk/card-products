<template>
    <div class="loader-out">
        <div class="loader-container">
            <p class="loading-text">Loading...</p>
            <!-- <p class="loading-text2">Loading products ...</p>
            <p class="loading-text3">Loading products ...</p> -->

            <!-- <p class="loading-text">products</p>
            <p>...</p> -->
        </div>
    </div>
</template>
<style scoped>
.loader-out {
  background-color: #333366;
  position:fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.loader-container {
  width:200px;
  height:200px;
  color: white;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  border: 5px solid #18A6A8;
  border-radius: 50%;
  -webkit-animation: borderScale 1s infinite ease-in-out;
  animation: borderScale 1s infinite ease-in-out;
}

.loading-text {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 1.5em;
  position: absolute;
  top: 35%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}


@-webkit-keyframes borderScale {
  0% {
    border: 5px solid white;
  }
  50% {
    border: 25px solid #333366;
  }
  100% {
    border: 5px solid white;
  }
}

@keyframes borderScale {
  0% {
    border: 5px solid white;
  }
  50% {
    border: 25px solid #333366;
  }
  100% {
    border: 5px solid white;
  }
}
</style>