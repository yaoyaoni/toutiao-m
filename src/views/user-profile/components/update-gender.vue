<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @change="onChange"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";

export default {
  name: "UpdateGender",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onChange(picker, value, index) {
      this.localGender = index;
    },
    async onConfirm() {
      this.$toast.loading({
        message: "保存中....",
        forbidClick: true, // 禁止背景点击
        duration: 0, //持续展示
      });
      try {
        const localGender = this.localGender;
        await updateUserProfile({
          gender: localGender,
        });
        // 更新视图
        this.$emit("input", localGender);
        // 关闭弹层
        this.$emit("close");
        // 提示成功
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
    
  },
};
</script>

<style lang='less' scoped>
</style>