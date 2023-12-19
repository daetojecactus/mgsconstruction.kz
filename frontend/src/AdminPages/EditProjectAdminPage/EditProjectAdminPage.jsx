import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneProject, updateProject } from "../../http/projectAPI";
import {
  fetchCategoriesByProjectId,
  fetchCategories,
} from "../../http/categoryAPI";
import {
  createCard,
  updateCard,
  deleteCard,
  fetchCardsByProjectId,
} from "../../http/cardAPI";
import Select from "react-select";
import { observer } from "mobx-react-lite";
import { ImFolderUpload, ImPlus, ImBin } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";

const EditProjectAdminPage = observer(() => {
  const { id } = useParams();

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
    pageImg: null,
    info: [],
    cards: [],
    selectedCategory: null,
  });

  useEffect(() => {
    fetchOneProject(id)
      .then((projectData) => {
        setProjectData({
          ...projectData,
          name: JSON.parse(projectData.name),
          stage: JSON.parse(projectData.stage),
          descr: JSON.parse(projectData.descr),
        });
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, [id]);

  const [cards, setCards] = useState([]); // Список карточек
  const [updatedCards, setUpdatedCards] = useState([]);

  const deleteAllCardsByProjectId = async () => {
    try {
      // Преобразуйте id к числовому значению
      const projectId = parseInt(id);

      // Получим все карточки проекта
      const projectCards = await fetchCardsByProjectId(projectId);

      // console.log("idid", projectId);
      // console.log("projectCards", projectCards);

      // Удалим каждую карточку
      for (const card of projectCards) {
        // console.log("Удаляем карточку с ID:", card.id);
        await deleteCard(card.id);
      }

      // Обновим состояние, убрав карточки
      setProjectData((prevData) => ({
        ...prevData,
        cards: [],
      }));

      // Удалите все карточки из массива updatedCards
      setUpdatedCards({});

      console.log("Все карточки успешно удалены");
    } catch (error) {
      console.error("Ошибка при удалении карточек", error);
    }
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

  const changeProjectInfo = (field, value, lang) => {
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
          id: Date.now(),
        },
      ],
    });
  };

  const changeInfo = (field, value, lang, number) => {
    setProjectData({
      ...projectData,
      info: projectData.info.map((info) =>
        info.id === number
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

  const removeInfo = (number) => {
    setProjectData({
      ...projectData,
      info: projectData.info.filter((info) => info.id !== number),
    });
  };

  const [categories, setCategories] = useState([]); // Список всех категорий

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

  useEffect(() => {
    fetchOneProject(id)
      .then((projectData) => {
        setProjectData({
          ...projectData,
          name: JSON.parse(projectData.name),
          stage: JSON.parse(projectData.stage),
          descr: JSON.parse(projectData.descr),
        });
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });

    fetchCategories().then((data) => {
      setCategories(data);
    });

    fetchCategoriesByProjectId(id).then((data) => {
      const parsedCategories = data.map((category) => ({
        ...category,
        category: JSON.parse(category.category),
      }));

      const selectedCategory =
        parsedCategories.length > 0 ? parsedCategories[0] : null;

      setProjectData((prevData) => ({
        ...prevData,
        selectedCategory: selectedCategory
          ? {
              value: selectedCategory.id,
              label: selectedCategory.category.ru,
            }
          : null,
      }));

      console.log("selectedCategory", selectedCategory);
    });

    // Загрузите карточки проекта по его ID и обновите состояние projectData.cards
    fetchCardsByProjectId(id)
      .then((cardsData) => {
        setProjectData((prevData) => ({
          ...prevData,
          cards: cardsData,
        }));
      })
      .catch((error) => {
        console.error("Error fetching project cards:", error);
      });
  }, [id]);

  const updateProjectData = async (e) => {
    e.preventDefault();
    try {
      if (projectData.cards.length === 0) {
        alert("Добавьте как минимум одну карточку к проекту.");
        return;
      }

      // Проверка заполненности всех обязательных полей проекта
      if (
        !projectData.name ||
        !projectData.stage ||
        !projectData.descr ||
        !projectData.img ||
        !projectData.pageImg
      ) {
        alert("Пожалуйста, заполните все обязательные поля проекта.");
        return;
      }

      // Продолжайте как обычно с добавлением новых данных
      const formData = new FormData();

      // Преобразуйте объекты name, stage и descr в JSON-строки
      formData.append("name", JSON.stringify(projectData.name));
      formData.append("stage", JSON.stringify(projectData.stage));
      formData.append("descr", JSON.stringify(projectData.descr));

      console.log("img", projectData.img);

      // Добавьте остальные данные как обычно
      formData.append("img", projectData.img);
      formData.append("pageImg", projectData.pageImg);

      // Проверьте, что projectData.selectedCategory существует и имеет свойство value
      if (projectData.selectedCategory && projectData.selectedCategory.value) {
        formData.append("categoryID", projectData.selectedCategory.value);
      }

      // Добавьте сериализованные данные info
      formData.append("info", JSON.stringify(projectData.info));

      console.log("Отправляемые данные на сервер:", formData);

      // Отправьте обновленные данные проекта
      const updatedProject = await updateProject(id, formData);

      console.log("Обновленный проект:", updatedProject);

      // Создайте карточки аналогично функции addProject
      for (const cardData of projectData.cards) {
        const cardFormData = new FormData();
        cardFormData.append("title", JSON.stringify(cardData.title));

        // Добавьте остальные данные карточки как обычно
        cardFormData.append("projectId", id);

        // Загрузите изображения для карточки, если они есть
        for (const image of cardData.images) {
          cardFormData.append("images", image);
        }

        // Отправьте карточку на сервер
        const cardResponse = await createCard(cardFormData);
        console.log("Карточка успешно добавлена", cardResponse);

        // Обновите состояние projectData.cards после создания новой карточки
        setProjectData((prevData) => ({
          ...prevData,
          cards: [
            ...prevData.cards,
            {
              title: cardData.title,
              images: cardData.images,
              number: Date.now(),
            },
          ],
        }));
      }

      alert("Проект и карточки успешно обновлены");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при обновлении проекта и карточек", error);
      alert(
        "Произошла ошибка при обновлении проекта и карточек. Пожалуйста, попробуйте еще раз."
      );
    }
  };

  const [showCardSection, setShowCardSection] = useState(false);

  const handleDeleteAndShowCards = async (e) => {
    e.preventDefault();
    // Удалите все карточки проекта перед добавлением новой
    await deleteAllCardsByProjectId(id);

    // Показывайте раздел с карточками
    setShowCardSection(true);
  };

  // console.log("projectData", projectData);
  // console.log("projectData.cards", projectData.cards);
  // console.log(projectData.info);
  // console.log(categories);

  // console.log("selectedImage:", selectedImage);
  // console.log("selectedPageImage:", selectedPageImage);

  return (
    <section className="create-project">
      <div className="create-project__container container">
        <h1 className="create-project__title-main">Редактировать проект</h1>
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
                onChange={(e) =>
                  changeProjectInfo("name", e.target.value, "ru")
                }
                placeholder="Введите название на русском"
              />
              <label className="create-project__label">
                Название на английском
              </label>
              <input
                type="text"
                name="name_en"
                value={projectData.name.en}
                onChange={(e) =>
                  changeProjectInfo("name", e.target.value, "en")
                }
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
                onChange={(e) =>
                  changeProjectInfo("name", e.target.value, "kz")
                }
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
                onChange={(e) =>
                  changeProjectInfo("name", e.target.value, "tr")
                }
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
                onChange={(e) =>
                  changeProjectInfo("stage", e.target.value, "ru")
                }
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
                onChange={(e) =>
                  changeProjectInfo("stage", e.target.value, "en")
                }
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
                onChange={(e) =>
                  changeProjectInfo("stage", e.target.value, "kz")
                }
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
                onChange={(e) =>
                  changeProjectInfo("stage", e.target.value, "tr")
                }
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
                onChange={(e) =>
                  changeProjectInfo("descr", e.target.value, "ru")
                }
                className="create-project__input create-project__input-textarea"
                placeholder="Введите descr на русском"
              />
              <label className="create-project__label">
                Описаниена английском
              </label>
              <textarea
                name="descr_en"
                value={projectData.descr.en}
                onChange={(e) =>
                  changeProjectInfo("descr", e.target.value, "en")
                }
                className="create-project__input create-project__input-textarea"
                placeholder="Введите descr на en"
              />
              <label className="create-project__label">
                Описание на казахском
              </label>
              <textarea
                name="descr_kz"
                value={projectData.descr.kz}
                onChange={(e) =>
                  changeProjectInfo("descr", e.target.value, "kz")
                }
                className="create-project__input create-project__input-textarea"
                placeholder="Введите descr на kz"
              />
              <label className="create-project__label">
                Описание на турецком
              </label>
              <textarea
                name="descr_tr"
                value={projectData.descr.tr}
                onChange={(e) =>
                  changeProjectInfo("descr", e.target.value, "tr")
                }
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
              <div className="create-project__category-select">
                <label className="create-project__label">
                  Выберите категорию
                </label>
                <Select
                  options={categories.map((category) => ({
                    value: category.id,
                    label: JSON.parse(category.category).category.ru,
                  }))}
                  value={projectData.selectedCategory} // Выбранная категория
                  onChange={(selectedOption) =>
                    setProjectData((prevData) => ({
                      ...prevData,
                      selectedCategory: selectedOption,
                    }))
                  }
                />
              </div>
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
                Добавить новую информацию
              </button>
            </div>
            {projectData.info.map((info, index) => (
              <div key={info.id || `new_${info.number}`}>
                <div className="create-project__info-name">
                  <h3 className="create-project__caption">Название:</h3>
                  <label className="create-project__label">
                    Название на русском
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`info_title_ru_${info.id || info.number}`}
                    value={info.title.ru}
                    onChange={(e) =>
                      changeInfo(
                        "title",
                        e.target.value,
                        "ru",
                        info.id || info.number
                      )
                    }
                    placeholder="Введите название на русском"
                  />
                  {/* Добавим отладочную информацию */}
                  {console.log("Info Title:", info.title)}
                  <label className="create-project__label">
                    Название на английском
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`info_title_en_${info.id || info.number}`}
                    value={info.title.en}
                    onChange={(e) =>
                      changeInfo(
                        "title",
                        e.target.value,
                        "en",
                        info.id || info.number
                      )
                    }
                    placeholder="Введите название на английском"
                  />
                  <label className="create-project__label">
                    Название на казахском
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`info_title_kz_${info.id || info.number}`}
                    value={info.title.kz}
                    onChange={(e) =>
                      changeInfo(
                        "title",
                        e.target.value,
                        "kz",
                        info.id || info.number
                      )
                    }
                    placeholder="Введите название на казахском"
                  />
                  <label className="create-project__label">
                    Название на турецком
                  </label>
                  <input
                    className="create-project__input"
                    type="text"
                    name={`info_title_tr_${info.id || info.number}`}
                    value={info.title.tr}
                    onChange={(e) =>
                      changeInfo(
                        "title",
                        e.target.value,
                        "tr",
                        info.id || info.number
                      )
                    }
                    placeholder="Введите название на турецком"
                  />
                </div>
                <div className="create-project__info-descr">
                  <h3 className="create-project__caption">Описание:</h3>
                  <label className="create-project__label">
                    Описание на русском
                  </label>
                  <textarea
                    className="create-project__input create-project__input-textarea"
                    name={`info_description_ru_${info.id || info.number}`}
                    value={info.description.ru}
                    onChange={(e) =>
                      changeInfo(
                        "description",
                        e.target.value,
                        "ru",
                        info.id || info.number
                      )
                    }
                    placeholder="Введите описание на русском"
                  />
                  <label className="create-project__label">
                    Описание на английском
                  </label>
                  <textarea
                    className="create-project__input create-project__input-textarea"
                    name={`info_description_en_${info.id || info.number}`}
                    value={info.description.en}
                    onChange={(e) =>
                      changeInfo(
                        "description",
                        e.target.value,
                        "en",
                        info.id || info.number
                      )
                    }
                    placeholder="Введите описание на английском"
                  />
                  <label className="create-project__label">
                    Описание на казахском
                  </label>
                  <textarea
                    className="create-project__input create-project__input-textarea"
                    name={`info_description_kz_${info.id || info.number}`}
                    value={info.description.kz}
                    onChange={(e) =>
                      changeInfo(
                        "description",
                        e.target.value,
                        "kz",
                        info.id || info.number
                      )
                    }
                    placeholder="Введите описание на казахском"
                  />
                  <label className="create-project__label">
                    Описание на турецком
                  </label>
                  <textarea
                    className="create-project__input create-project__input-textarea"
                    name={`info_description_tr_${info.id || info.number}`}
                    value={info.description.tr}
                    onChange={(e) =>
                      changeInfo(
                        "description",
                        e.target.value,
                        "tr",
                        info.id || info.number
                      )
                    }
                    placeholder="Введите описание на турецком"
                  />
                </div>
                <div>
                  <button
                    onClick={() => removeInfo(info.id || info.number)}
                    className="create-project__btn btn-reset create-project__btn--delinfo"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="create-project__show-wrapper">
            {!showCardSection && (
              <button
                onClick={handleDeleteAndShowCards}
                className="create-project__show-button btn-reset"
              >
                Добавить новые карточки
              </button>
            )}
          </div>
          {showCardSection && (
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
                {projectData.cards.map((card) =>
                  !card.id ? (
                    <div
                      key={card.number}
                      className="create-project__card--list"
                    >
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
                  ) : null
                )}
              </div>
            </div>
          )}
        </form>
        {/* <button onClick={updateProjectData}>Обновить проект</button> */}

        <div className="create-project__wrapper-mainbtn">
          <button
            className="create-project__btn create-project__btn--mainbtn btn-reset"
            onClick={updateProjectData}
          >
            Обновить проект
          </button>
        </div>
      </div>
    </section>
  );
});

export default EditProjectAdminPage;
