"use client";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";

import type EditorJS from "@editorjs/editorjs";

import {
  EditorCreationRequest,
  EditorValidator,
} from "@/lib/validators/editor";
import { uploadFiles } from "@/lib/uploadthing";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function Editor({ id }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditorCreationRequest>({
    resolver: zodResolver(EditorValidator),
    defaultValues: {
      id,
      title: "",
      content: null,
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const pathName = usePathname();
  const router = useRouter();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlinceCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/providers/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const files = [file];
                  const [res] = await uploadFiles({
                    files,
                    endpoint: "imageUploader",
                  });
                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlinceCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [key, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: submitData } = useMutation({
    mutationFn: async ({ title, content, id }: EditorCreationRequest) => {
      const payload: EditorCreationRequest = {
        title,
        content,
        id,
      };
      const { data } = await axios.post("/providers/editor/submit", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Something went wrong while submitting your post",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      const newPathName = pathName.split("/").slice(0, -1).join("/");
      router.push(newPathName);
      router.refresh();

      return toast({
        description: "Your post has been added",
      });
    },
  });

  async function onSubmit(data: EditorCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: EditorCreationRequest = {
      title: data.title,
      content: blocks,
      id: id,
    };

    submitData(payload);
  }

  if (!isMounted) return null;

  const { ref: titleRef, ...titleProps } = register("title");

  return (
    <div>
      <form id="subreddit-post-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...titleProps}
            placeholder="Title"
          />

          <div id="editor" className="min-h-[300px]" />
        </div>
      </form>
    </div>
  );
}
