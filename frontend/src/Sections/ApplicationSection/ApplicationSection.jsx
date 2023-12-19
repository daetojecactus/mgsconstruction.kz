import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import "./ApplicationSection.scss";
import Select from "react-select";
import axios from "axios";
import { fetchSocialLinks } from "../../http/socialAPI";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";
import ApplicationSectionData from "./ApplicationSectionData";

const ApplicationSection = () => {
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык

  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Преобразование объекта областей в массив объектов для react-select
  const formatRegionsData = (data) => {
    return Object.keys(data).map((key) => ({
      label: data[key],
      value: key,
    }));
  };

  // Загрузка списка областей Казахстана
  useEffect(() => {
    axios
      .get("https://namaztimes.kz/ru/api/states?id=99&type=json")
      .then((response) => {
        // Обработка данных об областях
        const regionsData = formatRegionsData(response.data);
        setRegions(regionsData);
      })
      .catch((error) => {
        console.error("Ошибка при получении списка областей:", error);
      });
  }, []);

  // Загрузка списка городов для выбранной области
  useEffect(() => {
    if (selectedRegion) {
      axios
        .get(
          `https://namaztimes.kz/ru/api/cities?id=${selectedRegion.value}&type=json`
        )
        .then((response) => {
          // Обработка данных о городах
          const citiesData = formatRegionsData(response.data);
          setCities(citiesData);
        })
        .catch((error) => {
          console.error("Ошибка при получении списка городов:", error);
        });
    }
  }, [selectedRegion]);

  const onSubmit = async (data) => {
    try {
      // Отправка данных на сервер
      // const response = await axios.post("http://localhost:5000/submit-form", data);
      const response = await axios.post("/submit-form", data);

      // Обработка успешного ответа (пока что выводим алерт)
      alert("Форма успешно отправлена!");

      // Сброс формы после успешной отправки
      reset();
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  };

  const [socialLinks, setSocialLinks] = useState([]);
  const desiredPlatforms = ["whatsapp", "telegram"]; // Здесь указываются названия нужных платформ

  useEffect(() => {
    fetchSocialLinks().then((data) => {
      setSocialLinks(data);
    });
  }, []);

  const filteredSocialLinks = socialLinks.filter((link) =>
    desiredPlatforms.includes(link.platform)
  );

  return (
    <section id="application" className="application">
      <div className="application__container container">
        <h2 className="application__title">{ApplicationSectionData[0].ApplicationSectionDataTitle[selectedLanguage]}</h2>
        <form action="#" className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form__label form__place--1">
            <input
              type="text"
              className={`form__input ${
                watch("guestName") ? "has-content" : ""
              }`}
              {...register("guestName", {
                required:  ApplicationSectionData[0].ApplicationSectionDataErrorNameReq[selectedLanguage],
                minLength: {
                  value: 2,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorNameMin[selectedLanguage],
                },
                maxLength: {
                  value: 25,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorNameMax[selectedLanguage],
                },
                pattern: {
                  value: /^[a-zA-Zа-яА-Я\s\-]+$/,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorNamePattern[selectedLanguage],
                },
              })}
            />
            <span className="form__placeholder">
            {ApplicationSectionData[0].ApplicationSectionDataName[selectedLanguage]}<span className="form__placeholder-mark">*</span>
            </span>
            <div className="form__error">
              {errors?.guestName && (
                <p className="form__error-text">
                  {errors?.guestName?.message || "Error!"}
                </p>
              )}
            </div>
          </label>

          <label className="form__label form__place--2">
            <InputMask
              mask="+7 (999) 999-99-99"
              type="tel"
              className={`form__input ${
                watch("guestPhone") ? "has-content" : ""
              }`}
              {...register("guestPhone", {
                required: ApplicationSectionData[0].ApplicationSectionDataErrorPhoneReq[selectedLanguage],
                pattern: {
                  value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorPhonePattern[selectedLanguage],
                },
                minLength: {
                  value: 18,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorPhonePattern[selectedLanguage],
                },
              })}
            />
            <span className="form__placeholder">
            {ApplicationSectionData[0].ApplicationSectionDataPhone[selectedLanguage]}<span className="form__placeholder-mark">*</span>
            </span>
            <div className="form__error">
              {errors?.guestPhone && (
                <p className="form__error-text">
                  {errors?.guestPhone?.message || "Error!"}
                </p>
              )}
            </div>
          </label>

          <label className="form__label form__place--3">
            <input
              className={`form__input ${
                watch("guestEmail") ? "has-content" : ""
              }`}
              type="email"
              {...register("guestEmail", {
                required: ApplicationSectionData[0].ApplicationSectionDataErrorEmailReq[selectedLanguage],
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorEmailPattern[selectedLanguage],
                },
                minLength: {
                  value: 5,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorEmailMin[selectedLanguage],
                },
                maxLength: {
                  value: 50,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorEmailMax[selectedLanguage],
                },
              })}
            />
            <span className="form__placeholder">
              E-mail<span className="form__placeholder-mark">*</span>
            </span>
            <div className="form__error">
              {errors.guestEmail && (
                <p className="form__error-text">{errors.guestEmail.message}</p>
              )}
            </div>
          </label>
          <label className="form__label form__place--4">
            <Controller
              name="selectedRegion"
              control={control}
              rules={{
                required: ApplicationSectionData[0].ApplicationSectionDataErrorRegionReq[selectedLanguage],
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={regions}
                  placeholder={ApplicationSectionData[0].ApplicationSectionDataRegion[selectedLanguage]}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setSelectedRegion(selectedOption);
                  }}
                  aria-invalid={errors.selectedRegion ? "true" : "false"}
                />
              )}
            />
            {errors.selectedRegion && (
              <div className="form__error">
                <p className="form__error-text">
                  {errors.selectedRegion.message}
                </p>
              </div>
            )}
          </label>
          <label className="form__label form__place--5">
            <Controller
              style={{ position: "relative;" }}
              name="selectedCity"
              control={control}
              rules={{
                required: ApplicationSectionData[0].ApplicationSectionDataErrorCityReq[selectedLanguage],
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={cities}
                  placeholder={ApplicationSectionData[0].ApplicationSectionDataCity[selectedLanguage]}
                  isDisabled={!selectedRegion}
                  aria-invalid={errors.selectedCity ? "true" : "false"}
                />
              )}
            />
            {errors.selectedCity && (
              <div className="form__error">
                <p className="form__error-text">
                  {errors.selectedCity.message}
                </p>
              </div>
            )}
          </label>

          <label className="form__label form__place--6">
            <textarea
              className={`form__textarea ${
                watch("guestComment") ? "has-content" : ""
              }`}
              name="comment"
              {...register("guestComment", {
                maxLength: {
                  value: 500,
                  message: ApplicationSectionData[0].ApplicationSectionDataErrorCommentMax[selectedLanguage],
                },
              })}
            />
            <span className="form__placeholder">
            {ApplicationSectionData[0].ApplicationSectionDataComment[selectedLanguage]}<span className="form__placeholder-mark">*</span>
            </span>
            <div className="form__error">
              {errors.guestComment && (
                <p className="form__error-text">
                  {errors.guestComment.message}
                </p>
              )}
            </div>
          </label>

          <button
            className="form__btn btn-reset form__place--7"
            type="submit"
            disabled={!isValid}
          >
            {ApplicationSectionData[0].ApplicationSectionDataBtn[selectedLanguage]}
          </button>

          <div className="form__place--8">
            <p className="form__descr">{ApplicationSectionData[0].ApplicationSectionDataClick[selectedLanguage]}</p>
            <ul className="form__list list-reset">
              {filteredSocialLinks.map((link) => (
                <li className="form__item" key={link.id}>
                  <a
                    href={link.url}
                    className="form__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`../images/${link.platform}.svg`}
                      alt={link.platform}
                      className="form__link-icon"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApplicationSection;
