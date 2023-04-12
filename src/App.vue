<template>
  <div id="app">
    <component :is="toDoComponent" />
  </div>
</template>
<script>
const toDoComponent = () => import('./components/toDoApp');
export default {
  name: 'MyApp',
  components: {
    ToDo: toDoComponent
  },
  data() {
    return {
      toDoComponent: 'ToDo'
    };
  }
};
</script>