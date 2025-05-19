<script setup>
import { ref, onMounted } from 'vue'

const messages = ref([])
const inputMsg = ref('')
const tcpSocket = ref(null)
const serverIP = '120.27.248.59'

// 使用 TCP 长连接
const connectTCP = async () => {
  try {
    // 浏览器环境需要 WebSocket 包装 TCP（方案二的变通实现）
    tcpSocket.value = new WebSocket(`ws://${serverIP}:8080`)
    
    tcpSocket.value.onmessage = (event) => {
      messages.value.push({
        content: event.data,
        time: new Date().toLocaleTimeString()
      })
    }

    tcpSocket.value.onerror = (error) => {
      console.error('连接错误:', error)
    }
  } catch (e) {
    console.error('TCP 连接失败:', e)
  }
}

const sendMessage = () => {
  if (inputMsg.value.trim() && tcpSocket.value.readyState === WebSocket.OPEN) {
    // 添加消息头标识
    const formattedMsg = `MSG:${inputMsg.value}`
    tcpSocket.value.send(formattedMsg)
    inputMsg.value = ''
  }
}

onMounted(() => {
  connectTCP()
})
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