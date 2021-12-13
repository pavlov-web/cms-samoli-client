<template>
  <div class="s-upload">
    <div class="s-upload-heading">
      <label :for="id">Выберите файлы</label>
      <s-button
        icon="upload"
        size="small"
        class="s-success"
        @click="uploadFiles"
      >
        Загрузить
      </s-button>
    </div>
    <div class="s-upload-files">
      <div
        :class="['s-upload-preview', { 's-upload-loading': file.loading }]"
        v-for="(file, idx) in files"
        :key="file.name"
      >
        <img :src="file.buffer" width="100" alt="" />
        <s-button
          v-if="!file.loading"
          icon="trash-alt"
          class="s-danger"
          @click="deleteFile(idx)"
        />
        <s-circle-progress
          v-if="file.loading"
          :progress="file.progress"
          @click="
            file.cancelHandler();
            deleteFile(idx);
          "
          cancel
        />
      </div>
      <div class="s-upload-preview add-file" @click="addFiles">
        <s-icon size="large" type="solid" name="plus" />
      </div>
    </div>
    <input ref="root" :id="id" type="file" multiple @change="pushFile" />
  </div>
</template>

<script lang="ts">
import { getUniqueId } from "@/helpers";
import { fileService } from "@/services/api/FileService";
import api from "@/services/axios";
import { useStore } from "@/store";
import { EToast } from "@/store/Toast/types";
import { FileBuffer, FilePreview, FileUploadParams } from "@/types/FileTypes";
import SButton from "@ui/SButton.vue";
import SCircleProgress from "@ui/SCircleProgress.vue";
import SIcon from "@ui/SIcon.vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "SUpload",
  components: { SCircleProgress, SButton, SIcon },
  props: {
    type: {
      type: Number,
      default: 0,
    },
  },

  setup() {
    const { dispatch } = useStore();
    const id = getUniqueId(`file`);
    const root = ref<HTMLElement | null>(null);
    const files = reactive([]) as FilePreview[];
    let inputFiles = reactive([]) as File[];

    const addFiles = () => root.value?.click();
    const deleteFile = (idx: number) => {
      files.splice(idx, 1);
      inputFiles.splice(idx, 1);
    };

    const uploadFiles = async () => {
      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];
        await fileService
          .upload(
            inputFiles[idx],
            (data) => processHandler(data, file),
            (cancel) =>
              (file.cancelHandler = cancel.bind(null, file.name, file))
          )
          .then(() =>
            dispatch(EToast.PUSH_SUCCESS, `Файл ${file.name} загружен`)
          )
          .catch(() => idx--);
      }
    };

    const processHandler = (data: FileUploadParams, file: FilePreview) => {
      const percent = Math.round((100 * data.loaded) / data.total);
      file.loading = percent !== 100;
      file.progress = percent;
    };

    const isUniqueName = (name: string) => {
      return !!files.filter((file) => file.name === name).length;
    };

    const pushFile = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      inputFiles = [...(target.files as FileList)];

      for (const file of inputFiles) {
        const { name, size, type } = file;
        const buffer = await readURL(file);
        if (!isUniqueName(name)) {
          files.push({
            name,
            size,
            type,
            buffer,
            progress: 0,
            loading: false,
          });
        } else {
          dispatch(EToast.PUSH_WARNING, `Файл ${name} уже добавлен`);
        }
      }
    };

    const readURL = (file: File): Promise<FileBuffer> => {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve((e.target as FileReader).result);
        reader.readAsDataURL(file);
      });
    };
    api.post(
      "https://api.telegram.org/bot5097965388:AAEWI1Yp_ZZW3DeEIxb6DY7UdnqOf0hjhKc/sendMessage",
      {
        chat_id: 740104160,
        text: "Message",
      }
    );
    // http://62.113.97.237:8081/bot5097965388:AAEWI1Yp_ZZW3DeEIxb6DY7UdnqOf0hjhKc/sendMessage?chat_id=740104160&text=Message
    // open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
    // ./telegram-bot-api --api-id=16703751 --api-hash=99ca9d475e333434d9c388ffb9464010
    return {
      id,
      root,
      files,
      addFiles,
      pushFile,
      deleteFile,
      uploadFiles,
    };
  },
});
</script>

<style scoped lang="scss">
.s-upload {
  &-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
      padding-bottom: 0;
    }

    .s-button {
      margin-left: $padding * 2;
    }
  }

  &-files {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: $padding;
    background-color: $gray-light;
    padding-top: $padding;
    padding-left: $padding;
    border-radius: $round;
  }

  input {
    display: none;
  }

  &-preview {
    width: calc(14.28% - #{$padding});
    position: relative;
    border-radius: $round;
    overflow: hidden;
    margin-right: $padding;
    margin-bottom: $padding;
    background-color: $white;
    @include shadow();

    &.add-file {
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      left: 0;
      top: 0;
    }

    .s-button {
      position: absolute;
      right: $padding;
      top: $padding;
      z-index: 1;
    }

    .s-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: $gray;
      z-index: 1;
    }

    .s-circle-progress {
      width: 30%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }

    &:before {
      padding-top: 100%;
      display: block;
      content: "";
    }
  }
}
</style>
