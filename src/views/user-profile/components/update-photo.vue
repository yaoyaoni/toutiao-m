<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/user";

export default {
  name: "UpdatePhoto",
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: "move", // 画布可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
    });
  },
  methods: {
    onConfirm() {
      // 基于服务端的我切使用 getData方法获取裁切参数
      //   console.log(this.cropper.getData());

      //   纯客户端的裁切使用getCroppedCanvas获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserPhoto(blob);
      });
    },
    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        //   如果接口要求 Content-Type是application/json
        // 则传递普通JavaScript对象
        //   错误的用法
        // updateUserPhoto({
        //     photo: blod
        // })

        // 如果接口要求 Content-Type是 multipart/form-data
        // 则你必须传递FormData对象
        const formData = new FormData();
        formData.append("photo", blob);

        const { data } = await updateUserPhoto(formData);
        // 关闭弹出层
        this.$emit("close");
        // 更新视图
        this.$emit("update-photo", data.data.photo);
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
          this.$toast.fail('更新失败')
      }
    },
  },
};
</script>

<style lang='less' scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>