<template>
    <table id="game">
      <tr v-for="i in i_size" :key="i">
        <td v-for="j in j_size" :key="j">
          <img
            v-if="cards[randomArray[4 * i - (4 - j) - 1]].opened === true"
            src="../assets/opened.png"
            draggable="false"
            alt=""
          />
          <img
            v-else-if="
              4 * i - (4 - j) != choosen[0] && 4 * i - (4 - j) != choosen[1]
            "
            src="../assets/back.png"
            @click.prevent="Click(4 * i - (4 - j))"
            style="cursor: pointer"
            draggable="false"
            alt=""
          />
          <img
            v-else-if="4 * i - (4 - j) === choosen[0]"
            :src="getImageUrl(cards[randomArray[4 * i - (4 - j) - 1]].img)"
            draggable="false"
            alt=""
          />
          <img
            v-else-if="4 * i - (4 - j) === choosen[1]"
            :src="getImageUrl(cards[randomArray[4 * i - (4 - j) - 1]].img)"
            @click.prevent="Click(4 * i - (4 - j))"
            style="cursor: pointer"
            draggable="false"
            alt=""
          />
        </td>
      </tr>
    </table>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from 'vuex'
const store = useStore();
const choosen = ref([-1, -1]);
const i_size = ref(4);
const j_size = ref(4);
const counter = ref(0);
const wins = ref(0);
const randomArray = ref([]);
store.state.wins = 0;
let check = false;
function Click(i) {
  const clickAudio = new Audio(
    new URL("../assets/click.mp3", import.meta.url).href
  );
  clickAudio.volume = 0.2;
  clickAudio.play();
  if (check) return;
  if (choosen.value[0] != -1) {
    choosen.value[1] = i;
    check = true;
    let w = wins.value;
    setTimeout(() => {
      if (
        randomArray.value[choosen.value[0] - 1] ===
        randomArray.value[choosen.value[1] - 1]
      ) {
        const correctAudio = new Audio(
          new URL("../assets/correct.mp3", import.meta.url).href
        );
        correctAudio.volume = 0.2;
        correctAudio.play();
        cards.value[randomArray.value[choosen.value[0] - 1]].opened = true;
        counter.value++;
        if (counter.value == cards.value.length) {
          counter.value = 0;
          for (let i = 0; i < cards.value.length; i++) {
            cards.value[i].opened = false;
          }
          store.commit('addWins'); random();
        }
      } else {
        const wrongAudio = new Audio(
          new URL("../assets/wrong.mp3", import.meta.url).href
        );
        wrongAudio.volume = 0.2;
        wrongAudio.play();
      }
      choosen.value[0] = -1;
      choosen.value[1] = -1;
    }, 300);
    setTimeout(() => {
      check = false;
    }, 300);
    if (wins.value != w) {
      random();
    }
  } else {
    choosen.value[0] = i;
  }
}
const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};


const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const ReturnTr = (tr) => {
  let t = 0;
  for (let i = 0; i < randomArray.value.length; i++) {
    if (tr == randomArray.value[i]) t++;
  }
  return t;
};
function random() {
  randomArray.value = [];
    for (let i = 0; i < 16; i++) {
        let tr = getRandomInt(0, 7);

        if (ReturnTr(tr) < 2) 
        randomArray.value[i] = tr;
        else i--;
    } console.log("1");
}
random();
const cards = ref([
  { img: "card-1.png", opened: false },
  { img: "card-2.png", opened: false },
  { img: "card-3.png", opened: false },
  { img: "card-4.png", opened: false },
  { img: "card-5.png", opened: false },
  { img: "card-6.png", opened: false },
  { img: "card-7.png", opened: false },
  { img: "card-8.png", opened: false },
]);
</script>

<style></style>
