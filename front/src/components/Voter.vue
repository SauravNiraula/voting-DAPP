<template>
  <div class="voter-main">
    <div v-if="!has_vid" class="vote mt-5">
      <h2 class="text-green-700 text-2xl flex items-center mb-2">
        Add citizenship ID 
      </h2>
      <div class="flex gap-2 mt-2">
        <input v-model="v_id" class="border-2 border-green-700 rounded p-2" placeholder="Citizenship ID" type="text">
      </div>
      <button @click="add_voter_id" class="mt-2 bg-green-700 text-white p-3 rounded">Add</button>
    </div>
    <div class="candidates mt-5">
      <h2 class="text-green-700 text-2xl flex items-center mb-2">
        Registered candidates
        <span class="total-candidates bg-gray-400 text-white text-sm rounded p-1 ml-2">{{all_candidates.length}}</span>
      </h2>
      <table class="table-auto">
        <thead>
          <tr class="text-xl text-green-700">
            <th>S.N.</th>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="each in all_candidates" :key="each.id" class="text-gray-600 text-lg">
            <td>{{each.id}}</td>
            <td>{{each.name}}</td>
            <td>{{each.party}}</td>
            <td>{{each.votes}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!has_voted" class="vote mt-5">
      <h2 class="text-green-700 text-2xl flex items-center mb-2">
        Vote
      </h2>
      <div class="flex gap-2 mt-2">
        <input v-model="vote_num" class="border-2 border-green-700 rounded p-2" placeholder="Candidate's S.N." type="text">
      </div>
      <button @click="vote" class="mt-2 bg-green-700 text-white p-3 rounded">Vote</button>
    </div>
    <div v-else class="text-xl text-green-700 mt-5">Your vote has been submitted</div>
  </div>
</template>

<script setup>
  import { notify } from "@kyvg/vue3-notification";
  import {ref, onMounted} from "vue";
  import {state} from "@/store";

  const all_candidates = ref([]);
  const v_id = ref("");
  const has_voted = ref(false);
  const has_vid = ref(false);
  const vote_num = ref("");

  function vote() {
    if(vote_num.value != "") {
      state.contract.methods.vote(vote_num.value).send({from: state.account})
      .then(res => {
        has_voted.value = true;
        notify("Successfully voted");
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .catch(err => {
        notify(err.message);
      })
    }
    else notify("Enter Candidate S.N.")
  }

  function add_voter_id() {
    if(v_id.value != "") {
      state.contract.methods.initialize_voter(v_id.value).send({from: state.account})
      .then(res => {
        has_vid.value = true;
        notify("Added Citizenship ID");
      })
      .catch(err => {
        notify(err.message);
      })
    }
    else notify("Enter Id")
  }

  function check_if_vid() {
    state.contract.methods.has_vid().call({from: state.account})
    .then(res => {
      has_vid.value = res;
    })
    .catch(err => {
      notify({
        title: 'Error',
        text: err.message
      });
    });
  }

  function check_if_voted() {
    state.contract.methods.has_voted().call({from: state.account})
    .then(res => {
      has_voted.value = res;
    })
    .catch(err => {
      notify({
        title: 'Error',
        text: err.message
      });
    });
  }

  function get_all_candidates() {
    state.contract.methods.candidate_count().call({from: state.account})
    .then(res => {
      for (let i = 0; i < res; i++) {
        state.contract.methods.get_candidate(i).call({from: state.account})
        .then(res => {
          all_candidates.value.push({id: i, name: res[0], party: res[1], votes: res[2]});
        })
        .catch(err => {
          notify({
            title : 'Error!',
            text : err.message
          });
        })
      }
    })
    .catch(err => {
      notify({
        title : 'Error!',
        text : err.message
      });
    })
  }

  onMounted(() => {
    check_if_vid();
    check_if_voted();
    get_all_candidates();
  });
</script>