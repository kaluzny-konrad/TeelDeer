import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/providers/uploadthing/core";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
