'use client'

import Image from "next/image";
import styles from "./page.module.css";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";


function Form() {
  type FormValues = {
    name: string,
    email: string,
    body: string,
  }

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const {register, handleSubmit, formState: {errors}, setError} = useForm<FormValues>({
    criteriaMode: 'all'
  });

  const onSubmit: SubmitHandler<FormValues> = async data => {
    setSubmitting(true)
    try {
      // @ts-ignore
      const response: Response = await fetch(process.env.NEXT_PUBLIC_FORM_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data)
      })
      const json = await response.json()
      setSent(true);
    } catch (error: any) {
      setError('root.serverError', {
        type: error.statusCode,
      })
      setSent(false)
    }
    setSubmitting(false)
  }
  return <section>
    <h1>
      <a>Title</a>
    </h1>
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id={"contact-form"}>
        {submitting && "Please wait..."}
        <div className={"form-group"}>
          <label htmlFor={"contact-form-input-name"}>Name</label>
          <input {...register("name", {required: "Name is required"})}
                 placeholder={"Name"}
                 aria-invalid={errors.name ? "true" : "false"}
                 id={"contact-form-input-name"}
                 type={"text"}
                 autoComplete={"name"}
          />
          {errors.name && <span role={"alert"}>{errors.name.message}</span>}
        </div>

        <div className={"form-group"}>
          <label htmlFor={"contact-form-input-email"}>Email</label>
          <input {...register("email", {required: "Email Address is required"})}
                 type="email"
                 placeholder={"example@domain.tld"}
                 aria-invalid={errors.email ? "true" : "false"}
                 id={"contact-form-input-email"}
                 autoComplete={"email"}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}
        </div>

        <div className={"form-group"}>
          <label htmlFor={"contact-form-input-body"}>Message</label>
          <textarea {...register("body", {required: false})}
                    placeholder={"Hello! My name is ..."}
                    rows={5}
                    id="contact-form-input-body"
          />
        </div>

        <div className={"form-group"}>
          <input type={"submit"} role={"button"} id={"submit-contact-button"}/>
        </div>

      </form>
    </div>
  </section>
}

export default function Home() {

  return (
      <main>
        <Form/>
      </main>
  );
}
