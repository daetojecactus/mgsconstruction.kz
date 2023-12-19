import React, { useState, useEffect } from "react";
import {
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  fetchSocialLinks,
} from "../../http/socialAPI";
import { observer } from "mobx-react-lite";
import { ImBin, ImCog, ImPlus, ImHome } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../../Utils/consts";
import "./CreateSocialAdminPage.scss";

const CreateSocialAdminPage = observer(() => {
  const navigate = useNavigate();

  const [socialLinkData, setSocialLinkData] = useState({
    platform: "",
    url: "",
  });

  const [editingSocialLink, setEditingSocialLink] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editedSocialLinkData, setEditedSocialLinkData] = useState({
    platform: "",
    url: "",
  });

  // загружаем
  useEffect(() => {
    fetchSocialLinks().then((data) => {
      setSocialLinks(data);
    });
  }, []);

  // состояние
  const handlePlatformChange = (e) => {
    setSocialLinkData({
      ...socialLinkData,
      platform: e.target.value,
    });
  };

  // состояние
  const handleUrlChange = (e) => {
    setSocialLinkData({
      ...socialLinkData,
      url: e.target.value,
    });
  };

  // состояние
  const handleEditedPlatformChange = (e) => {
    setEditedSocialLinkData({
      ...editedSocialLinkData,
      platform: e.target.value,
    });
  };

  // состояние
  const handleEditedUrlChange = (e) => {
    setEditedSocialLinkData({
      ...editedSocialLinkData,
      url: e.target.value,
    });
  };

  // добавляем соц сеть
  const addSocialLink = (e) => {
    e.preventDefault();
    if (socialLinkData.platform && socialLinkData.url) {
      createSocialLink(socialLinkData)
        .then((data) => {
          setSocialLinks([...socialLinks, data]);
          setSocialLinkData({
            platform: "",
            url: "",
          });
          alert("Социальная ссылка успешно создана"); // Добавьте алерт после успешного создания
        })
        .catch((error) => {
          console.error("Error while creating social link:", error);
        });
    } else {
      alert("Заполните все поля перед добавлением социальной ссылки.");
    }
  };

  // изменяем соц сеть
  const saveSocialLinkChanges = (e) => {
    e.preventDefault();
    if (editingSocialLink) {
      if (editedSocialLinkData.platform && editedSocialLinkData.url) {
        updateSocialLink(editingSocialLink.id, editedSocialLinkData)
          .then((data) => {
            const updatedLinks = socialLinks.map((link) => {
              if (link.id === data.id) {
                return data;
              }
              return link;
            });
            setSocialLinks(updatedLinks);
            setEditedSocialLinkData({
              platform: "",
              url: "",
            });
            setIsEditModalOpen(false);
            alert("Социальная ссылка успешно обновлена");
          })
          .catch((error) => {
            console.error("Error while updating social link:", error);
          });
      } else {
        alert("Заполните все поля перед сохранением изменений.");
      }
    }
  };

  // удаляем соц сеть
  const removeSocialLink = (id) => {
    if (
      window.confirm("Вы уверены, что хотите удалить эту социальную ссылку?")
    ) {
      deleteSocialLink(id)
        .then(() => {
          const updatedLinks = socialLinks.filter((link) => link.id !== id);
          setSocialLinks(updatedLinks);
          alert("Социальная ссылка успешно удалена");
        })
        .catch((error) => {
          console.error("Error while deleting social link:", error);
        });
    }
  };

  // открываем модалку
  const openEditModal = (link) => {
    setEditingSocialLink(link);
    setEditedSocialLinkData({
      platform: link.platform,
      url: link.url,
    });
    setIsEditModalOpen(true);
  };

  //Закрываем модалку
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  //Наглавную
  const handleGoAdmin = () => {
    navigate(ADMIN_ROUTE);
  };

  return (
    <section className="admin-social">
      <div className="admin-social__container container">
        <h2 className="admin-social__title">
          Создание и управление соц. сетями
        </h2>
        <div className="admin-social__content">
          <div className="admin-social__wrapper">
            <button
              className="admin-social__link-back btn-reset"
              onClick={handleGoAdmin}
            >
              <ImHome className="admin-social__btn-icon" />
              На главную
            </button>
          </div>
          <div className="admin-social__all-froms">
            <div className="admin-social__add-form">
              <h3 className="admin-social__form-caption">
                Создание соц. сетей
              </h3>
              <form className="admin-social__from">
                <label
                  htmlFor="social-platform"
                  className="admin-social__label"
                >
                  Название платформы
                </label>
                <input
                  id="social-platform"
                  className="admin-social__input"
                  type="text"
                  placeholder="Название платформы"
                  value={socialLinkData.platform}
                  onChange={handlePlatformChange}
                />
                <label htmlFor="social-url" className="admin-social__label">
                  Ссылка на платформу
                </label>
                <input
                  id="social-url"
                  className="admin-social__input"
                  type="text"
                  placeholder="URL ссылки"
                  value={socialLinkData.url}
                  onChange={handleUrlChange}
                />
                <button
                  onClick={addSocialLink}
                  className="admin-social__btn btn-reset"
                >
                  Создать
                </button>
              </form>
            </div>
            {isEditModalOpen && (
              <div className="admin-social__edit-form">
                <h3 className="admin-social__form-caption">
                  Редактирование соц. сетей
                </h3>
                <div className="admin-social__from-content">
                  <form>
                    <label
                      htmlFor="social-platform-edit"
                      className="admin-social__label"
                    >
                      Название платформы
                    </label>
                    <input
                      id="social-platform-edit"
                      className="admin-social__input"
                      type="text"
                      value={editedSocialLinkData.platform}
                      onChange={handleEditedPlatformChange}
                    />
                    <label
                      htmlFor="social-url-edit"
                      className="admin-social__label"
                    >
                      Ссылка на платформу
                    </label>
                    <input
                      id="social-url-edit"
                      className="admin-social__input"
                      type="text"
                      value={editedSocialLinkData.url}
                      onChange={handleEditedUrlChange}
                    />
                    <div className="admin-social__btns-change">
                      <button
                        onClick={saveSocialLinkChanges}
                        className="admin-social__btn-save btn-reset"
                      >
                        Сохранить
                      </button>
                      <button
                        onClick={closeEditModal}
                        className="admin-social__btn-back btn-reset"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="admin-social__all-social">
            <h3 className="admin-social__list-title">Список соц. сетей</h3>
            <ul className="admin-social__list list-reset">
              {socialLinks.map((link) => (
                <li key={link.id} className="admin-social__item">
                  <div className="admin-social__buttons">
                    <button
                      onClick={() => openEditModal(link)}
                      className="admin-social__btn-edit btn-reset"
                    >
                      <ImCog className="admin-social__edit-icon" />
                    </button>
                    <button
                      onClick={() => removeSocialLink(link.id)}
                      className="admin-social__btn-delete btn-reset"
                    >
                      <ImBin className="admin-social__delete-icon" />
                    </button>
                  </div>
                  <p className="admin-social__item-platform">{link.platform}</p>
                  <div className="admin-social__item-url">
                    <p className="admin-social__item-caption">URL:</p>
                    <a href={link.url} className="admin-social__item-link">
                      {link.url}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CreateSocialAdminPage;
