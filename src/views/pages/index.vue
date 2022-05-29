<template>
  <div>
    <div class="text-right">
      <span class="text-right">{{ user }}</span>
      <b-button variant="info" class="ml-2" @click="logout"> Logout</b-button>
    </div>

    <b-row>
      <b-col cols="2">
        <span class="mb-3">
          Backlog
          <i
            class="fa fa-plus pointer"
            @click="toggleCreateModal('BACKLOG')"
          ></i>
        </span>
        <draggable
          class="draggable-slot"
          :list="tasks.backlog"
          group="my-group"
          @end="move"
        >
          <div
            class="list-item"
            v-for="task in tasks.backlog"
            :key="task.id"
            @click="toggleUpdateModal(task.id, task.title)"
            style="background: #f4f4f4"
          >
            {{ task.title }}
          </div>
        </draggable>
      </b-col>
      <b-col cols="2">
        <span class="mb-3">
          To do
          <i class="fa fa-plus pointer" @click="toggleCreateModal('TODO')"></i>
        </span>
        <draggable
          class="draggable-slot"
          :list="tasks.todo"
          group="my-group"
          @end="move"
        >
          <div
            class="list-item"
            v-for="task in tasks.todo"
            :key="task.title"
            @click="toggleUpdateModal(task.id, task.title)"
            style="background: #dd7e6b"
          >
            {{ task.title }}
          </div>
        </draggable>
      </b-col>
      <b-col cols="2">
        <span class="mb-3">
          In progress
          <i class="fa fa-plus pointer" @click="toggleCreateModal('DOING')"></i>
        </span>
        <draggable
          class="draggable-slot"
          :list="tasks.doing"
          group="my-group"
          @end="move"
        >
          <div
            class="list-item"
            v-for="task in tasks.doing"
            :key="task.title"
            @click="toggleUpdateModal(task.id, task.title)"
            style="background: #ffd966"
          >
            {{ task.title }}
          </div>
        </draggable>
      </b-col>
      <b-col cols="2">
        <span class="mb-3">
          Ready to test
          <i
            class="fa fa-plus pointer"
            @click="toggleCreateModal('READYTOTEST')"
          ></i>
        </span>
        <draggable
          class="draggable-slot"
          :list="tasks.readyToTest"
          group="my-group"
          @end="move"
        >
          <div
            class="list-item"
            v-for="task in tasks.readyToTest"
            :key="task.title"
            @click="toggleUpdateModal(task.id, task.title)"
            style="background: #6d9eeb"
          >
            {{ task.title }}
          </div>
        </draggable>
      </b-col>
      <b-col cols="2">
        <span class="mb-3">
          Testing
          <i
            class="fa fa-plus pointer"
            @click="toggleCreateModal('TESTING')"
          ></i>
        </span>
        <draggable
          class="draggable-slot"
          :list="tasks.testing"
          group="my-group"
          @end="move"
        >
          <div
            class="list-item"
            v-for="task in tasks.testing"
            :key="task.title"
            @click="toggleUpdateModal(task.id, task.title)"
            style="background: #f6b26b"
          >
            {{ task.title }}
          </div>
        </draggable>
      </b-col>
      <b-col cols="2">
        <span class="mb-3">
          Done
          <i class="fa fa-plus pointer" @click="toggleCreateModal('DONE')"></i>
        </span>
        <draggable
          class="draggable-slot"
          :list="tasks.done"
          group="my-group"
          @end="move"
        >
          <div
            class="list-item"
            v-for="task in tasks.done"
            :key="task.title"
            @click="toggleUpdateModal(task.id, task.title)"
            style="background: #93c47d"
          >
            {{ task.title }}
          </div>
        </draggable>
      </b-col>
    </b-row>
    <div>
      <b-modal
        id="create"
        :title="`Create new ${newStatus}`"
        size="lg"
        hide-footer
      >
        <b-input v-model="newTitle"></b-input>
        <b-button
          class="mt-2"
          variant="success"
          @click="create"
          :disabled="!newTitle"
          >Create</b-button
        >
      </b-modal>
    </div>

    <div>
      <b-modal id="update" :title="`Edit Task`" size="lg" hide-footer>
        <b-input v-model="updateTitle"></b-input>
        <b-button
          class="mt-2"
          variant="warning"
          @click="update"
          :disabled="!updateTitle"
          >Update</b-button
        >
        <b-button class="mt-2 ml-2" variant="danger" @click="remove"
          >Remove</b-button
        >
      </b-modal>
    </div>
  </div>
</template>
<script>
import api from "@/services/api.js";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      tasks: {},
      newStatus: "",
      newTitle: "",
      updateTitle: "",
      updateId: null,
      user: localStorage.getItem("user"),
    };
  },
  methods: {
    async fetch() {
      let res = await api.get(`tasks`);
      this.tasks = res.data;
    },
    async move() {
      const payload = {
        tasks: this.tasks,
      };
      await api.post(`tasks/move`, payload);
      await this.fetch();
    },
    async create() {
      const payload = {
        title: this.newTitle,
        status: this.newStatus,
      };
      await api.post(`tasks`, payload);
      this.$bvModal.hide("create");
      await this.fetch();
    },

    async update() {
      const payload = {
        id: this.updateId,
        title: this.updateTitle,
      };
      await api.patch(`tasks`, payload);
      this.$bvModal.hide("update");
      await this.fetch();
    },

    async remove() {
      const payload = {
        id: this.updateId,
      };
      await api.delete(`tasks`, payload);
      this.$bvModal.hide("update");
      await this.fetch();
    },

    async logout() {
      this.$router.push({ name: "logout" });
    },

    toggleCreateModal(status) {
      this.newStatus = status;
      this.newTitle = "";
      this.$bvModal.show("create");
    },

    toggleUpdateModal(id, title) {
      (this.updateId = id), (this.updateTitle = title);
      this.$bvModal.show("update");
    },
  },
  async mounted() {
    if (!this.user) {
      this.$router.push({ name: "login" });
    } else {
      await this.fetch();
    }
  },
};
</script>
