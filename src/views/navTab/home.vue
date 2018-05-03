<template>
  <div class="homecontainer">
    <el-menu class="side_nav"  :router="true" :key="nav_key">
      <el-menu-item v-for="(item, index) of nav_arr" :key="index" :index="item.path"

      >
      <i :class="['common_img_icon', item.icon]"></i>{{ item.name }}
  </el-menu-item>
</el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nav_arr: [
        {
          name: 'yi',
          path: '',
          active: (path='') => {
            const cur_path = path.split('/')[1]

            return cur_path === 'base'
          }
        },
        {
          'name': 'er',
          'path': ''
        },
        {
          'name': 'san',
          'path': ''
        },
        {
          'name': 'si',
          'path': ''
        }
      ],
      nav_key: 'nav_init_key'
    }
  }
};
</script>
<style lang="less" scoped>

</style>

