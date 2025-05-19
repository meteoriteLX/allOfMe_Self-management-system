<script setup>
import { computed , onMounted , reactive , ref ,toRaw , toRefs } from 'vue'

const state = reactive({
  dataCount:[],
  curYear:null,
  curMonth:null,
  curDate:null
})

onMounted(()=>{
  let date = new Date();
  state.curYear = date.getFullYear()
  state.curMonth = date.getMonth()
  state.curDate = date.getDate()
  getDateCount()
})

//获取总天数
const getDateCount = () =>{
  //day为0时，表示上个月的最后一天。curMonth为9表示10月，+1变为11月，但day设0，回到10月的最后一天。getDate就可以得到实际天数了（最后一天日期)
  let count = new Date(state.curYear,state.curMonth+1,0).getDate();
  //获取1号对应的星期
  let firstWeekDay = new Date(state.curYear,state.curMonth,1).getDay();//curMonth下标从0开始，9代表10月
  for(let i = 1 ; i <= count+firstWeekDay ; i++)
  {
    let val = i-firstWeekDay;
    state.dataCount.push(val)
  }
}

</script>

<template>
  <div class="wrap">
    <div class="head">
      <div class="left"><span class="prevY">《</span><span class="prevM">←</span></div>
      <div class="title">当前日期</div>
      <div class="left"><span class="nextM">→</span><span class="nextY">》</span></div>
    </div>

    <div class="day">
      <ul>
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
    </div>

    <div class="list">
       <!-- 是 Vue 的​​逻辑包裹标签​​，用于包裹多个元素而不生成额外 DOM 节点。 -->
      <template v-for="item in state.dataCount" :key="item">
        <div class="block">
          <div>
            <span>{{ item }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>

</template>

<style scoped>
.wrap {
  width: 500px;
  margin: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.head .left span{
  cursor: pointer;
  padding:5px;
  font-size: 18px;
}
.head .title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.day ul{
  display: flex;
  justify-content: space-between;
  /* 去掉点点 */
  list-style: none;

}
.day ul li{
  flex:1;
  text-align: center;
  padding: 10px 0;
}
.list {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap; 
  justify-content: space-between;
  
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 7 - 5px);
  margin-bottom: 15px;
}

.block span{
  display: inline-block;
}
</style>