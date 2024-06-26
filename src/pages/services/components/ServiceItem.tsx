import { IService } from "@/api/api";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const ServiceItem: FC<IService> = ({
  name,
  description,
  price,
  img,
  slug,
}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "service" });

  return (
    <article className="flex flex-col rounded-3xl shadow-lg">
      <div className="relative aspect-square h-[400px] overflow-hidden rounded-t-3xl">
        <img
          className="h-full w-full object-cover"
          src={import.meta.env.VITE_BASE_URL + img?.data?.attributes?.url}
          alt={name}
        />
      </div>
      <div className="rounded-b-3xl bg-white p-6">
        <div className="text-2xl font-bold">{name}</div>
        <div className="text-lg font-thin text-gray-600">{description}</div>
      </div>
      <div className="p-6 mt-auto">
        <div className="w-full h-0.5 bg-gray-300"></div>
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-lg">{price} kr</h3>
          <Link
            to={`/services/${slug}`}
            className="primary-color-bg rounded px-8 py-3 text-white bg-blue-600 hover:bg-blue-500"
          >
            {t("view-service")}
          </Link>
        </div>
      </div>
    </article>
  );
};
