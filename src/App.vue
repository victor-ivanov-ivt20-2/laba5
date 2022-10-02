<script setup>
import Game from './components/Game.vue';
import {ref, watch} from 'vue'
import {useStore} from 'vuex'
const store = useStore();
const getImageUrl = (name) => {
  return new URL(`./assets/${name}`, import.meta.url).href;
};
const style = ref({
  color: '#ff00ff'
});
const start = ref(false);
const easy = ref(new Audio(getImageUrl('backg.mp3')))
const normal = ref(new Audio(getImageUrl('hard.mp3')))
const hard = ref(new Audio(getImageUrl('normal.mp3')))
const victory = ref(new Audio(getImageUrl('victory.mp3')))
const gameover = ref(new Audio(getImageUrl('gameover.mp3')))
const winlose = ref(0)
const music = ref(0);
watch(winlose, (winlose, prevWinlose) => {
  if (winlose === 1) {
    victory.value.volume = 0.02;
    victory.value.play();
  }
  else if (winlose === 2) {
    gameover.value.volume = 0.02;
    gameover.value.play();
  }
})

function chooseAudio(audio, i) {
  music.value = audio;
  store.commit('selectLevel', i)
}
function playAudio(audio) {
  if (store.state.level === 0) return;
  audio.loop = true;
  audio.volume = 0.02;
  audio.play();
}
const lose = ref(false);
const minute = ref(0);
const second = ref(0);
const mod = ref(0);
function startTime() {
  if (store.state.level === 0) {
    alert("выберите сложность")
    return;
  }
  start.value = true; lose.value = false; 
  let timez = 120
  if (store.state.level === 1) {
    timez = 220 - 2;
    minute.value = Math.trunc(timez/60%60);
    second.value = timez%60;
    mod.value = 5;
  }
  if (store.state.level === 3) {
    timez = 232 - 2;
    minute.value = Math.trunc(timez/60%60);
    second.value = timez%60;
    mod.value = 13;
  }
  if (store.state.level === 2) {
    timez = 156 - 2;
    minute.value = Math.trunc(timez/60%60);
    second.value = timez%60;
    mod.value = 8;
  }
  const timer = setInterval(function () {
    timez--;
    let seconds = timez%60
    let minutes = timez/60%60
    if (mod.value === store.state.wins) {
      clearInterval(timer);
      lose.value = true;
        start.value = false;
        music.value.pause();
        music.value.currentTime = 0;
        winlose.value = 1;
        setTimeout(() => {winlose.value = 0}, 10000)
    }
    if (timez <= 0) {
        clearInterval(timer);
        lose.value = true;
        start.value = false;
        music.value.pause();
        music.value.currentTime = 0;
        winlose.value = 2;
        setTimeout(() => {winlose.value = 0}, 2000)
    } else {
        minute.value = Math.trunc(minutes);
        second.value = seconds;
    }
    
}, 1000)
} 



</script>

<template>
  <div>
    <h1 class="start" v-if="!start && winlose === 0" @click.prevent="playAudio(music); startTime()">START</h1>
    <Game v-else-if="!lose" class="game"></Game>
    <div v-show="start"><h1>{{minute}} : {{second}}</h1><div>YOUR GOAL: {{ mod - store.state.wins }} wins</div></div>
    <div  v-if="winlose === 0 && !start" class="difficulty" style="margin-top: 30px;">
      <button @click.prevent="chooseAudio(easy, 1)" :class="store.state.level === 1 ? 'active' : ''">easy</button>
      <button @click.prevent="chooseAudio(normal, 2)" :class="store.state.level === 2 ? 'active' : ''">normal</button>
      <button @click.prevent="chooseAudio(hard, 3)" :class="store.state.level === 3 ? 'active' : ''">hard</button>
    </div>
    <div v-else-if="winlose === 1">
      <h1 class="game" style="font-size: 96px">
        WIN
      </h1>
    </div>
    <div v-else-if="winlose === 2">
      <h1 class="game" style="font-size: 96px">
        LOSE
      </h1>
    </div>
  </div>
</template>

<style>
  button {
    border: none; outline: none;
    font-size: 32px;
  }
.game {
  position: absolute;
  top: 50%; left: 50%;
  margin-right: 50%;
  transform: translate(-50%, -50%);
}
.start, .difficulty {
  font-size: 40px;
  font-weight: 700;
  cursor:pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
.active {
  background-color: #aeffa7;
  color: #000;
}
</style>
