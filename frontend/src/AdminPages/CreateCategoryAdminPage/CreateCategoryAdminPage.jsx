import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../index";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategories,
} from "../../http/categoryAPI";
import { observer } from "mobx-react-lite";
import "./CreateCategoryAdminPage.scss";
import { ImBin, ImCog, ImPlus, ImHome } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../../Utils/consts";

const CreateCategoryAdminPage = observer(() => {
  const navigate = useNavigate();

  const { project } = useContext(Context);
  const [categoryData, setCategoryData] = useState({
    category: {
      ru: "",
      en: "",
      tr: "",
      kz: "",
    },
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    ru: "",
    en: "",
    tr: "",
    kz: "",
  });

  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// Загружаем категории
useEffect(() => {
  fetchCategories().then((data) => {
    console.log("Received categories data:", data);

    const parsedCategories = data.map((item) => {
      const categoryData = JSON.parse(item.category);
      return {
        id: item.id,
        categoryId: item.id, 
        ...categoryData,
      };
    });

    // Сортируем категории по updatedAt в убывающем порядке
    const sortedCategories = parsedCategories.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    console.log("Parsed and sorted categories:", sortedCategories);

    setCategories(sortedCategories);
  });
}, []);


  //показываем уведомление
  const showAlert = (message) => {
    window.alert(message);
  };

  //перегружаем страницу
  const reloadPage = () => {
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      category: {
        ...categoryData.category,
        [name]: value,
      },
    });
  };

  //Открываем модалку с изменениями
  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditedCategory({ ...category });
    setIsEditModalOpen(true);
  };

  // //Добавляем категорию
  // const addCategory = () => {
  //   if (
  //     categoryData.category.ru &&
  //     categoryData.category.en &&
  //     categoryData.category.tr &&
  //     categoryData.category.kz
  //   ) {
  //     createCategory({ category: JSON.stringify(categoryData) }).then(
  //       (data) => {
  //         setCategoryData({
  //           category: {
  //             ru: "",
  //             en: "",
  //             tr: "",
  //             kz: "",
  //           },
  //           categoryId: data.id
  //         });
  //         project.setCategories([data, ...project.categories]);
  //         console.log(data)
  //         showAlert("Категория успешно создана");
  //         reloadPage();
  //       }
  //     );
  //   } else {
  //     showAlert("Заполните все языки перед добавлением категории.");
  //   }
  // };



// Добавляем категорию
const addCategory = () => {
  if (
    categoryData.category.ru &&
    categoryData.category.en &&
    categoryData.category.tr &&
    categoryData.category.kz
  ) {
    createCategory({ category: JSON.stringify(categoryData) })
      .then((data) => {
        // Устанавливаем categoryId в объекте categoryData автоматически на сервере
        setCategoryData({
          category: {
            ru: "",
            en: "",
            tr: "",
            kz: "",
          },
          categoryId: data.id,
          // Нет необходимости устанавливать categoryId вручную, т.к. он теперь устанавливается на сервере
        });

        // Добавляем категорию в массив категорий
        project.setCategories([categoryData, ...project.categories]);

        console.log(data);
        showAlert("Категория успешно создана");
        reloadPage();
      })
      .catch((error) => {
        console.error("Error while creating category:", error);
      });
  } else {
    showAlert("Заполните все языки перед добавлением категории.");
  }
};


  //изменяем и схраняем категорию
  const saveCategoryChanges = () => {
    if (editingCategory) {
      if (
        editedCategory &&
        editedCategory.category &&
        editedCategory.category.ru &&
        editedCategory.category.en &&
        editedCategory.category.tr &&
        editedCategory.category.kz
      ) {
        updateCategory(parseInt(editingCategory.id), {
          category: JSON.stringify(editedCategory),
        })
          .then((data) => {
            console.log("Received response from server:", data);

            const updatedCategories = categories.map((category) => {
              if (category.id === data.id) {
                return data;
              }
              return category;
            });

            setCategories(updatedCategories);
            setEditingCategory(null);
            setEditedCategory({
              ru: "",
              en: "",
              tr: "",
              kz: "",
            });
            setIsEditModalOpen(false);
            project.setCategories([data, ...project.categories]); // Добавляем в начало
            showAlert("Категория успешно обновлена");
            reloadPage();
          })
          .catch((error) => {
            console.error("Error while updating category:", error);
          });
      } else {
        console.error("Invalid editedCategory data:", editedCategory);
      }
    }
  };


  // закрываем модалку с изменениями
  const cancelEdit = () => {
    setEditingCategory(null);
    setEditedCategory({
      ru: "",
      en: "",
      tr: "",
      kz: "",
    });
    setIsEditModalOpen(false);
  };

  //Удаляем категорию
  const removeCategory = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить эту категорию?")) {
      deleteCategory(id).then(() => {
        const updatedCategories = categories.filter(
          (category) => category.id !== id
        );
        setCategories(updatedCategories);
        showAlert("Категория успешно удалена");
      });
    }
  };

  //Наглавную
  const handleGoAdmin = () => {
    navigate(ADMIN_ROUTE);
  };

  return (
    <section className="admin-category" id="admin-category">
      <div className="container admin-category__container">
        <h2 className="admin-category__title">
          Создание и управление категориями
        </h2>
        <div className="admin-category__content">
          <div className="admin-category__wrapper">
            <button
              className="admin-category__link-back btn-reset"
              onClick={handleGoAdmin}
            >
              <ImHome className="all-projects__btn-icon" />
              На главную
            </button>
          </div>
          <div className="admin-category__all-froms">
            <div className="admin-category__add-form">
              <h3 className="admin-category__form-caption">
                Создание категории
              </h3>
              <form className="admin-category__form">
                <div className="admin-category__field">
                  <label
                    className="admin-category__label"
                    htmlFor="category_ru"
                  >
                    Название на русском
                  </label>
                  <input
                    id="category_ru"
                    name="ru"
                    className="admin-category__input"
                    value={categoryData.category.ru}
                    onChange={handleInputChange}
                    placeholder={"Введите название на русском"}
                  />
                  <label
                    className="admin-category__label"
                    htmlFor="category_en"
                  >
                    Название на английском
                  </label>
                  <input
                    id="category_en"
                    name="en"
                    className="admin-category__input"
                    value={categoryData.category.en}
                    onChange={handleInputChange}
                    placeholder={"Введите название на английском"}
                  />
                  <label
                    className="admin-category__label"
                    htmlFor="category_kz"
                  >
                    Название на казахском
                  </label>
                  <input
                    id="category_kz"
                    name="kz"
                    className="admin-category__input"
                    value={categoryData.category.kz}
                    onChange={handleInputChange}
                    placeholder={"Введите название на казахском"}
                  />
                  <label
                    className="admin-category__label"
                    htmlFor="category_tr"
                  >
                    Название на турецком
                  </label>
                  <input
                    id="category_tr"
                    name="tr"
                    className="admin-category__input"
                    value={categoryData.category.tr}
                    onChange={handleInputChange}
                    placeholder={"Введите название на турецком"}
                  />
                </div>
              </form>
              <button
                className="admin-category__btn btn-reset"
                onClick={addCategory}
              >
                Добавить
              </button>
            </div>
            {isEditModalOpen && (
              <div className="admin-category__edit-form">
                <h3 className="admin-category__form-caption">
                  Редактирование категории
                </h3>
                <div className="edit-modal-content">
                  <form className="admin-category__form">
                    <div className="admin-category__field">
                      <label
                        className="admin-category__label"
                        htmlFor="edited_category_ru"
                      >
                        Название на русском
                      </label>
                      <input
                        id="edited_category_ru"
                        name="ru"
                        className="admin-category__input"
                        value={editedCategory.category.ru}
                        onChange={(e) =>
                          setEditedCategory({
                            ...editedCategory,
                            category: {
                              ...editedCategory.category,
                              ru: e.target.value,
                            },
                          })
                        }
                        placeholder={"Введите название на русском"}
                      />

                      <label
                        className="admin-category__label"
                        htmlFor="edited_category_en"
                      >
                        Название на английском
                      </label>
                      <input
                        id="edited_category_en"
                        name="en"
                        className="admin-category__input"
                        value={editedCategory.category.en} // Keep this reference
                        onChange={(e) =>
                          setEditedCategory({
                            ...editedCategory,
                            category: {
                              ...editedCategory.category,
                              en: e.target.value,
                            },
                          })
                        }
                        placeholder={"Введите название на английском"}
                      />
                      <label
                        className="admin-category__label"
                        htmlFor="edited_category_kz"
                      >
                        Название на казахском
                      </label>
                      <input
                        id="edited_category_kz"
                        name="kz"
                        className="admin-category__input"
                        value={editedCategory.category.kz} // Keep this reference
                        onChange={(e) =>
                          setEditedCategory({
                            ...editedCategory,
                            category: {
                              ...editedCategory.category,
                              kz: e.target.value,
                            },
                          })
                        }
                        placeholder={"Введите название на казахском"}
                      />
                      <label
                        className="admin-category__label"
                        htmlFor="edited_category_tr"
                      >
                        Название на турецком
                      </label>
                      <input
                        id="edited_category_tr"
                        name="tr"
                        className="admin-category__input"
                        value={editedCategory.category.tr} // Keep this reference
                        onChange={(e) =>
                          setEditedCategory({
                            ...editedCategory,
                            category: {
                              ...editedCategory.category,
                              tr: e.target.value,
                            },
                          })
                        }
                        placeholder={"Введите название на турецком"}
                      />
                    </div>
                  </form>
                  <div className="admin-category__btns-change">
                    <button
                      className="admin-category__btn-save btn-reset"
                      onClick={saveCategoryChanges}
                    >
                      Сохранить
                    </button>
                    <button
                      className="admin-category__btn-back btn-reset"
                      onClick={cancelEdit}
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="admin-category__all-categories">
            <h3 className="admin-category__list-title">Список категорий</h3>
            <div className="admin-category__list">
              {categories
                .slice()
                .reverse()
                .map((category) => (
                  <div key={category.id} className="admin-category__item">
                    <div className="admin-category__item-btns">
                      <button
                        onClick={() => openEditModal(category)}
                        className="admin-category__btn-edit btn-reset"
                      >
                        <ImCog className="admin-category__edit-icon" />
                      </button>
                      <button
                        onClick={() => removeCategory(category.id)}
                        className="admin-category__btn-delete btn-reset"
                      >
                        <ImBin className="admin-category__delete-icon" />
                      </button>
                    </div>
                    <div className="admin-category__item-text">
                      <span className="admin-category__item-span">RU:</span>
                      {category.category.ru}
                    </div>
                    <div className="admin-category__item-text">
                      <span className="admin-category__item-span">EN:</span>
                      {category.category.en}
                    </div>
                    <div className="admin-category__item-text">
                      <span className="admin-category__item-span">KZ:</span>
                      {category.category.kz}
                    </div>
                    <div className="admin-category__item-text">
                      <span className="admin-category__item-span">TR:</span>
                      {category.category.tr}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CreateCategoryAdminPage;
