"use client";

import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { instance } from "@/Service/Axios/interceptors";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Contentadd = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();
  const editorRef = useRef(null) as any;
  const [description, setDescription] = useState("");
  const heandledescription = (e: any) => {
    setDescription(editorRef.current.getContent());
  };

  const onSubmit = (data: any) => {
    data.slug = data.title.toLowerCase().replace(/ /g, "-");
    data.content = description;
    instance.post("/content", data).then((res) => {
      toast.success("Content Added");
      router.push("/dashboard/content");
    });
  };
  return (
    <div>
      <Breadcrumbs
        list={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Content", link: "/dashboard/content" },
          { name: "Add Content", link: "/dashboard/content/create" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center my-3">
          <h1 className="text-2xl font-bold">Add Content</h1>
          <button className="button flex gap-2 items-center">
            <FontAwesomeIcon icon={faSave} className=" w-3" /> Save
          </button>
        </div>

        <div className=" flex justify-center items-center mt-5">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Content Title</span>
            </label>
            <input
              type="text"
              placeholder="Content Title"
              className="input input-bordered"
              {...register("title", { required: true })}
            />
          </div>
        </div>
        <div className=" flex justify-center items-center mt-5">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Content Type</span>
            </label>
            <select
              className="select select-bordered w-full max-w-md"
              {...register("type", { required: true })}
            >
              <option>Select Content Type</option>
              <option value="blog">Blog</option>
              <option value="faq">Faq</option>
            </select>
          </div>
        </div>
        <div className=" flex justify-center items-center mt-5">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text  text-md">Content Description</span>
            </label>
            <Editor
              onInit={(evt, editor): any | null => (editorRef.current = editor)}
              onChange={heandledescription}
              cloudChannel="5-stable"
              inline={false}
              disabled={false}
              plugins=""
              tagName="div"
              textareaName=""
              init={{
                height: 500,
                language: "en",
                //menubar: false,
                plugins: ["link image", "table paste", "lists"],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                                                          alignleft aligncenter alignright alignjustify | \
                                                          bullist numlist outdent indent | removeformat | help",
              }}
            ></Editor>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contentadd;
