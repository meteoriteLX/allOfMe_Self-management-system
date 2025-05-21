<script setup>
import { ref, onMounted } from 'vue'

const messages = ref([])
const inputMsg = ref('')
const nickname = ref(localStorage.getItem('nickname') || '')
const ws = ref(null)
const serverIP = '120.27.248.59' //服务器IP地址
const clientId = ref(localStorage.getItem('clientId') || '')
//客户端检查自己localstorage中是否存储了clientId,没存说明是新用户

onMounted(() => {
  if(!clientId.value){
    clientId.value = generateUniqueId()
    localStorage.setItem('clientId',clientId.value)
  }
  connectWebSocket()
})

const generateUniqueId = () => {
  let uniqueId;
  const existingIds = JSON.parse(localStorage.getItem('existingIds') || '[]'); //获取已存在的ID列表
  do {
    uniqueId = Math.floor(1000 + Math.random() * 9000).toString(); //生成4位随机数字串
  } while (existingIds.includes(uniqueId)); //如果已存在，则重新生成

  existingIds.push(uniqueId); //将新生成的ID添加到列表中
  localStorage.setItem('existingIds', JSON.stringify(existingIds)); //更新存储的ID列表

  return uniqueId;
};
const connectWebSocket = () => {
  ws.value = new WebSocket(`ws://${serverIP}:8080`) //触发tcp三次握手，发送http升级头  connection:upgrade

  //发送客户端id和昵称
  ws.value.onopen = () =>{
    ws.value.send(JSON.stringify({type:'init' ,id:clientId.value , nickname:nickname.value}))
  }

  ws.value.onmessage = async (event) => {
  const data = JSON.parse(event.data); //解析JSON数据

  if (data.type === 'message') {
    //确保content是字符串
    const content = typeof data.content === 'string' ? data.content : JSON.stringify(data.content);

    //console.log('原始时间戳:', data.timestamp, '转换后:', new Date(data.timestamp))
    messages.value.push({
      content: `${data.nickname || '匿名'} (ID:${data.id}): ${content}`, //历史消息中的发送者的ID、昵称和消息内容
      time: new Date(data.timestamp).toLocaleTimeString()//把记录的历史消息时间转化为本地格式
    });
  }
};

  ws.value.onerror = (error) => {
    console.error('连接错误:', error)
  }
}

const sendMessage = () => {
  if (inputMsg.value.trim() && ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(JSON.stringify({ type: 'message', content: inputMsg.value })) //发送消息
    inputMsg.value = '' //清空输入框
  }
}
const updateNickname = () => {
  if (nickname.value.trim()) {//移除字符串两端的空格以及其他空白字符,确保输入的昵称不是空字符串
    localStorage.setItem('nickname', nickname.value);
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(JSON.stringify({ type: 'updateNickname', nickname: nickname.value }));
    }
    nickname.value = ''; // 清空昵称输入框
  }
};
</script>

<template>
  <div class="chat-container">
    <div class="nickname-area">
      <input v-model="nickname" placeholder="设置昵称" />
      <button @click="updateNickname">更新昵称</button>
    </div>
    <div class="message-list">
      <div v-for="(msg, index) in messages" :key="index" class="message-item">
        <span class="time">{{ msg.time }}</span>
        <div class="content">{{ msg.content }}</div>
      </div>
    </div>
    <div class="input-area">
      <input v-model="inputMsg" @keyup.enter="sendMessage" />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
}

.message-list {
  height: 400px;
  overflow-y: auto;
  padding: 15px;
}

.message-item {
  margin-bottom: 12px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}

.message-time {
  font-size: 0.8em;
  color: #666;
  margin-bottom: 4px;
}

.input-area {
  display: flex;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
}

button {
  padding: 8px 16px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #9e9e9e;
  cursor: not-allowed;
}

.nickname-area {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}
.nickname-area input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
}
.nickname-area button {
  padding: 8px 16px;
  background:rgb(116, 156, 208);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>