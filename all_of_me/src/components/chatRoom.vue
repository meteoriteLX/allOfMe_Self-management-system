<script setup>
import { ref, onMounted } from 'vue'

const messages = ref([])
const inputMsg = ref('')
const ws = ref(null)
const serverIP = '120.27.248.59' //服务器IP地址

onMounted(() => {
  connectWebSocket()
})

const connectWebSocket = () => {
  ws.value = new WebSocket(`ws://${serverIP}:8080`) //触发tcp三次握手，发送http升级头  connection:upgrade

  ws.value.onmessage = async (event) => {
  const data = JSON.parse(event.data); // 解析 JSON 数据

  if (data.type === 'id') {
    console.log(`Your client ID: ${data.id}`); //打印分配的客户端 ID
  } else if (data.type === 'message') {
    //确保content是字符串
    const content = typeof data.content === 'string' ? data.content : JSON.stringify(data.content);

    messages.value.push({
      content: `${data.id}: ${content}`, //历史消息中的发送者的ID和消息内容
      time: new Date(data.timestamp).toLocaleTimeString(),//把记录的历史消息时间转化为本地格式
    });
  }
};

  ws.value.onerror = (error) => {
    console.error('连接错误:', error)
  }
}

const sendMessage = () => {
  if (inputMsg.value.trim() && ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(inputMsg.value) //发送消息
    inputMsg.value = '' //清空输入框
  }
}
</script>

<template>
  <div class="chat-container">
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
</style>