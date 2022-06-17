<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminHome from './admin'
import EditorHome from './editor'

export default {
  name: 'Home',
  components: { AdminHome, EditorHome },
  data() {
    return {
      currentRole: 'AdminHome'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'EditorHome'
    }
  }
}
</script>
