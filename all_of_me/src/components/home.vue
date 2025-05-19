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
          <button class="drawer-btn" @click="slideTo(4)">ChatRoom<span class="drawer-head">聊天</span></button>
        </div>
      </div>
    </div>
    

    <div class="slide-section">
      <div class="slide-bar">
        <div class="bar"></div>
      </div>
      <div class="card-section">
        <div class="card">
          <div class="card-title"><div style="font-size: 30px;">All Of Me</div> 个人管理</div>
          <div class="card-content">在这里记录关于“我”的一切。<br> 这里是生活的控制台，梦想的导航仪。<br> 每日清晨，让AllOfMe成为你的能量舱——<br> 看一看全局规划，点一盏专注明灯，在效率与从容间找到完美平衡。<br>
          <br><span style="font-size: 18px;">This is the control panel of life, the navigator of dreams.Each morning, <br> let the homepage be your energy capsule — scanning the grand plan, lighting the lamp of focus, and finding perfect balance between efficiency and serenity.</span></div>
          <!-- <div class="card-img">
            <img src="" alt="">
          </div> -->
          <div class="btn-box">
            <!-- <button class="main-btn">前往</button> -->
            
            
          </div>
        </div>
        <div class="card">
          <div class="card-title"><div style="font-size: 30px;">TodoList</div>待办清单</div>
          <div class="card-content">每一段旅程都始于清晰的足迹，每一个目标都成于有序的规划。<br> 无论是琐碎日常还是宏伟项目，你的待办清单都将化身时光的舵手，助你在纷繁世界中锚定方向，让「未完成」蜕变为「已成就」。<br>
            <span style="font-size: 18px;">Every journey begins with clear footprints, and every goal thrives on structured plans. From daily chores to grand projects, your to-do list becomes the helmsman of time, anchoring your focus in a chaotic world and transforming "pending" into "accomplished."</span> 
          </div>
          <!-- <div class="card-img">
            <img src="" alt="">
          </div> -->
          <div class="btn-box">
            <!-- <button class="main-btn">前往</button> -->
            <router-link to="/todos" class="main-btn">前往待办清单</router-link>
          </div>
        </div>

        <div class="card">
          <div class="card-title"><div style="font-size: 30px;">Calendar</div>日历</div>
          <div class="card-content">时间是最公正的叙事者，而日历是你私人的编年史官。<br> 当晨曦染红日历的边角，你看到的不仅是日期，<br>
           更是无数个「可能」在晨光中舒展羽翼。 <br>
          <span style="font-size: 18px;">Time is the fairest storyteller, and the calendar your personal chronicler. As dawn tints the calendar's edges, you behold not just dates but countless "possibilities" stretching their wings in the morning light.

</span></div>
          <!-- <div class="card-img">
            <img src="" alt="">
          </div> -->
          <div class="btn-box">
            <!-- <button class="main-btn">前往</button> -->
            <router-link to="/calendar" class="main-btn">前往日历视图</router-link>
          </div>
        </div>

        <!-- <div class="card">
          <div class="card-title"><div style="font-size: 30px;">Diary</div>日记</div>
          <div class="card-content">文字是心灵的显影剂，日记是时光的保险箱。<br> 请在这里记录你的生活，你的故事。每一笔记录都是对自我的温柔叩问，每一页空白都静待着用真诚墨水书写的故事——因为最动人的成长，往往藏匿于那些未被说出口的独白。<br>
            <span style="font-size: 18px;">Words are the developer of the soul, and the diary a time capsule. Every entry is a gentle inquiry to the self, every blank page awaits stories penned with sincere ink — for the most poignant growth often hides in unspoken soliloquies.</span>
          </div>
           <div class="card-img">
            <img src="" alt="">
          </div> 
          <div class="btn-box">
             <button class="main-btn">前往</button> 
          </div>
        </div> -->

        <div class="card">
          <div class="card-title"><div style="font-size: 30px;">ChatRoom</div>聊天室</div>
          <div class="card-content">每一段旅程都始于清晰的足迹，每一个目标都成于有序的规划。<br> 无论是琐碎日常还是宏伟项目，你的待办清单都将化身时光的舵手，助你在纷繁世界中锚定方向，让「未完成」蜕变为「已成就」。<br>
            <span style="font-size: 18px;">Every journey begins with clear footprints, and every goal thrives on structured plans. From daily chores to grand projects, your to-do list becomes the helmsman of time, anchoring your focus in a chaotic world and transforming "pending" into "accomplished."</span> 
          </div>
          <!-- <div class="card-img">
            <img src="" alt="">
          </div> -->
          <div class="btn-box">
            <!-- <button class="main-btn">前往</button> -->
            <router-link to="/chatroom" class="main-btn">前往聊天室</router-link>
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
/* .drawer-boxes::before{
  content: "";
      width: 8px;
      height: 94%;
      position: absolute;
      left: -20px;
      top: 3%;
      z-index: 120;
} */
.drawer-box{
  height: calc(100% /5.5);
  width: 70%;
  flex: 0 1 auto; 
  position: relative;
  z-index: 100;
  transform: translateX(-72%);
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
      color: rgb(86, 117, 204);
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
      font-size: 50px;
      font-weight: 700;
      padding-bottom: min(20%, 40px);
      color: rgb(88, 116, 206);
}
.card-content {
      font-size: 20px;
      font-weight: 400;
      color: rgb(118, 149, 227);
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
.btn-box {
  margin: auto;
}
</style>