<template>
<v-app>
<v-card>
      <!-- Title -->
      <v-card-title
        class="headline primary justify-center"
        primary-title
        style="color: white;"
      >
        <v-spacer>
          <span class="fa-solid fa-bars"></span> FRAMEWORKS
        </v-spacer>
        <v-btn color="primary" large @click="addTaskForm">
          <span class="fa-solid fa-circle-plus"></span> ADD
        </v-btn>
      </v-card-title>

      
      <!--Body part --> ->
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="column text-center"> Title </th>
                        <th class="column text-center"> Description </th>
                        <th class="column text-center"> Deadline </th>
                        <th class="column text-center"> Priority </th>
                        <th class="column text-center"> Is Complete </th>
                        <th class="column text-center"> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(task,index) in tasks" :key="index">
                            <td class="text-center">{{task.title}}</td>
                            <td class="text-center">{{task.description}}</td>
                            <td class="text-center">{{task.deadline}}</td>
                            <td class="text-center">{{task.priority}}</td>
                            <td>
                                <v-layout justify-center>
                                    <v-checkbox v-model="tasks[index].isComplete"/>
                                </v-layout>
                            </td>
                            <td>
                                <v-layout justify-center v-if="!tasks[index].isComplete">
                  <v-btn
                    class="button mt-2"
                    color="primary"
                    large
                    @click="updateTaskForm(index)"
                  >
                    <span class="fa-solid fa-pen-to-square"></span>UPDATE
                  </v-btn>
                </v-layout>
                <v-layout justify-center>
                  <v-btn
                    class="button mb-2"
                    color="error"
                    large
                    @click="deleteTask(index)"
                  >
                    <span class="fa-solid fa-circle-xmark"></span>DELETE
                  </v-btn>
                </v-layout>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
</v-card>
    <PopUpForm
      v-show="Visible"
      :Added="Added"
      :Visible="Visible"
      :pastDescription="description"
      :pastdate="deadline"
      :tasks="tasks"
      :pastPriority="priority"
      @addTask="addTask"
      @updateTask="updateTask"
      @close="closeForm"
    />
  </v-app>
</template>
<script>
    //The pop taskdialog
        import PopUpForm from './TaskDialog.vue'
        export default {
            name:'ToDo',
            components:{
                PopUpForm,
            },
        data(){
                return{
                    title:'',
                    description:'',
                    deadline:'',
                    priority:'low',
                    Visible:false,
                    Added:true,
                    taskIndex:null,
                    tasks:[],
                }
            },            
            methods: {
                closeForm(){
                    this.Visible=false;
                },
                addTaskForm(){
                    this.Added=true;
                    this.Visible=true;
                },
                addTask(title, description, deadline, priority){
                    this.tasks.push({
                        title:title,
                        description:description,
                        deadline:deadline,
                        priority:priority,
                        isComplete:false,
                    });
                    this.$toasted.success("The task is added");
                },
                testFunc() {
      console.log("");
    },
    updateTask(description, deadline, priority){
                    this.tasks[this.taskIndex].priority = priority;
                    this.tasks[this.taskIndex].deadline = deadline;
                    this.tasks[this.taskIndex].description = description;                   
                    this.$toasted.success("Task has been updated");
                },
    updateTaskForm(index){
                    this.Visible = true;
                    this.Added = false;
                    this.description = this.tasks[index].description;
                    this.deadline = this.tasks[index].deadline;
                    this.priority = this.tasks[index].priority;
                    this.taskIndex = index;
                },

                deleteTask(index){
                    this.tasks.splice(index, 1);
                    this.$toasted.success("Task has been Deleted");
                },
            }, 


        }
    </script>