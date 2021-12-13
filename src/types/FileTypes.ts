export type FilePreview = {
  name: string;
  type: string;
  size: number;
  progress: number;
  loading: boolean;
  cancelHandler?: () => void;
  buffer: string | ArrayBuffer | null;
};

export type FileBuffer = string | ArrayBuffer | null;

export type FileResponse = { data: FileResponseData };

export type FileUploadParams = {
  total: number;
  loaded: number;
};

export type FileUploadHandler = (data: FileUploadParams) => void;

export type FileResponseData = {
  name: string;
  type: string;
  width: number;
  height: number;
  size: number;
  format: string;
};

export enum EFileActions {
  UPLOAD = "UPLOAD",
}

export enum EFileGetters {
  GET_FILE = "GET_FILE",
}

export enum EFileCommits {
  SET_FILE = "SET_FILE",
}
