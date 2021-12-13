import axios from "axios";
import api from "@/services/axios";
import { FileResponse, FileUploadHandler } from "@/types/FileTypes";

export const fileService = {
  upload: (
    file: File,
    handler: FileUploadHandler,
    cancel: (cancel: any) => void
  ): Promise<FileResponse> => {
    const CancelToken = axios.CancelToken;
    const formData = new FormData();

    formData.append("image", file);
    return api.post<File, FileResponse>("/file/upload", formData, {
      onUploadProgress: handler,
      cancelToken: new CancelToken(cancel),
    });
  },
};
