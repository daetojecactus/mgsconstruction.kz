import React, { useContext, useState, useEffect } from "react";
import { createProject } from "../../http/projectAPI";
import { fetchCategories } from "../../http/categoryAPI";
import { createCard } from "../../http/cardAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import Select from "react-select";
import "./CreateProjectAdminPage.scss";
import { ImFolderUpload, ImPlus, ImBin } from "react-icons/im";

const CreateProjectAdminPage = observer(() => {
  const { project } = useContext(Context);
  const [projectData, setProjectData] = useState({
    name: {
      ru: "",
      en: "",
      tr: "",
      kz: "",
    },
    stage: {
      ru: "",
      en: "",
      tr: "",
      kz: "",
    },
    descr: {
      ru: "",
      en: "",
      tr: "",
      kz: "",
    },
    img: null,
    info: [],
    cards: [],
    selectedCategory: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, lang, id] = name.split("_");
    console.log(
      "handleChange вызван. field:",
      field,
      "lang:",
      lang,
      "value:",
      value
    );
    setProjectData({
      ...projectData,
      [field]: {
        ...projectData[field],
        [lang]: value,
      },
    });
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }

    setProjectData({
      ...projectData,
      img: selectedFile,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setProjectData({
      ...projectData,
      selectedCategory: selectedOption,
    });
  };

  const addInfo = (e) => {
    e.preventDefault();
    setProjectData({
      ...projectData,
      info: [
        ...projectData.info,
        {
          title: {
            ru: "",
            en: "",
            tr: "",
            kz: "",
          },
          description: {
            ru: "",
            en: "",
            tr: "",
            kz: "",
          },
          number: Date.now(),
        },
      ],
    });
  };

  const removeInfo = (number) => {
    setProjectData({
      ...projectData,
      info: projectData.info.filter((i) => i.number !== number),
    });
  };

  const changeInfo = (field, value, lang, number) => {
    setProjectData({
      ...projectData,
      info: projectData.info.map((info) =>
        info.number === number
          ? {
              ...info,
              [field]: {
                ...info[field],
                [lang]: value,
              },
            }
          : info
      ),
    });
  };

  const addCard = (e) => {
    e.preventDefault();
    setProjectData({
      ...projectData,
      cards: [
        ...projectData.cards,
        {
          title: {
            ru: "",
            en: "",
            tr: "",
            kz: "",
          },
          images: [], // Изменим на пустой массив
          number: Date.now(),
        },
      ],
    });
  };

  const removeCard = (number) => {
    setProjectData({
      ...projectData,
      cards: projectData.cards.filter((card) => card.number !== number),
    });
  };

  const changeCard = (field, value, lang, number) => {
    setProjectData({
      ...projectData,
      cards: projectData.cards.map((card) =>
        card.number === number
          ? {
              ...card,
              [field]: {
                ...card[field],
                [lang]: value,
              },
            }
          : card
      ),
    });
  };

  const removeCardImage = (cardNumber, imageIndex) => {
    setProjectData({
      ...projectData,
      cards: projectData.cards.map((card) =>
        card.number === cardNumber
          ? {
              ...card,
              images: card.images.filter((_, index) => index !== imageIndex),
            }
          : card
      ),
    });
  };

  const handleCardImageChange = (cardNumber, images) => {
    setProjectData({
      ...projectData,
      cards: projectData.cards.map((card) =>
        card.number === cardNumber
          ? {
              ...card,
              images: Array.from(images),
            }
          : card
      ),
    });
  };

  const [selectedPageImage, setSelectedPageImage] = useState(null);

  const handlePageImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const pageImageUrl = URL.createObjectURL(selectedFile);
      setSelectedPageImage(pageImageUrl);
    }

    setProjectData({
      ...projectData,
      pageImg: selectedFile, // Добавляем поле pageImg
    });
  };

  const addProject = async () => {
    // Проверка наличия всех обязательных полей для проекта
    if (
      !projectData.name ||
      !projectData.stage ||
      !projectData.descr ||
      !projectData.img ||
      !projectData.pageImg ||
      !projectData.selectedCategory ||
      !projectData.selectedCategory.value ||
      !projectData.info
    ) {
      alert("Пожалуйста, заполните все поля проекта");
      return; // Прерываем выполнение функции, если хоть одно поле проекта не заполнено
    }

    // Проверка наличия хотя бы одной карточки
    if (!projectData.cards || projectData.cards.length === 0) {
      alert("Пожалуйста, создайте карточку");
      return;
    }

    const formData = new FormData();

    // Преобразуйте объекты name, stage и descr в JSON-строки
    formData.append("name", JSON.stringify(projectData.name));
    formData.append("stage", JSON.stringify(projectData.stage));
    formData.append("descr", JSON.stringify(projectData.descr));

    // Добавьте остальные данные как обычно
    formData.append("img", projectData.img);
    formData.append("pageImg", projectData.pageImg);

    formData.append("projectCategoryId", projectData.selectedCategory.value);

    // Добавьте сериализованные данные info
    formData.append("info", JSON.stringify(projectData.info));

    console.log("Отправляемые данные на сервер (проект):", formData);
    console.log(
      "projectData.selectedCategory.value:",
      parseInt(projectData.selectedCategory.value)
    );

    try {
      const projectDataResponse = await createProject(formData);
      console.log("Проект успешно добавлен", projectDataResponse);

      const projectID = projectDataResponse.id; // Получаем projectID

      // Теперь отправим каждую карточку
      for (const cardData of projectData.cards) {
        // Проверка наличия всех обязательных полей для карточки
        if (
          !cardData.title ||
          !cardData.images ||
          cardData.images.length === 0
        ) {
          alert("Пожалуйста, заполните все поля для каждой карточки");
          return; // Прерываем выполнение функции, если хоть одно поле карточки не заполнено
        }

        const cardFormData = new FormData();
        cardFormData.append("title", JSON.stringify(cardData.title));
        // Добавьте остальные данные карточки как обычно
        cardFormData.append("projectId", projectID);

        // Загрузите изображения для карточки, если они есть
        for (const image of cardData.images) {
          cardFormData.append("images", image);
        }

        // Отправьте карточку на сервер
        const cardResponse = await createCard(cardFormData);
        console.log("Карточка успешно добавлена", cardResponse);
      }

      alert("Проект и карточки успешно добавлены");
    } catch (error) {
      console.error("Ошибка при добавлении проекта и карточек", error);
      // Обработайте ошибку, например, выведите пользователю сообщение об ошибке
    }
  };

  // Загрузка категорий
  const [parsedCategories, setParsedCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => {
      const parsedCategories = data.map((item) => {
        const categoryData = JSON.parse(item.category);
        return {
          id: item.id,
          categoryId: item.id,
          ...categoryData,
        };
      });
      setParsedCategories(parsedCategories);
    });
  }, []);

  // console.log(projectData);

  return (
    <section className="create-project" id="create-project">
      <div className="container create-project__container">
        <h1 className="create-project__title-main">Ваш новый проект</h1>
        <form className="create-project__form" encType="multipart/form-data">
          <div className="create-project__main">
            <h2 className="create-project__main-title">
              Основная информация проекта
            </h2>
            <div className="create-project__main-name">
              <h3 className="create-project__caption">Название проекта:</h3>
              <label className="create-project__label">
                Название на русском
              </label>
              <input
                className="create-project__input"
                type="text"
                name="name_ru"
                value={projectData.name.ru}
                onChange={handleChange}
                placeholder="Введите название на русском"
              />
              <label className="create-project__label">
                Название на английском
              </label>
              <input
                type="text"
                name="name_en"
                value={projectData.name.en}
                onChange={handleChange}
                className="create-project__input"
                placeholder="Введите название на en"
              />

              <label className="create-project__label">
                Название на казахском
              </label>
              <input
                type="text"
                name="name_kz"
                value={projectData.name.kz}
                onChange={handleChange}
                className="create-project__input"
                placeholder="Введите название на kz"
              />
              <label className="create-project__label">
                Название на турецком
              </label>
              <input
                type="text"
                name="name_tr"
                value={projectData.name.tr}
                onChange={handleChange}
                className="create-project__input"
                placeholder="Введите название на tr"
              />
            </div>
            <div className="create-project__main-stage">
              <h3 className="create-project__caption">Стадия проекта:</h3>
              <label className="create-project__label">Стадия на русском</label>
              <input
                type="text"
                name="stage_ru"
                value={projectData.stage.ru}
                onChange={handleChange}
                className="create-project__input"
                placeholder="Введите stage на русском"
              />
              <label className="create-project__label">
                Стадия на английском
              </label>
              <input
                type="text"
                name="stage_en"
                value={projectData.stage.en}
                onChange={handleChange}
                className="create-project__input"
                placeholder="Введите stage на en"
              />

              <label className="create-project__label">
                Стадия на казахском
              </label>
              <input
                type="text"
                name="stage_kz"
                value={projectData.stage.kz}
                onChange={handleChange}
                className="create-project__input"
                placeholder="Введите stage на kz"
              />

              <label className="create-project__label">
                Стадия на турецком
              </label>
              <input
                type="text"
                name="stage_tr"
                value={projectData.stage.tr}
                onChange={handleChange}
                className="create-project__input"
                placeholder="Введите stage на tr"
              />
            </div>
            <div className="create-project__main-descr">
              <h3 className="create-project__caption">Описание проекта:</h3>
              <label className="create-project__label">
                Описание на русском
              </label>
              <textarea
                name="descr_ru"
                value={projectData.descr.ru}
                onChange={handleChange}
                className="create-project__input create-project__input-textarea"
                placeholder="Введите descr на русском"
              />
              <label className="create-project__label">
                Описаниена английском
              </label>
              <textarea
                name="descr_en"
                value={projectData.descr.en}
                onChange={handleChange}
                className="create-project__input create-project__input-textarea"
                placeholder="Введите descr на en"
              />
              <label className="create-project__label">
                Описание на казахском
              </label>
              <textarea
                name="descr_kz"
                value={projectData.descr.kz}
                onChange={handleChange}
                className="create-project__input create-project__input-textarea"
                placeholder="Введите descr на kz"
              />
              <label className="create-project__label">
                Описание на турецком
              </label>
              <textarea
                name="descr_tr"
                value={projectData.descr.tr}
                onChange={handleChange}
                className="create-project__input create-project__input-textarea"
                placeholder="Введите descr на tr"
              />
            </div>
            <div className="create-project__main-image">
              <h3 className="create-project__caption">Фотография проекта:</h3>
              <div className="create-project__wrapper--image">
                <label className="create-project__label create-project__label--image">
                  <ImFolderUpload className="create-project__input--icon" />
                  <span className="create-project__text--image">
                    Выберите фотографию
                  </span>
                  <input
                    className="create-project__input create-project__input--image"
                    type="file"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Выбранное изображение"
                  className="selected-image-preview"
                />
              )}
            </div>
            <div className="create-project__main-category">
              <h3 className="create-project__caption">Категория проекта:</h3>
              <Select
                options={parsedCategories.map((category) => ({
                  value: category.id,
                  label: category.category.ru,
                }))}
                value={projectData.selectedCategory}
                onChange={handleSelectChange}
                placeholder="Выберите категорию"
              />
            </div>
            <div className="create-project__page-image">
              <h3 className="create-project__caption">
                Фотография страницы проекта:
              </h3>
              <div className="create-project__wrapper--image">
                <label className="create-project__label create-project__label--image">
                  <ImFolderUpload className="create-project__input--icon" />
                  <span className="create-project__text--image">
                    Выберите фотографию страницы
                  </span>
                  <input
                    className="create-project__input create-project__input--image"
                    type="file"
                    onChange={handlePageImageChange} // Добавляем обработчик события для изменения фотографии страницы
                  />
                </label>
              </div>
              {selectedPageImage && (
                <img
                  src={selectedPageImage}
                  alt="Выбранное изображение страницы"
                  className="selected-page-image-preview"
                />
              )}
            </div>
          </div>
          <div className="create-project__info">
            <h2 className="create-project__info-title">
              Дополнительная информация
            </h2>
            <div className="create-project__wrapper-info">
              <button
                className="create-project__btn btn-reset create-project__btn--addinfo"
                onClick={addInfo}
              >
                <ImPlus className="all-projects__btn-icon" />
                Добавить новую информацию
              </button>
            </div>

            {projectData.info.map((i) => (
              <div key={i.number}>
                <div className="create-project__info-name">
                  <h3 className="create-project__caption">Название:</h3>
                  <label className="create-project__label">
                    Название на русском
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`info_title_ru_${i.number}`}
                    value={i.title.ru}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, "ru", i.number)
                    }
                    placeholder="Введите название на русском"
                  />
                  <label className="create-project__label">
                    Название на английском
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`info_title_en_${i.number}`}
                    value={i.title.en}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, "en", i.number)
                    }
                    placeholder="Enter title in English"
                  />
                  <label className="create-project__label">
                    Название на казахском
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`info_title_kz_${i.number}`}
                    value={i.title.kz}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, "kz", i.number)
                    }
                    placeholder="Қазақ тілінде тақырып енгізіңіз"
                  />
                  <label className="create-project__label">
                    Название на турецком
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`info_title_tr_${i.number}`}
                    value={i.title.tr}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, "tr", i.number)
                    }
                    placeholder="Türkçe başlık girin"
                  />
                </div>
                <div className="create-project__info-descr">
                  <h3 className="create-project__caption">Описание:</h3>
                  <label className="create-project__label">
                    Описание на русском
                  </label>
                  <textarea
                    className="create-project__input create-project__input-textarea"
                    type="text"
                    name={`info_description_ru_${i.number}`}
                    value={i.description.ru}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, "ru", i.number)
                    }
                    placeholder="Введите описание на русском"
                  />
                  <label className="create-project__label">
                    Описание на английском
                  </label>
                  <textarea
                    className="create-project__input create-project__input-textarea"
                    type="text"
                    name={`info_description_en_${i.number}`}
                    value={i.description.en}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, "en", i.number)
                    }
                    placeholder="Enter description in English"
                  />
                  <label className="create-project__label">
                    Описание на казахском
                  </label>
                  <textarea
                    className="create-project__input create-project__input-textarea"
                    type="text"
                    name={`info_description_kz_${i.number}`}
                    value={i.description.kz}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, "kz", i.number)
                    }
                    placeholder="Қазақ тілінде сипаттаманы енгізіңіз"
                  />
                  <label className="create-project__label">
                    Описание на турецком
                  </label>
                  <textarea
                    className="create-project__input create-project__input-textarea"
                    type="text"
                    name={`info_description_tr_${i.number}`}
                    value={i.description.tr}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, "tr", i.number)
                    }
                    placeholder="Türkçe açıklama girin"
                  />
                </div>
                <div>
                  <button
                    onClick={() => removeInfo(i.number)}
                    className="create-project__btn btn-reset create-project__btn--delinfo"
                  >
                    <ImBin className="all-projects__btn-icon" />
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="create-project__card">
            <h2 className="create-project__card-title">Карточка проекта</h2>
            <div className="create-project__wrapper-card">
              <button
                onClick={addCard}
                className="create-project__btn btn-reset create-project__btn--addcard"
              >
                <ImPlus className="all-projects__btn-icon" />
                Добавить карточку
              </button>
            </div>
            <div className="create-project__card--content">
              {projectData.cards.map((card) => (
                <div key={card.number} className="create-project__card--list">
                  <div className="create-project__card-delwrapper">
                    <button
                      onClick={() => removeCard(card.number)}
                      className="create-project__btn btn-reset create-project__btn--delcard"
                    >
                      <ImBin className="all-projects__btn-icon" />
                      Удалить
                    </button>
                  </div>
                  <label className="create-project__label">
                    Название на русском:
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`card_title_ru_${card.number}`}
                    placeholder="Card Title (RU)"
                    value={card.title.ru}
                    onChange={(e) =>
                      changeCard("title", e.target.value, "ru", card.number)
                    }
                  />
                  <label className="create-project__label">
                    Название на английском:
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`card_title_en_${card.number}`}
                    placeholder="Card Title (EN)"
                    value={card.title.en}
                    onChange={(e) =>
                      changeCard("title", e.target.value, "en", card.number)
                    }
                  />
                  <label className="create-project__label">
                    Название на казахском:
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`card_title_kz_${card.number}`}
                    placeholder="Card Title (KZ)"
                    value={card.title.kz}
                    onChange={(e) =>
                      changeCard("title", e.target.value, "kz", card.number)
                    }
                  />
                  <label className="create-project__label">
                    Название на турецком:
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`card_title_tr_${card.number}`}
                    placeholder="Card Title (TR)"
                    value={card.title.tr}
                    onChange={(e) =>
                      changeCard("title", e.target.value, "tr", card.number)
                    }
                  />
                  <div className="create-project__wrapper">
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleCardImageChange(card.number, e.target.files)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
        <div className="create-project__wrapper-mainbtn">
          <button
            className="create-project__btn create-project__btn--mainbtn btn-reset"
            onClick={addProject}
          >
            Добавить
          </button>
        </div>
      </div>
    </section>
  );
});

export default CreateProjectAdminPage;
