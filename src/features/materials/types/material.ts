// material.ts
export type MaterialFile = {
  url: string;
  file?: File;
  name?: string;
  size?: number;
};

export type CreateMaterialPayload = {
    title: string
    description: string;
    files: MaterialFile[]
}

export type CreateMaterialResult = {
  post_id: string;
  material_id: string;
};
