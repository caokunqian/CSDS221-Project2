<template>
  <div>
    <div class="main-background">
        <div class="sub-background">
            <v-card>
                <v-card-title class='headline primary'
                    primary-title style='color: white'>
                    <div v-if="Added" key="add">
                        <span class="fa-solid fa-circle-plus"/> Add Task
                    </div>
                    <div v-else key="update">
                        <span class="fa-solid fa-pen-to-square"/> Update Task
                    </div>
                </v-card-title>
                <v-form ref="form" lazy-validation>
                    <v-layout v-if="Added" justify-center class="elements mx-5 mb-0 mt-7">
                        <v-text-field label="Title" outlined v-model="title" 
                            :rules="titleRules" required />
                    </v-layout>
                    <v-layout justify-center class="elements mx-5 my-2">
                        <v-text-field label="Description" outlined v-model="description"
                            :rules="[v => !!v || 'The description is needed']" required />
                    </v-layout>
                    <v-layout justify-center class="elements mx-5 my-0">
                    <v-menu
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="computedDateFormatted"
                        label="Deadline"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        no-title
                        @input="menu2 = false"
                    ></v-date-picker>
                    </v-menu>
                    </v-layout>
                    <v-radio-group label="Priority" class="elements mx-5 my-0" v-model="priority">
                        <v-layout align-start row d-flex justify-space-between>
                            <v-radio label="Low" value="low"/>
                            <v-radio label="Med" value="med"/>
                            <v-radio label="High" value="high"/>
                        </v-layout>
                    </v-radio-group>
                    <v-layout justify-end class="elements mx-2 mt-0 mb-2">
                        <div v-if="Added" key="add1">
                            <v-btn color="primary" elevation="2" @click="addTask" class="mr-2">
                                <i class="fa-solid fa-circle-plus"></i> ADD
                            </v-btn>
                        </div>
                        <div v-else key="update1">
                            <v-btn color="primary" elevation="2" @click="updateTask" class="mr-2">
                                <i class="fa-solid fa-pen-to-square"></i> EDIT
                            </v-btn>
                        </div>
                        <v-btn color="error" elevation="2" @click="close">
                            <i class="fa-solid fa-ban"></i> CANCEL
                        </v-btn>
                    </v-layout>
                </v-form>
            </v-card>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskDialog",
  props: {
    Visible: Boolean,
    Added: Boolean,
    previousDescription: String,
    pastdate: String,
    pastPriority: String,
    tasks: Array
  },
  data() {
    return {
      title: "",
      description: "",
      priority: "low",
      date: "",
      titleRules: [
        v => !!v || "The title is needed",
        v => this.checkValidTitle(v) || "The name you enter is already exist"
      ]
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    Visible(newVal) {
      this.$refs.form.resetValidation();
      if (newVal && !this.Added) {
        this.getParentData();
      }
    },
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    closeDialog() {
      this.resetForm();
      this.$emit("close");
    },

    loadPreviousData() {
      this.description = this.previousDescription;
      this.date = this.parseDate(this.previousDate);
      this.priority = this.previousPriority;
    },
    resetForm() {
      this.title = "";
      this.description = "";
      this.date = "";
      this.priority = "low";
      this.$refs.form.resetValidation();
    },
    updateTask() {
      if (this.$refs.form.validate()) {
        this.$emit(
          "updateTask",
          this.description,
          this.formatDate(this.date),
          this.priority
        );
        this.closeDialog();
      }
    },
    getParentData() {
      this.description = this.previousDescription;
      this.date = this.parseDate(this.pastdate);
      this.priority = this.pastPriority;
      console.log(this.description, this.pastdate, this.pastPriority);
    },
    addTask() {
      if (this.$refs.form.validate()) {
        this.$emit(
          "addTask",
          this.title,
          this.description,
          this.formatDate(this.date),
          this.priority
        );
        this.closeDialog();
      }
    },

    checkValidTitle(title) {
      return this.tasks.every(task => task.title !== title);
    }
  }
};
</script>
<style>
.main-background {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  display: flex;

}
.sub-background {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  background-color: #FFFFFF;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>