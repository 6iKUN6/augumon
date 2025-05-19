<script setup lang="ts">
// 自动重定向到首页
const router = useRouter();
onMounted(() => {
  router.push('/home');
});
</script>
