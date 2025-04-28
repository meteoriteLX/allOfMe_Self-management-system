<script setup>
import {ref} from 'vue'
  const offset = ref(0);
  const current_slide_num = ref(1); 
  const barOffset = ref(0);

    function slideTo(slide_num) 
    {
      drawerboxToggle(slide_num); 
      drawerbtnToggle(slide_num);

      let pre_slide_num = current_slide_num.value;
      current_slide_num.value = slide_num;
      offset.value += (current_slide_num.value - pre_slide_num) * (-100); 
      barOffset.value += (current_slide_num.value - pre_slide_num) * (100); 
      barSlide(barOffset.value); 

      const slides = document.querySelectorAll(".card");
      Array.from(slides).forEach(slide => {
        slide.style.transform = `translateY(${offset.value}%)`;
      })
    }
    function drawerboxToggle(drawer_box_num) {
      let pre_drawer_box_num = current_slide_num.value;
      const drawerboxes = document.querySelectorAll(".drawer-box");
      drawerboxes[pre_drawer_box_num - 1].classList.toggle("active"); 
      drawerboxes[drawer_box_num - 1].classList.toggle("active");
    }
    function drawerbtnToggle(drawer_btn_num) {
      let pre_drawer_btn_num = current_slide_num.value;
      const drawerBtns = document.querySelectorAll(".drawer-btn");
      drawerBtns[pre_drawer_btn_num - 1].classList.toggle("active"); 
      drawerBtns[drawer_btn_num - 1].classList.toggle("active"); 
    }
    function barSlide(barOffset) {
      const bar = document.querySelector(".bar");
      bar.style.transform = `translateY(${barOffset}%)`;
    }
</script>

<template>
  <div class="main">
    <div class="left-section">
      <div class="drawer-boxes">
        <div class="drawer-box active">
          <button class="drawer-btn active" @click="slideTo(1)">HomePage<span class="drawer-head">首页</span></button>
        </div>
        <div class="drawer-box">
          <button class="drawer-btn" @click="slideTo(2)">TodoList<span class="drawer-head">待办</span></button>
        </div>
        <div class="drawer-box">
          <button class="drawer-btn" @click="slideTo(3)">Calendar<span class="drawer-head">日历</span></button>
        </div>
        <div class="drawer-box">
          <button class="drawer-btn" @click="slideTo(4)">Diary<span class="drawer-head">日记</span></button>
        </div>
      </div>
    </div>
    

    <div class="slide-section">
      <div class="slide-bar">
        <div class="bar"></div>
      </div>
      <div class="card-section">
        <div class="card">
          <div class="card-title">首页</div>
          <div class="card-content">这是首页</div>
          <!-- <div class="card-img">
            <img src="" alt="">
          </div> -->
          <div class="btn-box">
            <button class="main-btn">前往</button>
            
            
          </div>
        </div>
        <div class="card">
          <div class="card-title">待办</div>
          <div class="card-content">这是待办事项</div>
          <!-- <div class="card-img">
            <img src="" alt="">
          </div> -->
          <div class="btn-box">
            <button class="main-btn">前往</button>
            <router-link to="/todos" class="nav-btn">待办事项</router-link>
          </div>
        </div>
        <div class="card">
          <div class="card-title">日历</div>
          <div class="card-content">这是日历</div>
          <!-- <div class="card-img">
            <img src="" alt="">
          </div> -->
          <div class="btn-box">
            <button class="main-btn">前往</button>
            <router-link to="/calendar" class="nav-btn">日历视图</router-link>
          </div>
        </div>
        <div class="card">
          <div class="card-title">日记</div>
          <div class="card-content">这是日记</div>
          <!-- <div class="card-img">
            <img src="" alt="">
          </div> -->
          <div class="btn-box">
            <button class="main-btn">前往</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.main {
  background-image: url(../assets/img/bg2.jpg);
  height: 100vh;
  width: 100vw;
  display: flex;
  background-size: cover;
  justify-content: center;
  align-items: center;
}

.left-section{
  width: 35%;
  height: 100vh;
  position: relative;
  padding: 20px 0;
}

.drawer-boxes{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  /* flex-wrap: wrap;  */
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin-left: 10%;

}
.drawer-boxes::before{
  content: "";
      width: 8px;
      height: 94%;
      position: absolute;
      left: -10px;
      top: 3%;
      z-index: 120;
      


}
.drawer-box{
  height: calc(100% /5.5);
  width: 70%;
  flex: 0 1 auto; 
  position: relative;
  z-index: 100;
  transform: translateX(-70%);
  transition: transform .5s ease-in-out;

}

.drawer-box.active {
      transform: translateX(0);
}

.drawer-btn {
  width: 100%;
  height: 100%;
  border: none;
  font:800 30px '';
  background-color: rgb(175, 207, 255);
  transition: background-color .5s ease-in-out;
  color: #ffffff00;

}
.drawer-btn.active {
      background-image: url(../assets/img/bg2.jpg);
      background-size: cover;
      color: rgb(70, 100, 180);
}
.drawer-head {
      position: absolute;
      color: rgb(255, 255, 255);
      font-size: 50px;
      font-weight: 600;
      right: -38px;
      top: calc(50% - 40px);
      text-shadow: 2px -1px 8px rgba(111, 80, 250, 0.323);
}
.slide-section {
  width: 65%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 40px;
  background: linear-gradient(to right bottom,
          rgba(255, 255, 255, .6),
          rgba(255, 255, 255, .3),
          rgba(255, 255, 255, .2));
  backdrop-filter: blur(11px);
}
.slide-bar {
    position: absolute;
    top: 10%;
    left: 40px;
    height: 80%;
    width: 1px;
    background-color: rgb(223, 223, 223);
}

.bar {
      position: absolute;
      height: calc(100% / 4);
      width: 5px;
      top: 0;
      left: -1.2px;
      background-color: rgb(175, 200, 255);
      transition: transform .5s ease-in-out;
}

.card-section{
  height: 100%;
  width: 80%;
  overflow: hidden;
  position: relative;
  /* display: flex;
  flex-flow: column; */
}

.card {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      padding: 10% 0;
      color: white;
      font-size: 30px;
      transition: transform .5s ease-in-out;
      background: rgba(255,255,255,0);
}

.card-title {
      font-size: 80px;
      font-weight: 700;
      padding-bottom: min(20%, 40px);
      color: rgb(70, 112, 180);
}
.card-content {
      font-size: 24px;
      font-weight: 400;
      color: rgb(94, 140, 255);
      margin-bottom: 60px;
    }

.card-img {
      width: 100%;
      height: 400px;
      overflow: hidden;
}
.card-img img {
      width: 100%;
    }
</style>