import { ApplyJobBody, applyJob } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEventHandler, useCallback, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input/react-hook-form-input";
import { toast } from "react-toastify";
import * as yup from "yup";

export const CareerForm = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "career.job-apply" });

  const schema = useMemo(
    () =>
      yup
        .object({
          name: yup
            .string()
            .trim()
            .min(1, t("name.error"))
            .required(t("name.error")),
          email: yup
            .string()
            .email(t("email.error.email"))
            .required(t("email.error.required")),
          phone: yup.string().trim().required(t("phone.error")),
          message: yup.string().max(2500, t("message.error")).default(""),
          resume: yup.mixed().required(t("resume.error")),
        })
        .required() as yup.ObjectSchema<ApplyJobBody>,
    []
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const fileInpRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const files = e.target.files;

      if (files && files[0]) {
        setValue("resume", files[0]);
      }
    },
    []
  );

  const onSubmit = useCallback<SubmitHandler<ApplyJobBody>>(async (data) => {
    try {
      await applyJob(data);
      reset();
      toast.success("arbetsansökan har skickats in");
    } catch (error) {}
  }, []);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{t("title")}</h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            {t("name.title")}
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border rounded-lg"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            {t("email.title")}
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-3 border rounded-lg"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 font-medium">
            {t("phone.title")}
          </label>
          <PhoneInput
            international
            withCountryCallingCode
            country="SE"
            name="phone"
            control={control}
            className="w-full border border-white border-b-gray-300 p-2"
          />
          <p>{errors.phone?.message}</p>
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-medium">
            {t("message.title")}
          </label>
          <textarea
            id="message"
            className="w-full p-3 border rounded-lg"
            {...register("message")}
          />
          <p>{errors.message?.message}</p>
        </div>
        <div>
          <label htmlFor="resume" className="block mb-2 font-medium">
            {t("resume.title")}
          </label>
          <input
            type="file"
            className="w-full p-3 border rounded-lg"
            multiple={false}
            ref={fileInpRef}
            onChange={handleFileChange}
            accept="image/*, application/pdf"
          />
          <p>{errors.resume?.message}</p>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg"
        >
          {t("submit")}
        </button>
      </form>
    </section>
  );
};
